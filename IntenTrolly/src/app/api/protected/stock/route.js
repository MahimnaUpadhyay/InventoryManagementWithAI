import {DB_Connect} from "@/DATABASE/DB_CONNECTION.js";
import {ProductSchema, StockSchema} from "@/MODELS/Relationship.js";

// View Stock
export async function GET() {
  try {
    await DB_Connect();
    const request = await StockSchema.findAll({
      include: [
        {
          model: ProductSchema,
          as: "product",
          attributes: ["product_ID", "Product_Name", "Category", "Unit_Price", "Expiration_Date", "Status", "supplier_ID"],
        },
      ],
    });

    if (request.length === 0) {
      return Response.json({ message: "Stock Model is empty", request },{ status: 404 });
    } else {
      return Response.json({ message: "Stock Model Data", request },{ status: 200 });
    }
  } catch (error) {
    console.log("Error in Stock GET method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Add Stock
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

    const response = await StockSchema.create(body);

    return Response.json(
      { message: "Stock Created", response },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in Stock POST method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
