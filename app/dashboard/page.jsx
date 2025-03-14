import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMovies } from "@/lib/apis/server";
import Image from "next/image";

export default async function DashboardPage() {
  // 1. Add shadcn Card
  // 2. define/Create Movies GET endpoint
  // 3. Read the dummy response
  // 4. Display the movies in the dashboard(UI) / Render Data set in the UI
  const moviesQuery = await getMovies();
  console.log("Movies FE", moviesQuery);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* <div className="h-96 bg-green-400">Div 1</div>
          <div className="h-96 bg-yellow-400">Div 2</div>
          <div className="h-96 bg-blue-400">Div 3</div>
          <div className="h-96 bg-orange-400">Div 4</div>
          <div className="h-96 bg-red-400">Div 5</div>
          <div className="h-96 bg-purple-400">Div 6</div>
          <div className="h-96 bg-pink-400">Div 7</div>
          <div className="h-96 bg-cyan-400">Div 8</div>
          <div className="h-96 bg-indigo-400">Div 9</div>
          <div className="h-96 bg-gray-400">Div 10</div>
          <div className="h-96 bg-gray-800">Div 11</div>
          <div className="h-96 bg-blue-700">Div 12</div> */}

        {moviesQuery?.length &&
          moviesQuery.map((movie) => (
            <div key={movie?._id} className="h-[480px] ">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="">
                    {movie?.title}{" "}
                    <span className="text-xs text-neutral-400 font-normal">
                      -{movie?.year ?? "N/A"}
                    </span>
                  </CardTitle>

                  <CardDescription className="text-center sr-only">
                    {movie?.year ?? "N/A"}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-center bg-black w-full h-[220px] mb-4 rounded">
                    <Image
                      src={movie?.poster}
                      alt={movie?.title}
                      width={200}
                      height={400}
                      className="h-full w-auto object-contain"
                      priority={true}
                    />
                  </div>
                  <div className="flex flex-col justify-between h-[154px]">
                    {/* Movie plot */}
                    <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                    {/* Movie Genres*/}
                    <div className="text-sm text-blue-900 font-semibold">
                      {movie?.genres?.length && movie?.genres?.join(" / ")}
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <Badge variant="success" className="font-medium">
                        Rated: {movie?.rated ?? "N/A"}
                      </Badge>
                      <div
                        className="flex flex-row gap-1 items-center"
                        title="IMDB Rating"
                      >
                        <FaStar className="text-yellow-500 " />
                        <span className="text-sm font-semibold">
                          {" "}
                          {movie?.imdb?.rating ?? "N/A"}/10
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between"></CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
