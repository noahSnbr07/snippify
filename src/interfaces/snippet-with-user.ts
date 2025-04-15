import { Snippet, User } from "@prisma/client";

interface SnippetWithUser extends Snippet {
    owner: User;
}

export default SnippetWithUser;