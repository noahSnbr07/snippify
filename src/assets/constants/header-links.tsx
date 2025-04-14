import { Home, Plus, User } from "lucide-react";

interface HeaderLink {
    key: number;
    title: string;
    href: string;
    icon: React.JSX.Element;
}

const links: HeaderLink[] = [
    { key: 0, title: "Post", href: "/post", icon: <Plus /> },
    { key: 1, title: "Contact", href: "https://www.instagram.com/noahcodesstuff/", icon: <User /> },
    { key: 2, title: "Home", href: "/", icon: <Home /> },
];

export default links;