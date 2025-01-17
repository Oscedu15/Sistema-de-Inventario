"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaList, FaBox, FaBars } from "react-icons/fa";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const path = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Button for small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 p-2 bg-green-700 text-white rounded md:hidden"
      >
        <FaBars />
      </button>
      <aside
        className={`fixed top-0 left-0 w-64 h-full min-h-screen bg-green-700 text-white p-4 font-bold transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <nav>
          <ul className="space-y-2 mt-16 md:mt-0">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center space-x-2 p-2 rounded hover:bg-green-400 ${
                  path === "/dashboard"
                    ? "bg-green-400 text-white"
                    : "text-gray-300 font-semibold"
                }`}
              >
                <FaHome />
                <div className="px-2">Home</div>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/departments"
                className={`flex items-center space-x-2 p-2 rounded hover:bg-green-400 ${
                  path === "/dashboard/departments"
                    ? "bg-green-400 text-white"
                    : "text-gray-300 font-semibold"
                }`}
              >
                <FaList />
                <div className="px-2 hidden md:block">Departments</div>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/products"
                className={`flex items-center space-x-2 p-2 rounded hover:bg-green-400 ${
                  path === "/dashboard/products"
                    ? "bg-green-400 text-white"
                    : "text-gray-300 font-semibold"
                }`}
              >
                <div className="flex justify-center gap-x-4 items-center">
                  <FaBox className="w-5 h-5 hover:w-6 hover:h-6" />
                  Products
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-4">{children}</main>
      {/* Especifica cuánto crecerá un elemento en relación con los demás elementos flexibles del contenedor. */}
    </div>
  );
}
