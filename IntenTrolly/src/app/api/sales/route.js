import {DB_Connect} from "@/DATABASE/DB_CONNECTION.js";
import {ProductSchema, SalesSchema} from "@/MODELS/Relationship.js";

export async function GET() {
  try {
    await DB_Connect();
    const response = await SalesSchema.findAll({
      include: [
        {
          model: ProductSchema,
          as: "product",
          attributes: ["product_ID", "Product_Name", "Category", "Unit_Price", "Expiration_Date", "Status", "supplier_ID"],
        },
      ],
    });

    if (response.length === 0) {
      return Response.json(
        { message: "Sales Model is empty", response },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Sales Model Data", response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Sales GET method:", error);
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

    const response = await SalesSchema.create(body);

    return Response.json(
      { message: "Sales Created", response },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Sales POST method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
