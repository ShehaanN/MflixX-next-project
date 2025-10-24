import { clientPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    console.log("API - Connecting to MongoDB...");
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    const collectionCount = await db.collection("movies-new").countDocuments();
    console.log(
      "API - Total documents in movies-new collection:",
      collectionCount
    );

    const movies = await db
      .collection("movies-new")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    console.log("API - Found movies:", movies.length);
    return NextResponse.json(movies);
  } catch (error) {
    console.log("Mongodb error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  //return NextResponse.json({ error: "Internal server error" }, { status: 500 });
};
