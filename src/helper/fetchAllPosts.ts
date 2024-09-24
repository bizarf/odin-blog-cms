export const fetchAllPosts = async (jwt: string, currentPageNumber: number) => {
    // need to send the JWT as the all posts get for author's is protected by JWT
    const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/author/posts?page=${currentPageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    const data = await response.json();
    return data;
};
