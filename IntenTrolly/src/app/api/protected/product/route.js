import { DB_Connect } from "@/DATABASE/DB_CONNECTION.js";
import { verifyToken } from "@/app/utility/JWT";
import { ProductSchema, SupplierSchema } from "@/MODELS/Relationship.js";
import { authorizeRole } from "@/app/utility/RoleAuth";

// View products
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
      return Response.json({ message: "Product Model is empty", response }, { status: 200 });
    } else {
      return Response.json({ message: "Product Model Data", response }, { status: 200 });
    }
  } catch (error) {
    console.log("Error in Product GET method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Add Products
export async function POST(req) {
  try {
    await DB_Connect();

    const token = req.headers.get("authorization")?.split(" ")[1];
    // console.log("Token", token);

    const user = verifyToken(token);
    // console.log("User", user);

    const body = await req.json();

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    } else if (!authorizeRole(user, ["Admin", "Manager"])) {
      return Response.json({ message: "Forbidden - insufficient role" }, { status: 403 });
    } else if (!body || Object.keys(body).length === 0) {
      return Response.json({ message: "Body is empty", body }, { status: 400 });
    } else {
      const response = await ProductSchema.create(body);
      return Response.json({ message: "Product Created", response }, { status: 201 });
    }
  } catch (error) {
    console.log("Error in Product POST method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
