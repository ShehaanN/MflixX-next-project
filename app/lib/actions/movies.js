"use server";
import { clientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Helper to get database connection
const getDb = async () => {
  const client = await clientPromise();
  return client.db("sample_mflix");
};

export const createMovie = async (movie) => {
  try {
    const db = await getDb();
    const existingMovie = await db.collection("movies-new").findOne({
      title: movie.title,
      year: movie.year,
    });

    if (existingMovie) {
      console.log("Movie already exists in the database.");
      return {
        success: false,
        message: `${movie.title} movie already exists in the database.`,
      };
    }

    // Insert the new movie
    const result = await db.collection("movies-new").insertOne(movie);
    console.log(`A movie was added with _id:${result.insertedId}`);

    return {
      success: true,
      message: "Movie added successfully.",
      movieId: result.insertedId.toString(),
    };
  } catch (error) {
    console.log("Mongodb insert failed!", error);
    return { success: false, message: "Database insert failed." };
  }
};

//Update movie server action
export const updateMovie = async (id, movie) => {
  try {
    const db = await getDb();
    console.log("Updating movie with ID:", id);
    console.log("Update data:", movie);

    const result = await db
      .collection("movies-new")
      .updateOne({ _id: new ObjectId(id) }, { $set: movie });

    console.log(`Update result:`, result);
    console.log(
      `Movie updated - matchedCount: ${result.matchedCount}, modifiedCount: ${result.modifiedCount}`
    );

    if (result.acknowledged && result.matchedCount > 0) {
      return { success: true };
    } else {
      return { success: false, message: "Movie not found or no changes made" };
    }
  } catch (error) {
    console.log("Mongodb update failed!", error);
    return { success: false, error: error.message };
  }
};

//Delete movie
export const deleteMovie = async (id) => {
  try {
    const db = await getDb();
    console.log("Deleting movie with ID:", id);

    const result = await db
      .collection("movies-new")
      .deleteOne({ _id: new ObjectId(id) });

    console.log(`Movie deleted - deletedCount: ${result.deletedCount}`);
    if (result.acknowledged && result.deletedCount > 0) {
      return { success: true };
    } else {
      return { success: false, message: "Movie not found" };
    }
  } catch (error) {
    console.log("Mongodb delete failed!", error);
    return { success: false, error: error.message };
  }
};
//Search movie
export const searchMovies = async (search) => {
  console.log("Searching for:", search);
  try {
    const db = await getDb();
    const searchResults = await db
      .collection("movies-new")
      .find({
        $or: [
          { title: { $regex: new RegExp(search, "i") } },
          { plot: { $regex: new RegExp(search, "i") } },
          { genres: { $regex: new RegExp(search, "i") } },
          { rated: { $regex: new RegExp(search, "i") } },
          { year: Number(search) }, // Direct number match for year
        ],
      })
      .limit(10)
      .toArray();

    console.log("Search results found:", searchResults.length);
    return searchResults;
  } catch (error) {
    console.log("Error searching movie: ", error);
    return [];
  }
};
