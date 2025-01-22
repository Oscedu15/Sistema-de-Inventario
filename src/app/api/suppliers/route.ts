import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export async function GET (req: Request) {

// }

//TODO: Funcion para crear un nuevo Proveedor
export async function POST(req: Request) {
  try {
    const { name, contact, address, phone, country } = await req.json();

    if (!name || !contact) {
      return new Response("Name or contact are required", { status: 400 });
    }

    const supplier = await prisma.supplier.create({
      data: { name, contact, address, phone, country },
    });

    return Response.json(supplier, { status: 201 });
    
  } catch (error) {
    console.error(error);
    return new Response("Failed to create supplier", { status: 500 });
  }
}

// export async function PATCH(req: Request) {

// }
// export async function DELETE(req: Request) {

// }
