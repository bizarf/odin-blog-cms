export const fetchPublishedPosts = async (currentPageNumber: number) => {
    // no JWT is required for this endpoint
    const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/author/posts/published?page=${currentPageNumber}`
    );

    const data = response.json();
    return data;
};
