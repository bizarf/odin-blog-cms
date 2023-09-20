import { createHashRouter, RouterProvider } from "react-router-dom";
import UserType from "./types/user";
import Login from "./components/Login";
import AllPosts from "./components/AllPosts";
import Post from "./components/Post";
import Editor from "./components/Editor";
import NoPostError from "./components/NoPostError";
import MainLayout from "./components/MainLayout.tsx";

type Props = {
    user: UserType | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
    theme: string | undefined;
    setTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
    fetchUserData: () => void;
};

const Router = ({ user, setUser, theme, setTheme, fetchUserData }: Props) => {
    // using hashrouter as Github pages does not support BrowserRouter
    const router = createHashRouter([
        {
            path: "/",
            element: (
                <MainLayout
                    user={user}
                    setUser={setUser}
                    theme={theme}
                    setTheme={setTheme}
                    fetchUserData={fetchUserData}
                />
            ),
            children: [
                // the mainlayout uses an outlet and setting this will make the homepage the default page for that outlet element
                {
                    index: true,
                    element: (
                        <Login user={user} fetchUserData={fetchUserData} />
                    ),
                },
                {
                    path: "/all-posts",
                    element: <AllPosts user={user} />,
                },
                {
                    path: "/new-post",
                    element: <Editor />,
                },
                {
                    path: "/posts/:id",
                    element: <Post user={user} />,
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
