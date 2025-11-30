import dotenv from "dotenv";
import UserSchema from "@/MODELS/User";
import { DB_Connect } from "@/DATABASE/DB_CONNECTION";
import { generateToken, verifyToken } from "@/app/utility/JWT";
import nodemailer from "nodemailer";

dotenv.config();

// forgot Password
export async function POST(req) {
  try {
    await DB_Connect();
    const { email } = await req.json();

    const user = await UserSchema.findOne({ where: { User_Email: email } });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    } 
    
    const resetToken = generateToken(user);

    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Auth Support" <${process.env.EMAIL}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Hello ${user.User_Name},</p>
        <p>Click below link to reset your password. Link expires in 15 minutes.</p>
        <a href="${resetURL}">${resetURL}</a>
      `
    });

    return Response.json({ message: "Reset link sent!" }, { status: 200 });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}


// reset Password
export async function PUT(req) {
  try {
    await DB_Connect();

    const { token, newPassword, userEmail } = await req.json();

    if (!token) {
      return Response.json({ message: "Token not found" }, { status: 401 });
    }

    try {
      verifyToken(token);
    } catch (err) {
      return Response.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    const User = await UserSchema.findOne({ where: { User_Email: userEmail } });

    if (!User) {
      return Response.json({ message: "Wrong email provided!" }, { status: 404 });
    }

    User.User_Password = newPassword;
    await User.save();


    return Response.json({ message: "Password reset successfully" }, { status: 200 });

  } catch (error) {
    console.log("Forget Pwd error", error);
    return Response.json({ error: "Couldn't reset your password." }, { status: 500 });
  }
}