import { clientPromise } from "@/lib/mongodb";
import MovieTable from "./movie-table";

export default async function MovieData() {
  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    // Test connection and collection
    const collectionCount = await db.collection("movies-new").countDocuments();
    console.log("Total documents in movies-new collection:", collectionCount);

    const randomDoc = await db
      .collection("movies-new")
      .aggregate([{ $sample: { size: 4 } }])
      .toArray();

    console.log("Found movies:", randomDoc.length);

    if (randomDoc && randomDoc.length > 0) {
      //Refine movies query to an array
      const refinedMovies = randomDoc.map((movie) => ({
        id: movie._id.toString(),
        title: movie.title,
        year: movie.year,
        plot: movie.plot,
        rated: movie.rated,
        genres: movie.genres,
        poster: movie.poster,
        imdb: movie.imdb,
      }));
      //Pass movies refined data to table
      //Return movie table
      return <MovieTable movies={refinedMovies} />;
    } else {
      console.log("No movies found in collection");
      return (
        <div className="flex items-center justify-center h-[150px]">
          <p className="text-yellow-700 font-medium">
            No Movies Found in Database!
          </p>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center h-[150px]">
        <p className="text-red-700 font-medium animate-pulse duration-1000">
          No Movies Available!
        </p>
      </div>
    );
  }
}
