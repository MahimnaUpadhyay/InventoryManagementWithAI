import { DB_Connect } from "@/DATABASE/DB_CONNECTION.js";
import { NormalizeTable } from "@/MODELS/Relationship.js";

export async function GET() {
    try {
        await DB_Connect();
        const response = await NormalizeTable.findAll();
        return Response.json({status:200});
    } catch (error) {
        console.log("Error while normalizing the table", error);
    }
}