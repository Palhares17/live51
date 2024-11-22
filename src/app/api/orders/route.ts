import { auth } from "@/lib/auth";
import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";

export const GET = withAuth(async (request) => {
  return NextResponse.json({ message: "Hello World!", user: request.user });
});
