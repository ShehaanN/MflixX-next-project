import { HTTPError } from "ky";
import { api } from "../api";

export const loginUser = async (loginData) => {
  console.log("loginData", loginData);
  const response = await fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    body: JSON.stringify({
      email: loginData?.email,
      password: loginData?.password,
    }),
  });

  console.log("LOGIN ACTION", response.json());
};

export const getMovies = async () => {
  try {
    const response = await api.get("movies");
    const data = await response.json();
    // console.log("Movies Data:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
    if (error?.response) {
      const status = error?.response?.status;
      const responseBody = await error?.response?.text(); // Read as text to see if it's HTML
      console.log("HTTP Error:", status, responseBody);
    } else {
      console.log("Unknown error:", error);
    }
    return undefined;
  }
};
