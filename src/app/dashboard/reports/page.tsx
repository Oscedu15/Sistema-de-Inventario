import Link from "next/link";

export default function ReportPage() {
  return (
    <div className="flex">
      <div>ReportPage</div>
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
