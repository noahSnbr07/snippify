export default function getPrefix(): URL {

    const environment = process.env.NODE_ENV;
    return new URL(environment === "development" ? "http://localhost:3000/" : "https://snippify-beta.vercel.app/");
}