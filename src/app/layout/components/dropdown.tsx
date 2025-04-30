'use client'; // Needs to be a client component for event handling
import { links } from "@/assets/assets";
import { useRouter } from "next/navigation";

export default function Dropdown() {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const href = e.target.value;
        if (href) router.push(href);
    };

    return (
        <select
            onChange={handleChange}
            className="lg:hidden block bg-stack px-2 py-1 rounded-sm"
            defaultValue=""
        >
            <option value="" disabled>Index</option>
            {links.map((link) => (
                <option key={link.key} value={link.href}>
                    {link.title}
                </option>
            ))}
        </select>
    );
}