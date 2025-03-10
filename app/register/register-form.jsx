"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

// Keep this as the client component (functional component)
export default function RegisterForm() {
  const [error, setError] = useState(DEFAULT_ERROR);

  const handleSubmitForm = async (event) => {
    event?.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const name = formData.get("name") ?? "";
    const email = formData.get("email") ?? "";
    const password = formData.get("password") ?? "";
    const confirmPassword = formData.get("confirm-password") ?? "";

    // console.log("Form submitted", { name, email, password, confirmPassword });

    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        setError(DEFAULT_ERROR);
      } else {
        setError({ error: true, message: "Passwords do not match" });
      }
    }
    console.log("Error", error);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="bg-blue-50 w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmitForm}>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="your name" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="yourname@gmail.com"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>

              {/* Form errors */}

              <div className="flex justify-center">
                {error?.error && (
                  <span className="text-red-600 text-xs text-center">
                    {error.message}
                  </span>
                )}
              </div>

              <div className="flex justify-center text-xs gap-1">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="flex-1 bg-blue-700 hover:bg-blue-800"
              type="submit"
            >
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
