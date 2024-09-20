import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import dayjs from "dayjs";
import PostsType from "../types/posts";
import CommentsType from "../types/comments";
import { Button } from "@/components/ui/button";

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [post, setPost] = useState<PostsType>();
    const [comments, setComments] = useState<CommentsType[]>();

    useEffect(() => {
        // check the cookie instead of waiting for the user state. this avoids the login page flashing for a second when refreshing the all-posts page
        const checkCookie = async () => {
            const jwt = await cookies.get("jwt_auth");
            if (!jwt) {
                navigate("/");
            } else {
                fetchPost();
                fetchComments();
            }
        };
        checkCookie();
    }, []);

    const fetchPost = async () => {
        fetch(`https://odin-blog-api-ofv2.onrender.com/api/post/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    // send user back to home page if the post id doesn't exist
                    Promise.reject(response.statusText);
                    navigate("/posts/error");
                }
            })
            .then((data) => {
                setPost(data.post);
            });
    };

    const fetchComments = async () => {
        // fetch comments on post
        fetch(`https://odin-blog-api-ofv2.onrender.com/api/post/${id}/comments`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setComments(data.allComments);
            });
    };

    const handleDeleteComment = (commentId: string) => {
        const jwt = cookies.get("jwt_auth");

        fetch(
            `https://odin-blog-api-ofv2.onrender.com/api/post/${id}/${commentId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Post successfully deleted") {
                    navigate(0);
                }
            });
    };

    return (
        <div className="mx-10">
            {/* post container */}

            <div className="my-4 flex flex-col rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]">
                <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
                    {post?.title}
                </h2>
                <p className="mt-1 text-gray-800 dark:text-white">
                    {post?.textContent}
                </p>
                <p className="mt-1 text-gray-800 dark:text-white">
                    Written by: {post?.user.firstname} {post?.user.lastname}
                </p>
                <p className="mt-5 text-xs text-gray-500 dark:text-gray-400">
                    Created on:
                    {dayjs(post?.timestamp).format(" ddd DD, MMM YYYY, hh:mma")}
                </p>
            </div>
            {/* comment container */}
            <h4 className="text-center text-xl font-bold text-gray-800 dark:text-white">
                Comments
            </h4>
            {comments &&
                comments.map((comment) => {
                    return (
                        <div
                            key={comment._id}
                            className="my-3 flex flex-col rounded-xl border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-gray-800 dark:text-white">
                                    Posted by: {comment.user.firstname}{" "}
                                    {comment.user.lastname}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Posted on:
                                    {dayjs(post?.timestamp).format(
                                        " ddd DD, MMM YYYY, hh:mma"
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <p className="text-gray-800 dark:text-white">
                                    {comment.text}
                                </p>
                                <Button
                                    onClick={() =>
                                        handleDeleteComment(comment._id)
                                    }
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Post;
