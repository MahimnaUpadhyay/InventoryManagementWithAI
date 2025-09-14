import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPRIES_IN

export function generateToken(user) {
  return jwt.sign(
    { id: user?.user_ID, email: user?.User_Email, role: user?.User_Role }, JWT_SECRET, { expiresIn: 1800 }
  );
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('JWT token has expired.');
    } else {
      console.error('Invalid JWT token:', error.message);
    }
  }
}
