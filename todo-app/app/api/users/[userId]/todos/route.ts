import {prismaClient} from "../../../../prisma";
import {Prisma} from ".prisma/client";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import {NextRequest} from "next/server";

export async function GET(request: NextRequest, { params: { userId } }: { params: { userId: string } }) {
  const id = parseInt(userId, 10);
  const user = await prismaClient.user.findUnique({ where: { id }});
  if (user === null) {
    return Response.json({}, {status: 404});
  }
  return Response.json({
    user,
    todos: await prismaClient.todo.findMany({ where: { userId: parseInt(userId, 10) }}),
  });
}

export async function POST(request: Request, { params: { userId } }: { params: { userId: string } }) {
  const id = parseInt(userId, 10);
  const user = await prismaClient.user.findUnique({ where: { id }});
  if (user === null) {
    return Response.json({}, {status: 404});
  }
  const data = await request.json();
  data["userId"] = id;
  try {
    const result = await prismaClient.todo.create({ data });
    return Response.json({ result });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Response.json({ error, message: error.message }, { status: 400 });
    }
    return Response.json({ error }, { status: 500 });
  }
}