import {DB_Connect} from "@/DATABASE/DB_CONNECTION.js";
import TestSchema from "@/MODELS/Test.js";

DB_Connect

export async function GET() {
  try {
      const request = await TestSchema.findAll()

      if (request == null) {
        return Response.json({message: "test model data is empty", request}).status(404);
      } else {
        return Response.json({ message: "test model data", request }).status(200); 
      }
  } catch (error) {
    console.log('error in get method')
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (body == null) {
      return Response.json({message: "body is empty", body}).status(404);
    } else {
      const response = await TestSchema.create(body);
      return Response.json({message:"test created", response}).status(200); 
    }
  } catch (error) {
    console.log("Error in post method")
  }
}