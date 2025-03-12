import { NextResponse } from "next/server";
import clientPromise from "@/app/libs/mongodb";

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "name, email, and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const client = await clientPromise();
    // MflixX is the database name
    const db = client.db("sample_mflix");

    const existingUser = await db.collection("users").findOne({ email });
    console.log("Is existing user", existingUser);

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true, name, email });
  } catch (error) {
    console.log("MONGODB Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
