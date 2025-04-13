export default function getRawBody(body: string): string {
    return body
        .replace(/^"(.+)"$/, '$1') //remove trailing quotes
        .replace(/\\n/g, '\n') //remove "\n"
        .replace(/\\/g, ''); //remove "\"
}