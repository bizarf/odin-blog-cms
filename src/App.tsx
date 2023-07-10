import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import User from "./types/user";
import AllPosts from "./components/AllPosts";
import Login from "./components/Login";
import Post from "./components/Post";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Editor from "./components/Editor";
import NoPostError from "./components/NoPostError";

const App = () => {
    const [theme, setTheme] = useState<string>();

    const [user, setUser] = useState<User | null>(null);

    return (
        // set the app container to a minimum height 100% to allow the div to take up the rest of the space. a must have for the dark mode background colour
        <div className="flex min-h-full flex-col dark:bg-slate-600">
            <HashRouter>
                {/* flex to make a sticky footer */}
                <div className="flex-[1_0_auto]">
                    <Header
                        user={user}
                        setUser={setUser}
                        theme={theme}
                        setTheme={setTheme}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={<Login user={user} setUser={setUser} />}
                        />
                        <Route
                            path="/all-posts"
                            element={<AllPosts user={user} />}
                        />
                        <Route path="/new-post" element={<Editor />} />
                        <Route
                            path="/posts/:id"
                            element={<Post user={user} />}
                        />
                        <Route path="/edit/:id" element={<Editor />} />
                        <Route path="/posts/error" element={<NoPostError />} />
                    </Routes>
                </div>
                <Footer theme={theme} />
            </HashRouter>
        </div>
    );
};

export default App;
