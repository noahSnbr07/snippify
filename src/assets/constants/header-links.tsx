import { Mail, Plus, Shield, User } from "lucide-react";

interface HeaderLink {
    key: number;
    title: string;
    href: string;
    icon: React.JSX.Element;
}

/**
 * static collection of links in the header
 */
const links: HeaderLink[] = [
    { key: 0, title: "Admin", href: "/admin", icon: <Shield size={20} /> },
    { key: 1, title: "Create", href: "/create", icon: <Plus size={20} /> },
    { key: 2, title: "Contact", href: "/contact", icon: <Mail size={20} /> },
    { key: 3, title: "Account", href: "/authentication", icon: <User size={20} /> },
];

export default links;