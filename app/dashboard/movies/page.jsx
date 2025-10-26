import { Suspense } from "react";
import Link from "next/link";
import { Eye, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MovieData from "./movie-data";

export const dynamic = "force-dynamic";

export default function MoviesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/movies">
          <Button variant="outline">
            <Eye />
            View as User
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Movies Management</CardTitle>
          <CardDescription>
            View and manage all listed movie entries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[186px]">
                <LoaderCircle className="animate-spin duration-1000 text-blue-500" />
              </div>
            }
          >
            <MovieData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
