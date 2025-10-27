import { clientPromise } from "@/lib/mongodb";
import UserTable from "./user-table";

export default async function UserData() {
  try {
    console.log("Users - Connecting to MongoDB...");
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    // Get users with active sessions by joining user and session collections
    const usersWithSessions = await db
      .collection("user")
      .aggregate([
        {
          $lookup: {
            from: "session",
            localField: "_id",
            foreignField: "userId",
            as: "sessions",
          },
        },
        {
          $match: {
            "sessions.0": { $exists: true }, // Only users with at least one session
          },
        },
        {
          $addFields: {
            activeSessionsCount: { $size: "$sessions" },
            lastActive: { $max: "$sessions.createdAt" },
          },
        },
        {
          $limit: 10,
        },
      ])
      .toArray();

    console.log("Users with sessions found:", usersWithSessions.length);

    if (usersWithSessions && usersWithSessions.length > 0) {
      //Refine users query to an array
      const refinedUsers = usersWithSessions.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,

        lastActive: user.lastActive
          ? new Date(user.lastActive).toLocaleString()
          : "N/A",
        hasActiveSession: user.sessions && user.sessions.length > 0,
      }));
      //Pass users refined data to table
      //Return user table
      return <UserTable users={refinedUsers} />;
    } else {
      return (
        <div className="flex items-center justify-center h-[150px]">
          <p className="text-yellow-700 font-medium">
            No users with active sessions found!
          </p>
        </div>
      );
    }
  } catch (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center h-[150px]">
        <p className="text-red-700 font-medium animate-pulse duration-1000">
          Users Not Found!
        </p>
      </div>
    );
  }
}
