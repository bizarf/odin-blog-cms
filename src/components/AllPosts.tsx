import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import PostsType from "../types/posts";
import PostControls from "./PostControls";
import DeleteModal from "./DeleteModal";

const AllPosts = () => {
    const [posts, setPosts] = useState<PostsType[]>([]);
    // const [totalPosts, setTotalPosts] = useState<number>();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    // user clicks the delete button of a mapped post which sets the post id state. we can then delete the correct post within the modal
    const [postId, setPostId] = useState<string>("");

    const cookies = new Cookies();
    const navigate = useNavigate();
    // const { id } = useParams();

    const fetchPosts = () => {
        // need to send the JWT as the all posts get for author's is protected by JWT
        const jwt = cookies.get("jwt_auth");

        fetch("https://odin-blog-api-ofv2.onrender.com/api/author/posts", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPosts(data.allPosts);
                // setTotalPosts(data.totalPublishedPostsCount);
            });
    };

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
                                                <button
                                                    className="rounded-md border border-transparent bg-blue-600 py-1 px-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-offset-gray-800 mr-2"
                                                    onClick={() =>
                                                        togglePublishBtn(
                                                            post._id
                                                        )
                                                    }
                                                >
                                                    Published
                                                </button>
                                            ) : (
                                                <button
                                                    className="rounded-md border border-transparent bg-blue-600 py-1 px-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-offset-gray-800 mr-2"
                                                    onClick={() =>
                                                        togglePublishBtn(
                                                            post._id
                                                        )
                                                    }
                                                >
                                                    Not Published
                                                </button>
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
            </div>
        </div>
    );
};

export default AllPosts;
