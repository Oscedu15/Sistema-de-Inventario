"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { FaDatabase, FaFileAlt, FaTimes, FaSearch } from "react-icons/fa";

//Creamos la intrefaz de Department
interface Department {
  id: number;
  name: string;
}

export default function DepartmentForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //!Estados para Combobox
  const [departments, setDepartments] = useState<Department[]>([]);
  //Le decimos a React que guardaremos en el estado, un array de objetos de tipo Department
  const [selectdDepartment, setSelectdDepartment] = useState<Department | null>(
    null
  );
  //En query, guardaremos el texto ingresado en el inputde busqueda.
  const [query, setQuery] = useState("");
  //En este estado guardamos el estado, para aperturar o no el input de busqueda
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  //!Funcionalidad para trabajar con la busqueda incremental.
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        //Al montarse el componente, hacemos un llamado a la api
        const response = await fetch("/api/departments");
        //Si la respuesta es ok, la guardamos en una constante despues de convertirla en formato json
        if (response.ok) {
          const data = await response.json();
          //Luego la almacenamos en el estado setDepartments
          setDepartments(data.departments);
        } else {
          console.error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error fetching departments", error);
      }
    };

    fetchDepartments();
  }, []);

  //Filtramos los departamentos, dependiendo del texto de busqueda
  const filteredDepartments =
    //Si query es igual a "", cargamos todos los departamentos, sino filtramos y cargamos el departamento que coincida con el valor de query en minuscula
    query === ""
      ? departments
      : departments.filter((department) =>
          department.name
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
        );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setMessage("Department created succesfully!");
        setName("");
        setSelectdDepartment(null);
        setTimeout(() => {
          redirect("/dashboard/departments/list");
        }, 700);
      } else {
        setMessage("Error creating departments");
      }
    } catch (error) {
      setMessage("Something went wrong");
      console.error("Error >>>:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setSelectdDepartment(null);
  };

  //Funcion para activar y desactivar el campo de busqueda
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setSelectdDepartment(null);
    // Con setQuery(""), nos aseguramos que el input este vacio a la hora que emerga el input
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 space-y-4 rounded shadow"
    >
      <h2 className="text-2xl font-bold">Manage Department</h2>

      {/* Combobox for search */}
      {/* Si el usuario solicita el input, isSearchActive pasa a estar en true y emerge el siguiente codigo  */}
      {isSearchActive && (
        <div>
          <label htmlFor="search" className="block font-medium">
            Search Department
          </label>
          {/* Combobox es una libreria de terceros, que nos permite una mejor interaccion con el usuario a nivel de interfaz */}
          <Combobox value={selectdDepartment} onChange={setSelectdDepartment}>
            <div className="relative">
              <ComboboxInput
                className="w-full p-2 border rounded"
                onChange={(e) => setQuery(e.target.value)}
                displayValue={(department: Department) =>
                  department?.name || ""
                }
                placeholder="Type to search..."
              />
              <ComboboxOptions className="absolute z-10 mt-1 max-h-60  w-full overflow-auto bg-white border rounded shadow-lg">
                {/* Si luego de que el usuario ingrese unos datos y no encuentre coincidencias, responde: No Results Found */}
                {filteredDepartments.length === 0 ? (
                  <div className="p-2 text-gray-700">No results found</div>
                ) : (
                  filteredDepartments.map((department: Department) => (
                    // Si se consigue coincidencias, con los datos ingresados por el usuario, los muestra en pantalla
                    <ComboboxOption
                      key={department.id}
                      value={department}
                      className="cursor-pointer select-none p-2 hover:bg-gray-200"
                    >
                      {department.name}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </div>
          </Combobox>
        </div>
      )}

      {/* Department Name */}
      <div>
        <label htmlFor="name" className="block font-medium">
          Department Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          // SIi existe un departamento seleccionado en el input de busqueda, tambien lo refleja en este input
          value={selectdDepartment ? selectdDepartment.name : name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      {/* Actions Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          <FaDatabase className="mr-2" />
          <span>{loading ? "Creating..." : "Create"}</span>
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          <FaTimes className="mr-2" />
          <span>Cancel</span>
        </button>
        <button
          type="button"
          // Al darle click a este botn, hacemos emerger u ocultar el input de busqueda .
          onClick={toggleSearch}
          className="flex items-center text-white bg-gray-500 text-whit px-4 py-2
        rounded hover:bg-gray-600"
        >
          <FaSearch className="mr-2" />
          <span>{isSearchActive ? "Close Search" : "Find"}</span>
        </button>
        {/* window.location.href : Funcion que nos permite en cambiarnos, de una ventana a otra */}
        <button
          onClick={() => (window.location.href = "/dashboard/departments/list")}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaFileAlt className="mr-2" />
          <span>View List</span>
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </form>
  );
}
