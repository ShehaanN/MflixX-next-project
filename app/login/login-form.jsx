"use client";

import { useState } from "react";

//client component for CSR

export default function LoginForm({ title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", { email, password });
  };

  return (
    <div className="w-[380px] mx-auto">
      <div className="bg-white shadow-md border rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-center text-xl font-semibold text-gray-900">
            {title}
          </h3>
          {/*email*/}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 "
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-[gray-40] border border-gray-300  rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder="yourname@gmail.com"
            />
          </div>
          {/*password*/}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-[gray-40] border border-gray-300  rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              placeholder="*************"
            />
          </div>

          <div className="flex flex-row items-start justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  className="bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-300 h-4 w-4 rounded"
                  id="remember"
                />
              </div>

              <div className="text-sm ml-3">
                <label htmlFor="remember" className="font-medium text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

            <a
              href="/forget-password"
              className="text-sm text-blue-700 font-medium hover:underline "
            >
              Forget password?
            </a>
          </div>

          {/*submit button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign in
          </button>

          <div className="flex text-sm justify-center  font-medium text-gray-500 space-x-1">
            <span>Don't have an account?</span>
            <a href="#" className="text-blue-700 hover:underline">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
