import { MongoClient } from "mongodb";

const clientPromise = () => {
  const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
  const options = {};

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  const client = new MongoClient(MONGODB_URI, options);
  return client.connect();
};

export default clientPromise;
