import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { name, email, password } = await req.json();
  console.log(name, email, password);

  if (!name || !email || !password) {
    return NextResponse.json(
      {
        error: "name, email, and password are required",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({ success: true, name, email });
};
