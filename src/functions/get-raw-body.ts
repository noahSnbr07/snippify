/**
 * 
 * @param body stringified code block
 * @returns parsed code block with white spaces
 * formats for unix, max, windows
 */
export default function getRawBody(body: string): string {
    return JSON.parse(body);
}