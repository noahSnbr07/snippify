export default function getSlug(base: string): string {
    return base.toLowerCase().replaceAll(" ", "-").trim();
}