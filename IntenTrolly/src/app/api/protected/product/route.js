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
      return Response.json({ message: "Forbidden - insufficient role" }, { status: 200 });
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

// Update Supplier
export async function PUT(req) {
  try {
    await DB_Connect();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = verifyToken(token);

    const body = await req.json();
    const { product_ID, ...updatedData } = body;

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    } else if (!authorizeRole(user, ["Admin", "Manager"])) {
      return Response.json({ message: "Forbidden - insufficient role" }, { status: 200 });
    } else if (!product_ID) {
      return Response.json({ message: "product ID required" }, { status: 400 });
    }

    const product = await ProductSchema.findOne({ where: { product_ID } });

    if (!product) {
      return Response.json({ message: "product Not Found" }, { status: 404 });
    }

    await product.update(updatedData);

    return Response.json({ message: "product Updated", product }, { status: 200 });

  } catch (error) {
    console.log("Error in product PUT method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete Supplier
export async function DELETE(req) {
  try {
    await DB_Connect();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = verifyToken(token);

    const body = await req.json();
    const {product_ID} = body;

    if (!user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    } else if (!authorizeRole(user, ["Admin"])) {
      return Response.json({ message: "Forbidden - Only Admin can delete data" }, { status: 200 });
    } else if (!product_ID) {
      return Response.json({ message: "product ID required" }, { status: 400 });
    }

    const product = await ProductSchema.findOne({ where: { product_ID } });

    if (!product) {
      return Response.json({ message: "product Not Found" }, { status: 404 });
    }

    await product.destroy();

    return Response.json({ message: "product Deleted Successfully" }, { status: 200 });

  } catch (error) {
    console.log("Error in product DELETE method:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
