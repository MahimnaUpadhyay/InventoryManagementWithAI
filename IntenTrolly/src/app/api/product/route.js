import {DB_Connect} from "@/DATABASE/DB_CONNECTION.js";
import {ProductSchema, SupplierSchema} from "@/MODELS/Relationship.js";

export async function GET() {
  try {
    await DB_Connect();
    const response = await ProductSchema.findAll({
      include: [
        {
          model: SupplierSchema,
          as: "Supplier",
          attributes: ["supplier_ID", "supplierName", "supplierAddress", "supplierPhone", "supplierRate"],
        },
      ],
    });

    if (response.length === 0) {
      return Response.json(
        { message: "Product Model is empty", response },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Product Model Data", response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Product GET method:", error);
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

    const response = await ProductSchema.create(body);

    return Response.json(
      { message: "Product Created", response },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Product POST method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
