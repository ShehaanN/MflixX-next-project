import { NextResponse } from "next/server";

export const POST = async (req) => {
  const request = await req.json();
  console.log(request);

  //Bind Database
  // Find the user in the database
  // If the user exists, check the password validity
  // If the password is valid, return the password with torken
  // If the password is invalid, return an error message

  return NextResponse.json({ success: true, username: "ShehaanN" });
};
