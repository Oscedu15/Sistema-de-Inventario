import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`DELETE FROM Supplier;`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Supplier';`;
  await prisma.$executeRaw`DELETE FROM Product;`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Product';`;
  await prisma.$executeRaw`DELETE FROM Department;`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Department';`;

  // Crear Tabla de Departamentos
  await prisma.department.createMany({
    data: [{ name: "Tools" }, { name: "Paints" }, { name: "Electricity" }],
  });
  console.log("Departaments created");

  // Crear Tabla de Proovedores
  await prisma.supplier.createMany({
    data: [
      { name: "Paints Supplier", contact: "supplier-paints@gmail.com" },
      { name: "Tools Supplier", contact: "supplier-tools@gmail.com" },
    ],
  });
  console.log("Products suppliers");

  // Crear Tabla de Productos
  await prisma.product.createMany({
    data: [
      {
        name: "Hammer",
        quantity: 15,
        price: 15.99,
        cost: 12.99,
        departmentId: 1,
        supplierId: 2,
      },
      {
        name: "White Paint",
        quantity: 25,
        price: 19.99,
        cost: 17.99,
        departmentId: 2,
        supplierId: 1,
      },
      {
        name: "Electric Cable",
        quantity: 50,
        price: 4.99,
        cost: 2.99,
        departmentId: 3,
        supplierId: 2,
      },
    ],
  });
  console.log("Products created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  //npx prisma db seed