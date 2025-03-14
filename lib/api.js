import ky from "ky";

export const api = ky.create({
  prefixUrl: process.env.API_BASE_URL, //this prefends a base url to every request made with this api instance
  timeout: 60000, //sets the maximum time in milliseconds to wait for a request to complete before aborting
  retry: 0, //configures the number of times to retry failed requests should automatically retry
});
