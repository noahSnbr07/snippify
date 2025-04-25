import { Code, Mail, User } from "lucide-react";

interface contact {
    id: number;
    title: string;
    url: string;
    icon: React.JSX.Element;
}

const contacts: contact[] = [
    { id: 0, title: "Instagram", url: "https://instagram.com/noah.codes.stuff/", icon: <Mail opacity={.5} /> },
    { id: 1, title: "GitHub", url: "https://github.com/noahSnbr07/", icon: <Code opacity={.5} /> },
    { id: 2, title: "Twitter", url: "https://x.com/noahsnbr", icon: <User opacity={.5} /> },
];

export default contacts;