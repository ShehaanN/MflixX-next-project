//movies related server actions
import clientPromise from "@/lib/mongodb";

export const createmOvie = async (movie) => {
  try {
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    //create movie query
    const result = await db.collection("movies-new").insertOne(movie);

    console.log(`A movie was inserted with the _id: ${result.insertedId}`);
  } catch {
    console.log("Mongodb insert failed");
  }
};
