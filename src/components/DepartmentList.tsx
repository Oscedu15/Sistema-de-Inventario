"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

//Creamos la intrefaz de Department
interface Department {
  id: number;
  name: string;
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([]);
  //Le decimos a React que guardaremos en el estado, un array de objetos de tipo Department
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        //Hacemos una petición a la API de departamentos, para recibir la lista de departamentos

        if (response.ok) {
          //Si la respuesta es positiva, convetimos la respuesta a formato json y guardamos los datos en la variable data
          const data = await response.json();
          //Luego guardamos en el estado setDepartments los datos de la variable data
          setDepartments(data);
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (departments.length === 0) {
    return <p>No departments found</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">DepartmentsList</h2>
      <ul className="space-y-2">
        {departments?.map((department) => (
          <li key={department.id} className="p-2 border rounded bg-gray-100">
            {department.name}
          </li>
        ))}
      </ul>
      {/* Funcion que nos permite en cambiarnos, de una ventana a otra */}
      <button
        onClick={() => (window.location.href = "/dashboard/departments")}
        className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <FaArrowLeft className="mr-2" />
        <span>Back to Form</span>
      </button>
    </div>
  );
}
