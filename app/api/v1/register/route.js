import { NextResponse } from "next/server";
import clientPromise from "@/app/libs/mongodb";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "name, email, and password are required" },
        { status: 400 }
      );
    }

    // you can do the further data validation here

    const client = await clientPromise();
    const db = client.db("sample_mflix");

    const existingUser = await db.collection("users").findOne({ email });
    console.log("Is existing user", existingUser);

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password", hashedPassword);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    if (result && result.acknowledged) {
      //   console.log("MongoDB Result", result);
      return NextResponse.json({
        success: true,
        user: { userId: result.insertedId, name, email },
      });
    } else {
      return NextResponse.json(
        { error: "User registration failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("MONGODB Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
