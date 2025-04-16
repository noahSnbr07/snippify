'use server';
export default async function Divider({ width }: { width?: number }) {

    return <hr
        style={{ width: width }}
        className="border-1 border-stack w-full" />
}