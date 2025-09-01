import UserSchema from "@/MODELS/User";
import { DB_Connect } from "@/DATABASE/DB_CONNECTION";

export async function POST(req) {
  try {
    await DB_Connect();
    const body = await req.json();

    const user = await UserSchema.create(body);

    return Response.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Register Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
