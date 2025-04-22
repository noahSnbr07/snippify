export default function getSlug(base: string): string {

    //create slug from title
    return base.trim().toLowerCase().replaceAll(" ", "-");
}