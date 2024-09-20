import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = {
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    postId: string;
};

const DeleteModal = ({ setDeleteModal, postId }: Props) => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setDeleteModal((state) => !state);
    };

    const deletePost = (postId: string) => {
        // need to send the jwt as the route is protected
        const jwt = cookies.get("jwt_auth");

        fetch(`https://odin-blog-api-ofv2.onrender.com/api/post/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Post successfully deleted") {
                    // refresh the page
                    navigate(0);
                }
            });
    };

    return (
        <div
            //set the background colour opacity instead of the separate opacity setting as this will prevent elements inside of the modal from having the separate opacity setting applied
            className="bg-black/[.7] w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center"
            onClick={handleCloseModal}
        >
            <div
                className="p-6 rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-slate-700/[.7]"
                // stopPropagation prevents any events within this div from activating the above setDeleteModal function
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                    Do you want to delete this post?
                </h2>
                <div className="flex justify-center">
                    <Button className="mr-4" onClick={() => deletePost(postId)}>
                        Yes
                    </Button>
                    <Button onClick={handleCloseModal}>No</Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
