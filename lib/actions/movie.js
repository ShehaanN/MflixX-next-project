"use server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Create movie server action
export const createMovie = async (movie) => {
  try {
    const client = await clientPromise(); // Await the promise
    const db = client.db("sample_mflix"); // Replace 'mflix' with your actual DB name
    const result = await db.collection("movies_n").insertOne(movie);

    console.log(`A movie was inserted with the _id: ${result.insertedId}`);

    if (result.acknowledged) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Mongodb insert failed!", error);
    return { success: false, error };
  }
};
