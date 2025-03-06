import { NextResponse } from "next/server";
import clientPromise from "@/app/libs/mongodb";
//dummy array of movies

// const MOVIES = [
//   {
//     id: 1,
//     title: "The Shawshank Redemption",
//     year: 1994,
//   },
//   {
//     id: 2,
//     title: "The Godfather",
//     year: 1972,
//   },
//   {
//     id: 3,
//     title: "The Dark Knight",
//     year: 2008,
//   },
//   {
//     id: 4,
//     title: "The Lord of the Rings: The Return of the King",
//     year: 2003,
//   },
//   {
//     id: 5,
//     title: "Pulp Fiction",
//     year: 1994,
//   },
//   {
//     id: 6,
//     title: "Schindler's List",
//     year: 1993,
//   },
//   {
//     id: 7,
//     title: "12 Angry",
//     year: 1957,
//   },
//   {
//     id: 8,
//     title: "The Lord of the Rings: The Fellowship of the Ring",
//     year: 2001,
//   },
//   {
//     id: 9,
//     title: "Fight Club",
//     year: 1999,
//   },
//   {
//     id: 10,
//     title: "Forrest Gump",
//     year: 1994,
//   },
//   {
//     id: 11,
//     title: "Inception",
//     year: 2010,
//   },
//   {
//     id: 12,
//     title: "The Lord of the Rings: The Two Towers",
//     year: 2002,
//   },
// ];

export const GET = async (req) => {
  //fetch movies from the database / Get movies from the mongoDB
  try {
    const client = await clientPromise();
    // MflixX is the database name
    const db = client.db("sample_mflix");

    //fetch movies from the database
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(12)
      .toArray();

    return NextResponse.json(movies);
  } catch (error) {
    console.log("MONGODB Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
