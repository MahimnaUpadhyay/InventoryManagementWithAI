import UserSchema from "@/MODELS/User";
import { DB_Connect } from "@/DATABASE/DB_CONNECTION";
import { generateToken } from "@/app/utility/JWT";

// Login 
export async function POST(req) {
  try {
    await DB_Connect();
    const { User_Email, User_Password } = await req.json();

    const user = await UserSchema.findOne({ where: { User_Email } });

    if (!user) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await user.validatePassword(User_Password);
    if (!isMatch) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT
    const token = generateToken(user);

    return Response.json(
      { message: "Login successful", token, user: { id: user.user_ID, username: user.User_Name ,email: user.User_Email, role: user.User_Role } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
