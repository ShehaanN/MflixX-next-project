"use client";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserTable({ users }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold"># Avatar</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>

            <TableHead className="font-bold">Last Active</TableHead>
            <TableHead className="font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    className="h-10 w-10 border-2 border-blue-500 rounded-full"
                    src="https://github.com/shadcn.png"
                  />
                </Avatar>
              </TableCell>
              <TableCell>{user?.name ?? "N/A"}</TableCell>
              <TableCell>{user?.email ?? "N/A"}</TableCell>

              <TableCell className="text-sm text-gray-600">
                {user?.lastActive ?? "N/A"}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user?.hasActiveSession
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user?.hasActiveSession ? "Online" : "Offline"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
