import Link from "next/link";

interface ProductPageProps {
  params: {
    id: string;
  };
}

//Como trabajamos con un server components, podemos traer props.
export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;

  const id = resolvedParams.id;

  if (!resolvedParams || !resolvedParams.id) {
    return <h1>Error: ID not Found</h1>;
  }

  return (
    <div className="flex-col justify-between">
      <div className="mb-4 w-96 h-96 flex justify-center items-center bg-yellow-300 rounded-xl">
        <span className="text-red-400 text-2xl">
          ProductPage <span className="text-lime-600">{id}</span>
        </span>
      </div>
      <div className="flex justify-center w-96 items-center">
        <Link
          href="/dashboard"
          className="bg-blue-600  hover:bg-blue-500 text-white
      p-4 transition-300 rounded-lg"
        >
          Regresar a Dashboard
        </Link>
      </div>
    </div>
  );
}
