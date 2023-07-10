type CommentsType = {
    user: {
        firstname: string;
        lastname: string;
        isAuthor: boolean;
        username: string;
    };
    text: string;
    postId: string;
    timestamp: string;
    _id: string;
};

export default CommentsType;
