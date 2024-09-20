import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
            <Button className="mr-2" onClick={openEditPost}>
                Edit
            </Button>
            <Button onClick={() => openDeleteModal()}>Delete</Button>
        </div>
    );
};

export default PostControls;
