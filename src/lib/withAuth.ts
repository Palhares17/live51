import { request } from "http";
import { NextRequest } from "next/server";
import { auth } from "./auth";
import { User } from "@/entities/User";

interface NextRequestWithUser extends NextRequest {
  user: User;
}

export function withAuth(
  handler: (request: NextRequestWithUser) => Promise<any>
) {
  return async (request: NextRequest) => {
    const user = await auth();

    if (!user) {
      return {
        status: 401,
        body: {
          error: "Unauthorized",
        },
      };
    }

    const reqWithUser = request as NextRequestWithUser;

    reqWithUser.user = user;

    return handler(reqWithUser);
  };
}
