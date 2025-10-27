import { clientPromise } from "@/lib/mongodb";
import UserTable from "./user-table";

export default async function UserData() {
  try {
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    // Get all users with their session information
    const usersQuery = await db
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
          $addFields: {
            activeSessionsCount: { $size: "$sessions" },
            lastActive: { $max: "$sessions.createdAt" },
            hasActiveSession: { $gt: [{ $size: "$sessions" }, 0] },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: 10,
        },
      ])
      .toArray();

    if (usersQuery && usersQuery.length > 0) {
      //Refine users query to an array
      const refinedUsers = usersQuery.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,

        lastActive: user.lastActive
          ? new Date(user.lastActive).toLocaleString()
          : "-",
        hasActiveSession: user.hasActiveSession || false,
      }));
      //Pass users refined data to table
      //Return user table
      return <UserTable users={refinedUsers} />;
    } else {
      return (
        <div className="flex items-center justify-center h-[150px]">
          <p className="text-yellow-700 font-medium">No users found!</p>
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
