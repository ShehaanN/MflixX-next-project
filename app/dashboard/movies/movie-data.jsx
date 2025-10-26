import { clientPromise } from "@/lib/mongodb";
import MovieTable from "./movie-table";

export default async function MovieData() {
  try {
    console.log("Movies page - Connecting to MongoDB...");
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    const collectionCount = await db.collection("movies-new").countDocuments();
    console.log(
      "Movies page - Total documents in movies-new collection:",
      collectionCount
    );

    const moviesQuery = await db
      .collection("movies-new")
      .find({})
      .sort({ metacritic: -1 })
      .limit(50)
      .toArray();

    console.log("Movies page - Found movies:", moviesQuery.length);

    if (moviesQuery && moviesQuery.length > 0) {
      //Refine movies query to an array
      const refinedMovies = moviesQuery.map((movie) => ({
        id: movie._id.toString(),
        title: movie.title,
        year: movie.year,
        plot: movie.plot,
        rated: movie.rated,
        genres: movie.genres,
        poster: movie.poster,
        imdb: movie.imdb,
      }));
      //Pass movies refined data to table and return movie table
      return <MovieTable movies={refinedMovies} />;
    } else {
      console.log("Movies page - No movies found in collection");
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
