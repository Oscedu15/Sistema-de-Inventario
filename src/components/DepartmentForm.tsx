"use client";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { FaDatabase, FaFileAlt, FaTimes } from "react-icons/fa";

export default function DepartmentForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 space-y-4 rounded shadow"
    >
      <h2 className="text-2xl font-bold">Create Department</h2>
      <div>
        <label htmlFor="name" className="block font-medium">
          Department Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="flex space-x-4">
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
