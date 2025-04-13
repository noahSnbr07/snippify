export default function getSlug(base: string): string {
    return base.trim().toLowerCase().replaceAll(" ", "-");
}