'use client'
import React, { useState } from "react";

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
      } else {
        setMessage("Error creating departments");
      }
    } 
    catch (error) {
      setMessage("Something went wrong");
      console.error("Error >>>:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName('')
  }

  return <form onSubmit={handleSubmit} className="bg-white p-6 space-y-4 rounded shadow">
    <h2 className="text-2xl font-bold">Create Department</h2>
  </form>;
}
