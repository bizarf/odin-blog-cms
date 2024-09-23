export const deletePost = async (jwt: string, postId: string) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/post/${postId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    const data = await response.json();
    return data;
};
