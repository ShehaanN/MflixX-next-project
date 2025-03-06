import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMovies } from "@/lib/apis/server";

export default async function DashboardPage() {
  // 1. Add shadcn Card
  // 2. define/Create Movies GET endpoint
  // 3. Read the dummy response
  // 4. Display the movies in the dashboard(UI) / Render Data set in the UI
  const moviesQuery = await getMovies();
  console.log("Movies FE", moviesQuery);

  return (
    <main>
      {/*navigation bar */}
      <nav className="bg-blue-300 w-full h-16 flex  justify-start items-center">
        <div className="container">
          <h1 className="text-black font-bold text-xl">MflixX Dashboard</h1>
        </div>
      </nav>

      {/* Body section */}
      <div className="container mt-8">
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
              <div key={movie?._id} className="h-96 ">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{movie?.title}</CardTitle>

                    <CardDescription className="sr-only">
                      {movie?.plot}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex justify-center bg-black w-full h-[276px] mb-4 rounded">
                      <img
                        src={movie?.poster}
                        alt={movie?.title}
                        width={200}
                        height={400}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between"></CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
