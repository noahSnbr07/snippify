import { Mail, Plus, User } from "lucide-react";

interface HeaderLink {
    key: number;
    title: string;
    href: string;
    icon: React.JSX.Element;
}

const links: HeaderLink[] = [
    { key: 0, title: "Post", href: "/post", icon: <Plus /> },
    { key: 1, title: "Contact", href: "https://www.instagram.com/noahcodesstuff/", icon: <Mail /> },
    { key: 2, title: "Account", href: "/authentication", icon: <User /> },
];

export default links;