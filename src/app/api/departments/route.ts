import { PrismaClient } from "@prisma/client";
//TODO: Este es el backend de la aplicación, por lo que no necesitamos importar React

const prisma = new PrismaClient();

//Funcion que usamos al crear nuevos departamentos
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    const department = await prisma.department.create({
      data: { name },
    });

    return Response.json(department, { status: 201 });
  } catch (error) {
    return new Response("Failed to create department", { status: 500 });
    console.log(error);
  }
}

//Funcion que usamos para obtener la lista de departamentos
export async function GET() {
  try {
    //Solicita a la base de datos la lista de departamentos
    const departments = await prisma.department.findMany();
    //Si la respuesta es afirmativa, la devolverá en formato json, con un status 200 de respuesta afirmativa
    return Response.json(departments, { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch departments ${error}`, {
      status: 500,
    });
  }
}
