import {DB_Connect} from "@/DATABASE/DB_CONNECTION.js";
import {SupplierSchema} from "@/MODELS/Relationship.js";

export async function GET() {
  try {
    await DB_Connect();
    const response = await SupplierSchema.findAll();

    if (response.length === 0) {
      return Response.json(
        { message: "Supplier Model is empty", response },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Supplier Model Data", response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in supplier GET method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await DB_Connect();

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return Response.json(
        { message: "Body is empty", body },
        { status: 400 }
      );
    }

    const response = await SupplierSchema.create(body);

    return Response.json(
      { message: "Supplier Created", response },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Supplier POST method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
