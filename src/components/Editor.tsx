import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookies from "universal-cookie";
import ErrorsType from "../types/errors";
import { useNavigate, useParams } from "react-router-dom";

const Editor = () => {
    const [title, setTitle] = useState<string>("");
    const [textContent, setTextContent] = useState<string>("");
    const [publish, setPublish] = useState<string>("");
    const [error, setError] = useState<[ErrorsType] | []>([]);

    // init universal-cookie
    const cookies = new Cookies();
    // init useNavigate
    const navigate = useNavigate();
    // useParams init
    const { id } = useParams();

    const sendPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // make object containing the three input states
        const data = { title, textContent, publish };

        // get the jwt from the cookie. need to send this in the post request
        const jwt = cookies.get("jwt_auth");

        // start fetch api, with a post method and set the header content type to json
        fetch(`https://odin-blog-api-ofv2.onrender.com/api/create-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            // need to stringify the username and password to be able to send them as JSON objects
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                // data object can either return a token or errors. if we get the token object, then we decode the token and set that as the user state. we store the jwt in the cookie.
                if (data.message === "Post was successfully made!") {
                    // clear the error array
                    setError([]);
                    // disable the submit button, and then refresh the current page.
                    const submitBtn =
                        document.querySelector<HTMLButtonElement>(
                            ".postSubmitBtn"
                        );
                    if (submitBtn) {
                        submitBtn.disabled = true;
                    }
                    navigate("/");
                } else {
                    // error messages go here
                    setError(data.errors);
                }
            });
    };

    useEffect(() => {
        if (id) {
            fetch(`https://odin-blog-api-ofv2.onrender.com/api/post/${id}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    // send user back to home page if the post id doesn't exist
                    Promise.reject(response.statusText);
                    navigate("/posts/error");
                })
                .then((data) => {
                    if (data) {
                        setTitle(data.title);
                        setTextContent(data.textContent);
                        setPublish(data.publish);
                    }
                });
        }
    });

    return (
        <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center my-2">
                Create a post
            </h2>
            <form
                onSubmit={(e) => sendPost(e)}
                className="rounded-xl border border-slate-500 p-4 dark:bg-gray-800"
            >
                <label
                    htmlFor="title"
                    className="block font-semibold dark:text-white"
                >
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-md border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 mb-3"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="mainContent" className="sr-only">
                    Main content
                </label>
                {/* <ReactQuill
                    id="mainContent"
                    theme="snow"
                    value={textContent}
                    onChange={setTextContent}
                /> */}
                <textarea
                    name="textContent"
                    id="mainContent"
                    rows={10}
                    className="w-full"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                ></textarea>
                <label
                    htmlFor="publish"
                    className="mt-3 block font-semibold dark:text-white"
                >
                    Do you want this post to be published?
                </label>
                <select
                    name="publish"
                    id="publish"
                    onChange={(e) => setPublish(e.target.value)}
                    className="block w-20 rounded-md border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                    value={publish}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
                <button
                    type="submit"
                    className="postSubmitBtn mt-3 rounded-md border border-transparent bg-blue-600 px-10 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:bg-green-800 dark:hover:bg-green-900 dark:focus:ring-offset-gray-800"
                >
                    Submit
                </button>
                {error.map((errors, index) => (
                    <div key={index} className="text-sm text-red-600">
                        {errors.msg}
                    </div>
                ))}
            </form>
        </div>
    );
};

export default Editor;
