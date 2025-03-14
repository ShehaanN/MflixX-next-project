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
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
// import { registerUser } from "@/lib/apis/server";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

// Keep this as the client component (functional component)
export default function RegisterForm() {
  const [error, setError] = useState(DEFAULT_ERROR);
  const [isLoading, setLoading] = useState(false);

  const handleSubmitForm = async (event) => {
    event?.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const name = formData.get("name").toString() ?? "";
    const email = formData.get("email").toString() ?? "";
    const password = formData.get("password").toString() ?? "";
    const confirmPassword = formData.get("confirm-password".toString()) ?? "";

    // console.log("Form submitted", { name, email, password, confirmPassword });

    //Basic frontend validation logic
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        setError(DEFAULT_ERROR);

        // const registerResp = await registerUser({ name, email, password });

        // if (registerResp?.error) {
        //   setError({ error: true, message: registerResp.error });
        // } else {

        // }
        setLoading(true);
        const { data, error } = await signUp.email(
          {
            email: email,
            password: password,
            name: name,
            image: undefined,
          },
          {
            onRequest: () => {
              //
            },
            onSuccess: (ctx) => {
              console.log("onSuccess", ctx);
              toast.success("Registration successful.");
            },
            onError: (ctx) => {
              // console.log("onError", ctx);
              if (ctx) {
                setError({ error: true, message: ctx.error.message });
              }
            },
          }
        );
        setLoading(false);

        if (data) {
          console.log("data", data);
        }
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
          <CardTitle className="text-xl text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-xs text-center">
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
                  <span className="text-red-600 text-xs text-center animate-pulse duration-1000">
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
              className="flex-1 font-medium bg-blue-700 hover:bg-blue-800"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
