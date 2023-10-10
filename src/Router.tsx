import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import AllPosts from "./components/AllPosts";
import Post from "./components/Post";
import Editor from "./components/Editor";
import NoPostError from "./components/NoPostError";
import MainLayout from "./components/MainLayout.tsx";

type Props = {
    fetchUserData: () => void;
};

const Router = ({ fetchUserData }: Props) => {
    // using hashrouter as Github pages does not support BrowserRouter
    const router = createHashRouter([
        {
            path: "/",
            element: <MainLayout fetchUserData={fetchUserData} />,
            children: [
                // the mainlayout uses an outlet and setting this will make the homepage the default page for that outlet element
                {
                    index: true,
                    element: <Login fetchUserData={fetchUserData} />,
                },
                {
                    path: "/all-posts",
                    element: <AllPosts />,
                },
                {
                    path: "/new-post",
                    element: <Editor />,
                },
                {
                    path: "/posts/:id",
                    element: <Post />,
                },
                {
                    path: "/edit/:id",
                    element: <Editor />,
                },
                {
                    path: "/posts/error",
                    element: <NoPostError />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
