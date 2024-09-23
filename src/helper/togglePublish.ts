export const togglePublish = async (id: string, jwt: string) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/author/post/${id}/publish`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    const data = await response.json();

    return data;
};
