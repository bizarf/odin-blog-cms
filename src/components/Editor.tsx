import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ErrorsType from "../types/errors";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Editor = () => {
    const [error, setError] = useState<[ErrorsType] | []>([]);

    // init universal-cookie
    const cookies = new Cookies();
    // init useNavigate
    const navigate = useNavigate();
    // useParams init
    const { id } = useParams();

    const editorFormSchema = z.object({
        title: z
            .string()
            .min(3, { message: "Title must be at least 3 characters long" }),
        textContent: z
            .string()
            .min(3, { message: "Content must be at least 3 characters long" }),
        publish: z.string(),
    });

    const form = useForm<z.infer<typeof editorFormSchema>>({
        resolver: zodResolver(editorFormSchema),
        defaultValues: {
            title: "",
            textContent: "",
            publish: "no",
        },
    });

    const sendPost = async (values: z.infer<typeof editorFormSchema>) => {
        // get the jwt from the cookie. need to send this in the post request
        const jwt = cookies.get("jwt_auth");

        // start fetch api, with a post method and set the header content type to json
        fetch(`https://odin-blog-api-ofv2.onrender.com/api/create-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            // need to stringify the form values object to be able to send them as JSON payload
            body: JSON.stringify(values),
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
        // if an id is provided, then fetch the post and set the form values to the post values
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
                        form.setValue("title", data.post.title);
                        form.setValue("textContent", data.post.textContent);
                        form.setValue("publish", data.post.published);
                    }
                });
        }
    }, []);

    return (
        <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center my-2">
                Create a post
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(sendPost)}
                    className="rounded-xl border border-slate-500 p-4 dark:bg-gray-800 space-y-3"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Title"
                                        {...field}
                                        className="dark:bg-slate-900"
                                        maxLength={255}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="textContent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Text Content"
                                        {...field}
                                        className="dark:bg-slate-900"
                                        rows={10}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="publish"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Do you want this post to be published?
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="dark:bg-slate-900">
                                            <SelectValue placeholder="Select whether you want the post to be published" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="no">No</SelectItem>
                                        <SelectItem value="yes">Yes</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="mt-3">Submit</Button>
                    {error.map((errors, index) => (
                        <div key={index} className="text-sm text-red-600">
                            {errors.msg}
                        </div>
                    ))}
                </form>
            </Form>
        </div>
    );
};

export default Editor;
