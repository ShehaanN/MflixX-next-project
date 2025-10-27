import { Suspense } from "react";
import { Eye, LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserData from "./user-data";

export default function MoviesPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View all users on the MFlix dashboard.
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
            <UserData />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
