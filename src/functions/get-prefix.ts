/**
 * retrieve prefix for absolute urls
 * does not provide trailing slash
 * @returns prefix for absolute urls
 * @example 
 * const prefix: URL = getPrefix();
 * redirect(`${prefix}/destination`);
 */
export default function getPrefix(): URL {

    const environment = process.env.NODE_ENV;
    return new URL(environment === "development" ? "http://localhost:3000/" : "https://snippify-beta.vercel.app/");
}