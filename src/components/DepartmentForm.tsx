"use client";
import React, { useEffect, useState } from "react";
// import { redirect } from "next/navigation";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  FaDatabase,
  FaFileAlt,
  FaTimes,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

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

  useEffect(() => {
    fetchDepartments(query);
  }, [query]);

  const fetchDepartments = async (search: string) => {
    try {
      const url = search
        ? `/api/departments?search=${search}`
        : "/api/departments";

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setDepartments(data.departments);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  //Funcion para refrescar la lista de Departamentos
  const refreshDepartments = async () => {
    try {
      //Cuando hacemos un llamado a la api, sin especificar es una peticion GET
      const response = await fetch("/api/departments");

      if (response.ok) {
        //Si la respuesta es exitosa, la convertimos en un objeto Javascript
        const data = await response.json();
        setDepartments(data.departments);
      } else {
        console.error("Failed to refresh departments");
      }
    } catch (error) {
      console.error("Error refreshing departments", error);
    }
  };

  const handleDelete = async () => {
    if (!selectdDepartment) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the department: ${selectdDepartment.name}?`
    );

    if (!confirmDelete) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/departments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectdDepartment.id }),
      });

      if (response.ok) {
        setMessage("Department deleted successufully!");
        setSelectdDepartment(null);
        setName("");
        await refreshDepartments();
      } else {
        setMessage("Error deleting department");
      }
    } catch (error) {
      setMessage("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = "/api/departments";
      //Si hay un departamento seleccionado, enviamos el metodo PATCH para actualizar, sino enviamos el metodo POST para la creacaion de un nuevo departamento
      const method = selectdDepartment ? "PATCH" : "POST";

      //Si estamos actualizando un departamento pasamos como body el nombre e id del mismo, si estamos creandolo, solo pasamos el name
      const body = selectdDepartment
        ? { id: selectdDepartment.id, name }
        : { name };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        //Con JSON.stringify, convertimos a formato json el body
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage(
          selectdDepartment
            ? "Department updated successfully!"
            : "Department created successfully!"
        );
        setName("");
        setSelectdDepartment(null);
        //Funcionalidad que usaremos para actualizar una lista
        await refreshDepartments();
        // setTimeout(() => {
        //   redirect("/dashboard/departments/list");
        // }, 700);
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
    <div className="flex bg-gray-200 flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 space-y-4 rounded shadow"
      >
        <h2
          className="text-2xl font-bold text-center
        text-green-800 bg-green-100 px-4 py-2 rounded-md shadow-sm"
        >
          Manage Departments
        </h2>

        {/* Combobox for search */}
        {/* Si el usuario solicita el input, isSearchActive pasa a estar en true y emerge el siguiente codigo  */}
        {isSearchActive && (
          <div>
            <label htmlFor="search" className="block font-medium">
              Search Department
            </label>
            {/* Combobox es una libreria de terceros, que nos permite una mejor interaccion con el usuario a nivel de interfaz */}
            <Combobox
              value={selectdDepartment}
              onChange={(department) => {
                //Guardamos el departamento seleccionado por el usuario
                setSelectdDepartment(department);
                setName(department?.name || "");
              }}
            >
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

                  {departments?.length === 0 ? (
                    <div className="p-2 text-gray-700">No results found</div>
                  ) : (
                    departments.map((department: Department) => (
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
            value={name}
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
            className={`flex items-center text-white px-4 py-2 rounded
            ${
              selectdDepartment
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <FaDatabase className="mr-2" />
            <span>
              {loading
                ? selectdDepartment
                  ? "Updating ..."
                  : "Creating ..."
                : selectdDepartment
                ? "Update"
                : "Create"}
            </span>
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
            className={`flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded ${
              !selectdDepartment ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDelete}
          >
            <FaTrash className="mr-2" />
            <span>{loading ? "Deleting..." : "Delete"}</span>
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
            onClick={() =>
              (window.location.href = "/dashboard/departments/list")
            }
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaFileAlt className="mr-2" />
            <span>View List</span>
          </button>
        </div>
        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
