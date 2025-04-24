import getPrefix from "@/functions/get-prefix";

const prefix = getPrefix();
const base = (absolute: boolean) => `${absolute ? prefix + "/" : ""}api`;

/**
 * centralized collection of all api endpoints in-app
 * structured by method, table and endpoint
 * @param param used in dynamic endpoints requiring param
 * @param slug used in dynamic endpoints requiring slugs
 * @param absolute weather api-call should be absolute
 * @param tag used in snippet search endpoint
 * @returns URL as string to insert into actions and fetch calls
 * @example
 * const me = await fetch(endpoints(null, null).user.get.me);
 * <form action={endpoints(null, "logging").snippet.post.delete} />
 */
const endpoints = (param: string | null, slug: string | null, absolute = false, tag?: string | null, page?: number | null) => {
    const encodedParam = encodeURIComponent(param || "");
    const encodedTag = encodeURIComponent(tag || "");
    const encodedPage = encodeURIComponent(page || 0);

    return {
        snippet: {
            get: {
                retrieve: `${base(absolute)}/snippet/retrieve/${encodedParam}/`,
                search: `${base(absolute)}/snippet/search?query=${encodedParam}&tag=${encodedTag}&page=${encodedPage}`
            },
            post: {
                delete: `${base(absolute)}/snippet/delete/${slug || ""}/`,
                create: `${base(absolute)}/snippet/create/`,
            },
        },
        user: {
            get: {
                me: `${base(absolute)}/user/me`
            },
            post: {
                authenticate: `${base(absolute)}/user/authenticate/`,
                deauthenticate: `${base(absolute)}/user/deauthenticate/`,
            },
        },
    };
};

export default endpoints;