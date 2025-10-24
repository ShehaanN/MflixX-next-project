import { api } from "@/lib/api";

export const loginUser = async (loginData) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginData?.email,
        password: loginData?.password,
      }),
    });
    const data = await response.json();
    console.log("LOGIN ACTION", data);
    return response.ok ? data : undefined;
  } catch (error) {
    console.error("Login Error", error);
    return undefined;
  }
};
// Register user
export const registerUser = async (formData) => {
  try {
    const response = await api.post("v1/register", { json: formData });
    if (response.ok) {
      return response.json();
    } else {
      return undefined;
    }
  } catch (error) {
    const status = error.response.status;
    const responseBody = await error.response.json();
    if (status && responseBody) {
      if (status === 409) {
        return responseBody;
      } else {
        return undefined;
      }
    }
    return undefined;
  }
};
//Get movie data
export const getMovies = async () => {
  try {
    const response = await api.get("v1/movies", { cache: "no-store" });

    // Ensure response is ok and has JSON content
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return [];
    }

    // Check if response contains JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      console.error("Received non-JSON response:", await response.text());
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
