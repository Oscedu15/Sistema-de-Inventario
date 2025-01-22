"use client";

import { useState } from "react";
import { FaDatabase, FaTimes } from "react-icons/fa";

interface Supplier {
  name: string;
  contact: string;
  address: string;
  phone: string;
  country: string;
}

export default function SupplierForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [supplier, setSupplier] = useState<Supplier>({
    name: "",
    contact: "",
    country: "",
    phone: "",
    address: "",
  }); //Form

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //Con JSON.stringify, convertimos a formato json el body
        body: JSON.stringify(supplier),
      });

      if (response.ok) {
        setMessage("Supplier created successfully!");
        setSupplier({
          name: "",
          contact: "",
          country: "",
          phone: "",
          address: "",
        });
      } else {
        setMessage("Error creating supplier");
      }
    } catch (error) {
      setMessage("Something went wrong");
      console.error("Error >>>:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSupplier({
      name: "",
      contact: "",
      country: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="flex bg-gray-200 flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 space-y-4 rounded-lg
         shadow w-full max-w-2xl"
      >
        <h2
          className="text-2xl font-bold text-center
        text-green-800 bg-green-100 px-4 py-2 rounded-md shadow-sm"
        >
          Manage Suppliers
        </h2>

        {/* Suppliers Name */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Suppliers Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            // SIi existe un departamento seleccionado en el input de busqueda, tambien lo refleja en este input
            value={supplier.name}
            onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            placeholder="Enter supplier name"
          />
        </div>
        {/* Contact Email */}
        <div>
          <label htmlFor="contact" className="block font-medium">
            Contact Email:
          </label>
          <input
            type="email"
            id="contact"
            value={supplier.contact}
            onChange={(e) =>
              setSupplier({ ...supplier, contact: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter supplier email"
          />
        </div>
        {/*  address */}
        <div>
          <label htmlFor="contact" className="block font-medium">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={supplier.address}
            onChange={(e) =>
              setSupplier({ ...supplier, address: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter supplier address"
          />
        </div>
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-medium">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={supplier.phone}
            onChange={(e) =>
              setSupplier({ ...supplier, phone: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter supplier phone"
          />
        </div>
        {/* Country */}
        <div>
          <label htmlFor="country" className="block font-medium">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={supplier.country}
            onChange={(e) =>
              setSupplier({ ...supplier, country: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter supplier country"
          />
        </div>
        {/* Actions Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center text-white px-4 py-2 rounded bg-green-600 hover:bg-green-700`}
          >
            <FaDatabase className="mr-2" />
            <span>{loading ? "Creating ..." : "Create"}</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            <FaTimes className="mr-2" />
            <span>Cancel</span>
          </button>
        </div>
        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
