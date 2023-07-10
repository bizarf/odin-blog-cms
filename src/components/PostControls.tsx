import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    currentPostId: string;
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setPostId: React.Dispatch<React.SetStateAction<string>>;
};

const PostControls = ({ currentPostId, setDeleteModal, setPostId }: Props) => {
    const navigate = useNavigate();

    const openDeleteModal = () => {
        setDeleteModal((state) => !state);
        setPostId(currentPostId);
    };

    const openEditPost = () => {
        navigate(`/edit/${currentPostId}`);
    };

    return (
        <div>
            <button
                className="rounded-md border border-transparent bg-blue-600 py-1 px-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-offset-gray-800 mr-2"
                onClick={openEditPost}
            >
                Edit
            </button>
            <button
                className="rounded-md border border-transparent bg-blue-600 py-1 px-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-offset-gray-800"
                onClick={() => openDeleteModal()}
            >
                Delete
            </button>
        </div>
    );
};

export default PostControls;
