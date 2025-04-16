import { Snippet, User } from "@prisma/client";

interface SnippetWithUser extends Snippet {
    user: User;
}

export default SnippetWithUser;