import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import PostsType from "../types/posts";
import PostControls from "./PostControls";
import DeleteModal from "./DeleteModal";
import ReactPaginate from "react-paginate";
import { Button } from "@/components/ui/button";

const AllPosts = () => {
    const [posts, setPosts] = useState<PostsType[]>([]);
    const [totalPosts, setTotalPosts] = useState<number>();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    // user clicks the delete button of a mapped post which sets the post id state. we can then delete the correct post within the modal
    const [postId, setPostId] = useState<string>("");

    const cookies = new Cookies();
    const navigate = useNavigate();

    // get the page number from the URL search params
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPageNumber = Number(searchParams.get("page"));

    const fetchPosts = () => {
        // need to send the JWT as the all posts get for author's is protected by JWT
        const jwt = cookies.get("jwt_auth");

        fetch(
            `https://odin-blog-api-ofv2.onrender.com/api/author/posts?page=${currentPageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPosts(data.allPosts);
                setTotalPosts(data.totalPostsCount);
            });
    };

    // when the page number in the search params changes, we run the fetchPosts function
    useEffect(() => {
        fetchPosts();
    }, [currentPageNumber]);

    const totalPages = Math.ceil(totalPosts! / 10);

    useEffect(() => {
        // check the cookie instead of waiting for the user state. this avoids the login page flashing for a second when refreshing the all-posts page
        const checkCookie = async () => {
            const jwt = await cookies.get("jwt_auth");
            if (!jwt) {
                navigate("/");
            } else {
                fetchPosts();
            }
        };
        checkCookie();
    }, []);

    const togglePublishBtn = (id: string) => {
        // need to send the JWT as the all posts get for author's is protected by JWT
        const jwt = cookies.get("jwt_auth");

        fetch(
            `https://odin-blog-api-ofv2.onrender.com/api/author/post/${id}/publish`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Post successfully updated") {
                    navigate(0);
                }
            });
    };

    // pagination function
    const handlePageClick = (e: { selected: number }) => {
        // e.selected returns values starting from 0. I'll need to add 1 to this or else the wrong pages will be returned.
        const page = e.selected + 1;
        // searchParams set takes in a name and a value. e.selected returns a number, so need to convert that to string to use in search params
        searchParams.set("page", page.toString());
        // once that's done update the search params
        setSearchParams(searchParams);
    };

    return (
        <div className="">
            <div>
                <h2 className="pt-2 text-center text-xl font-bold text-gray-800 dark:text-white">
                    All Articles
                </h2>
                <div className="mx-6 md:mx-20">
                    {posts &&
                        posts.map((post) => {
                            return (
                                <div
                                    key={post._id}
                                    className="flex flex-col rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7] my-4"
                                >
                                    <div className="p-4 md:p-5">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                                <Link to={`/posts/${post._id}`}>
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">
                                                Posted on:
                                                {dayjs(post.timestamp).format(
                                                    " ddd DD, YYYY, hh:mma"
                                                )}
                                            </p>
                                        </div>
                                        <p className="my-2 text-gray-800 dark:text-gray-400">
                                            {post.textContent}
                                        </p>
                                        <div className="flex justify-between">
                                            <PostControls
                                                currentPostId={post._id}
                                                setDeleteModal={setDeleteModal}
                                                setPostId={setPostId}
                                            />
                                            {post.published === "yes" ? (
                                                <Button
                                                    onClick={() =>
                                                        togglePublishBtn(
                                                            post._id
                                                        )
                                                    }
                                                >
                                                    Published
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        togglePublishBtn(
                                                            post._id
                                                        )
                                                    }
                                                >
                                                    Not Published
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    {deleteModal && (
                        <DeleteModal
                            setDeleteModal={setDeleteModal}
                            postId={postId}
                        />
                    )}
                </div>
                {totalPages && (
                    <ReactPaginate
                        pageCount={totalPages}
                        breakLabel="..."
                        nextLabel="Next >"
                        pageRangeDisplayed={5}
                        previousLabel="< Previous"
                        renderOnZeroPageCount={null}
                        onPageChange={handlePageClick}
                        className="flex items-center space-x-4 justify-center py-2"
                        activeClassName="bg-blue-500 justify-center"
                        pageClassName="w-10 h-10 hover:text-blue-600 p-4 inline-flex items-center text-sm font-medium rounded-full dark:text-white"
                        previousClassName="dark:text-white hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                        nextClassName="dark:text-white hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                        disabledClassName="pointer-events-none"
                        breakClassName="dark:text-white"
                    />
                )}
            </div>
        </div>
    );
};

export default AllPosts;
