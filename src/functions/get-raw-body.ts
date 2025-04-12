export default function getRawBody(body: string): string {
    return body
        .replace(/\\n/g, '\n')
        .replace(/\\/g, '');
}