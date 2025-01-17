"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaList, FaBox } from "react-icons/fa";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const path = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-green-700 p-4 text-white font-bold">
        <nav>
          <ul className="space-y-2">
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
                <div className="px-2">Departments</div>
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
