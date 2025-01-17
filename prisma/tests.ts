//Todo: Archivo que usamos para hacer tests de prisma

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runTests() {
    //? Simple Mensaje
  console.log("Running tests...");

  //?Departamentos con productos
  const departments = await prisma.department.findMany({
    include: {
      products: true,
    },
  });
  console.log("Departments", JSON.stringify(departments, null, 2));
  //Lo traducimos con JSON.stringify, pasando la respuesta, null para que sean todos y el 2 para que sea un numero de interacion legible

  //? Filtrandos productos por Departamentos
  const tools = await prisma.product.findMany({
    where: { department: { name: "Tools" } },
  });
  console.log("Products in the Tools departments:", tools);
}

runTests()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//node --loader ts-node/esm prisma/tests.ts
