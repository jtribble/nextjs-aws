import {Prisma} from "@prisma/client";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import {prismaClient} from "../../prisma";

export async function GET(request: Request) {
  return Response.json({
    users: await prismaClient.user.findMany(),
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const result = await prismaClient.user.create({ data });
    return Response.json({ result });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Response.json({ error, message: error.message }, { status: 400 });
    }
    return Response.json({ error }, { status: 500 });
  }
}