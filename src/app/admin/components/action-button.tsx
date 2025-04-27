"use client";

interface ActionButtonProps {
    title: string;
    action: (formData: FormData) => Promise<void>;
    markDanger?: boolean;
    id: string;
}

export default function ActionButton({ title, action, markDanger = false, id }: ActionButtonProps) {
    return (
        <form action={action}>
            <input type="hidden" name="id" value={id} />
            <button
                type="submit"
                className={`px-4 rounded-sm ${markDanger ? 'bg-red-800' : 'bg-stack'}`}
            >
                {title}
            </button>
        </form>
    );
}