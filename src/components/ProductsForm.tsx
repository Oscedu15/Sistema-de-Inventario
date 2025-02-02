"use client";
import { useState, useEffect } from "react";
import { FaDatabase, FaTimes } from "react-icons/fa";
import { Combobox } from "@headlessui/react";

interface ProductForm {
  name: string;
  quantity: number;
  price: number;
  cost: number;
  departmentId: number;
  supplierId?: number;
}

interface Department {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
}

export default function ProductsFormInputs() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200"></div>
  );
}
