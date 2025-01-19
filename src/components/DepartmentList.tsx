"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { InvoicesTableSkeleton } from "./Skelleton";

//Creamos la intrefaz de Department
interface Department {
  id: number;
  name: string;
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  //Le decimos a React que guardaremos en el estado, un array de objetos de tipo Department
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    const fetchDepartments = async () => {
      try {
        //Le pasamos a la url como parametros, la pagina y el limite de departamentos que queremos mostrar
        const response = await fetch(
          `/api/departments?page=${page}&limit=${limit}`
        );
        //Hacemos una petición a la API de departamentos, para recibir la lista de departamentos

        if (response.ok) {
          //Si la respuesta es positiva, convetimos la respuesta a formato json y guardamos los datos en la variable data
          const data = await response.json();
          //Luego guardamos en el estado setDepartments los datos de la variable data
          setDepartments(data.departments);
          setTotalPages(Math.ceil(data.total / limit));
        } else {
          //Si la respuesta es incorrecta, mostramos un mensaje de error
          console.error("Failed to fetch departments");
        }
      } catch (error) {
        //Si hay un error, mostramos un mensaje de error
        console.error("Error fetching departments", error);
      } finally {
        setLoading(false);
      }
    };
    //Lamamos a la función fetchDepartments, usando useEffect para que se ejecute cuando el componente se monte
    fetchDepartments();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) {
    return <InvoicesTableSkeleton />;
  }

  if (departments.length === 0) {
    return <p>No departments found</p>;
  }

  return (
    <div>
      <ul className="space-y-1">
        {departments?.map((department) => (
          <li key={department.id} className="p-2 border rounded bg-gray-100">
            {department.name}
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="flex items-center cursor-pointer transition duration-300 hover:text-white bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50 disabled:hover:text-gray-950  disabled:hover:bg-gray-300"
        >
          <FaArrowLeft className="mr-2" /> Previous
        </button>
        <span className="text-gray-700">
          Page: {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="flex items-center cursor-pointer transition duration-300 hover:text-white bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50 disabled:hover:text-gray-950 disabled:hover:bg-gray-300"
        >
          <FaArrowRight className="mr-2" />
          Next
        </button>
      </div>
      <button
        // Funcion que nos permite en cambiarnos, de una ventana a otra
        onClick={() => (window.location.href = "/dashboard/departments")}
        className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <FaArrowLeft className="mr-2" />
        <span>Back to Form</span>
      </button>
    </div>
  );
}
