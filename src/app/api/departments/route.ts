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
export async function GET(req: Request) {
  try {
    //!Pasos para hacer una paginacion
    //Esta constante url, nos sirve para recuperar tanto el numero de paginas como el limite
    const url = new URL(req.url);
    //Esta constante page, nos sirve para recuperar el numero de pagina, forzando que sea un numero entero con parseInt, obteniendo el valor de la propiedad page, y si no hay ningun valor, se establece por defecto en 1
    const page = parseInt(url.searchParams.get("page") || "1", 10);

    //Esta constante limit, nos sirve para recuperar el limite de elementos por pagina, forzando que sea un numero entero con parseInt, obteniendo el valor de la propiedad limit, y si no hay ningun valor, se establece por defecto en 10
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    //Lo utilizamos para obtener de la url la propiedad search y si no existe la establecemos en blanco.
    const search = url.searchParams.get("search") || "";

    const departments = search
      ? //Solicita a la base de datos la lista de departamentos
        await prisma.department.findMany({
          where: {
            name: {
              contains: search,
            },
          },
        })
      : await prisma.department.findMany({
          //skip: (page - 1) * limit, nos permite saltar los elementos que no queremos mostrar
          skip: (page - 1) * limit,
          //take: limit, nos permite tomar o limitar los elementos que queremos mostrar
          take: limit,
        });

    //Solicita a la base de datos, el numero total de departamentos
    const total = await prisma.department.count({});
    //!Aqui terminan los pasos para hacer la paginacion

    //Si la respuesta es afirmativa, la devolverá en formato json, con un status 200 de respuesta afirmativa, pasando como parametros los departamentos, el total de departamentos, la pagina y el limite para la paginacion
    return Response.json({ departments, total, page, limit }, { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch departments ${error}`, {
      status: 500,
    });
  }
}

//Todo: Funcion para actualizar nombres de Departamentos
export async function PATCH(req: Request) {
  try {
    //Convierte el cuerpo de la solicitud http a un objeto javascript
    const { id, name } = await req.json();

    //Si el id o el name no existe, retorna un status 400
    if (!id || !name) {
      return new Response("ID and Name are Required", { status: 400 });
    }

    //Hacemos un llamado a la base de datos, con el metodo update
    // para la modificacion de los departamentos
    const department = await prisma.department.update({
      //Usamos parseInt para pasar el id de un string a numero entero en base de 10
      where: { id: parseInt(id, 10) },
      //Enviamos como data, el nombre del departamento a actualizar
      data: { name },
    });

    return Response.json(department, { status: 200 });
  } catch (error) {
    //Con console.error, mostramos el error en la consola del servidor
    console.error(error);
    //Devolvemos una respuesta htpp indicando que hubo un error a la hora de actualizar el departamento
    return new Response("Failed to update department", { status: 500 });
  }
}

//Todo: Funcion para eliminar Departamentos
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response("ID not ok", { status: 400 });
    }

    //?Validation future relationships

    //Aqui guardamos la cantidad de productos relacionados con el departamento que queremos eliminar
    const relatedProductsCount = await prisma.product.count({
      where: { departmentId: parseInt(id, 10) },
    });
    //Si hay un producto o mas con el departamento a eliminar, arrojamos el siguiente error
    if (relatedProductsCount > 0) {
      return new Response("Cannot delete department with related products", {
        status: 400,
      });
    }

    //Guardamos en esta constante el departamento eliminado
    const department = await prisma.department.delete({
      where: { id: parseInt(id, 10) },
    });

    return Response.json(department, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}

//request = requerir

//response = respuesta

//Cuando trabajas en una aplicación, la arquitectura correcta es que tu aplicación le pida cualquier información que necesite (datos, nombres, listas, archivos, todo) a una segunda aplicación muy diferente.

//Esa segunda aplicación se le suele llamar “backend” o “servicio API”. Una API no es mas que una aplicación separada que envia información a aquellas aplicaciones que usa el cliente (el usuario).

//Una API cuando recibe una petición (asi se le dice cuando tu aplicación está pidiéndole datos a tu API) tiene un flujo. Primero le manda un “request” a la api, y la api le devuelve un “response”.

//En la request tu le dices a la api - “oye, quiero 3 datos”, y la api en el response te escribe los datos y te los manda.
