"use server";
import { clientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Helper to get database connection
const getDb = async () => {
  const client = await clientPromise();
  return client.db("sample_mflix");
};

// Get all users with session information
export const getUsersWithSessions = async () => {
  try {
    const db = await getDb();

    const users = await db
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
      ])
      .toArray();

    return { success: true, users };
  } catch (error) {
    console.error("Failed to fetch users with sessions:", error);
    return { success: false, error: error.message };
  }
};

// Delete specific user session
export const deleteUserSession = async (sessionId) => {
  try {
    const db = await getDb();

    const result = await db
      .collection("session")
      .deleteOne({ _id: new ObjectId(sessionId) });

    console.log(`Session deleted - deletedCount: ${result.deletedCount}`);

    if (result.acknowledged && result.deletedCount > 0) {
      return { success: true, message: "Session deleted successfully" };
    } else {
      return { success: false, message: "Session not found" };
    }
  } catch (error) {
    console.error("Failed to delete session:", error);
    return { success: false, error: error.message };
  }
};

// Delete all sessions for a specific user
export const deleteAllUserSessions = async (userId) => {
  try {
    const db = await getDb();

    const result = await db
      .collection("session")
      .deleteMany({ userId: new ObjectId(userId) });

    console.log(`User sessions deleted - deletedCount: ${result.deletedCount}`);

    if (result.acknowledged) {
      return {
        success: true,
        message: `${result.deletedCount} sessions deleted successfully`,
        deletedCount: result.deletedCount,
      };
    } else {
      return { success: false, message: "Failed to delete sessions" };
    }
  } catch (error) {
    console.error("Failed to delete user sessions:", error);
    return { success: false, error: error.message };
  }
};

// Get session details
export const getSessionDetails = async (userId) => {
  try {
    const db = await getDb();

    const sessions = await db
      .collection("session")
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();

    return { success: true, sessions };
  } catch (error) {
    console.error("Failed to fetch session details:", error);
    return { success: false, error: error.message };
  }
};
