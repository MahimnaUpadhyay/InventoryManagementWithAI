import { DB_Connect } from "@/DATABASE/DB_CONNECTION.js";
import { verifyToken } from "@/app/utility/JWT";
import { authorizeRole } from "@/app/utility/RoleAuth";
import { ProductSchema, SalesSchema } from "@/MODELS/Relationship.js";

// View Sales
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
      return Response.json({ message: "Sales Model is empty", response }, { status: 200 });
    } else {
      return Response.json({ message: "Sales Model Data", response }, { status: 200 });
    }
  } catch (error) {
    console.log("Error in Sales GET method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Add Sales
export async function POST(req) {
  try {
    await DB_Connect();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = verifyToken(token);

    const body = await req.json();

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    } else if (!authorizeRole(user, ["Admin", "Manager"])) {
      return Response.json({ message: "Forbidden - insufficient role" }, { status: 403 });
    } else if (!body || Object.keys(body).length === 0) {
      return Response.json({ message: "Body is empty", body },{ status: 400 });
    } else {
      const response = await SalesSchema.create(body);
      return Response.json({ message: "Sales Created", response },{ status: 201 });
    }
  } catch (error) {
    console.log("Error in Sales POST method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
