import { PrismaClient } from "@prisma/client";

//create client
const database = new PrismaClient();

//re-export client
export default database;