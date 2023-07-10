type PostsType = {
    _id: string;
    title: string;
    textContent: string;
    timestamp: string;
    published: string;
    user: {
        firstname: string;
        lastname: string;
        isAuthor: boolean;
        username: string;
    };
};

export default PostsType;
