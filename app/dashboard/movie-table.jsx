"use client";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

export default function MovieTable({ movies }) {
  console.log("MovieTable received movies:", movies);
  console.log("Movies length:", movies?.length);

  if (!movies || movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-[150px]">
        <p className="text-gray-500 font-medium">No movies to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="h-[480px]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>
                {movie?.title}
                <span className="text-xs font-normal text-gray-500">
                  {" "}
                  - {movie?.year ?? "N/A"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center bg-black mb-2 w-full h-[220px] rounded">
                {movie.poster && (
                  <Image
                    src={movie?.poster}
                    alt={movie?.title}
                    width={200}
                    height={400}
                    className="h-full w-auto object-contain brightness-90 transition-transform duration-300 hover:brightness-105 hover:scale-105 hover:shadow-lg"
                    priority="true"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between h-[154px]">
                <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                <div className="text-sm text-blue-900 font-semibold">
                  {movie?.genres?.join(" / ") || "N/A"}
                </div>
                <div className="flex flex-row justify-between items-center">
                  <Badge variant="success" className="font-medium">
                    Rated: {movie.rated ?? "N/A"}
                  </Badge>
                  <div
                    className="flex flex-row gap-1 items-center"
                    title="IMDb Rating"
                  >
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold text-sm">
                      {movie?.imdb?.rating ?? 0}/10
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
