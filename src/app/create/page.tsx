"use server";
import { languages, tags } from "@/assets/assets";
import Divider from "../components/divider";
import endpoints from "@/assets/constants/endpoints";

export default async function page() {

    return (
        <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-lg font-bold"> Create Snippet </h1>
            <form
                method="POST"
                action={endpoints(null, null).snippet.post.create}
                className="bg-stack max-w-5xl flex flex-col gap-4 p-4 rounded-lg">

                {/* Enter Title */}
                <input
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    className="form-element"
                    placeholder="Title"
                    name="title"
                    type="text" />

                {/* Enter Description */}
                <textarea
                    autoComplete="off"
                    autoCorrect="off"
                    className="form-element"
                    maxLength={100}
                    placeholder="description"
                    name="description"
                    cols={25}
                    rows={3}
                />

                {/* Enter Body */}
                <textarea
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    className="form-element"
                    placeholder="body"
                    name="body"
                    cols={25}
                    rows={12}
                />

                {/* Select Language */}
                <select
                    defaultValue={"js"}
                    required
                    className="form-element"
                    name="language">
                    {languages.map((language: string, key: number) =>
                        <option
                            key={key}
                            value={language}> {language} </option>
                    )}
                </select>

                {/* Select Tags */}
                <select
                    size={tags.length}
                    multiple
                    required
                    className="form-element"
                    name="tags">
                    {tags.map((tag: string, key: number) =>
                        <option
                            key={key}
                            value={tag}> {tag} </option>
                    )}
                </select>
                <Divider />

                {/* Authorize Access */}
                <input
                    required
                    name="authorization"
                    className="form-element"
                    type="password"
                    placeholder="your password"
                />

                {/* Submit Form */}
                <button
                    className="border p-4 font-bold text-lg rounded-lg"
                    type="submit"> Publish Snippet </button>
            </form>
        </div>
    );
}