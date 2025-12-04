import { DB_Connect } from "@/DATABASE/DB_CONNECTION.js";
import { verifyToken } from "@/app/utility/JWT";
import { authorizeRole } from "@/app/utility/RoleAuth";
import { SupplierSchema } from "@/MODELS/Relationship.js";

// Get Suppliers
export async function GET() {
  try {
    await DB_Connect();
    const response = await SupplierSchema.findAll();

    if (response.length === 0) {
      return Response.json({ message: "Supplier Model is empty", response }, { status: 200 });
    } else {
      return Response.json({ message: "Supplier Model Data", response }, { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error in supplier GET method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Add Suppliers
export async function POST(req) {
  try {
    await DB_Connect();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = verifyToken(token);

    const body = await req.json();

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    } else if (!authorizeRole(user, ["Admin", "Manager"])) {
      return Response.json({ message: "Forbidden - insufficient role" }, { status: 200 });
    } else if (!body || Object.keys(body).length === 0) {
      return Response.json({ message: "Body is empty", body }, { status: 400 });
    } else {
      const response = await SupplierSchema.create(body);
      return Response.json({ message: "Supplier Created", response }, { status: 201 });
    }
  } catch (error) {
    console.log("Error in Supplier POST method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
