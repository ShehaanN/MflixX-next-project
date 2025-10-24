import { betterAuth } from "better-auth";
import { db } from "@/lib/mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    //auto sign in false - then it prevents auto sign in
  },
});
