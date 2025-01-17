import Link from "next/link";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-400 p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block p-2 rounded-lg bg-blue-400 hover:bg-blue-300 text-white hover:text-slate-700
                "
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/reports"
                className="block p-2 rounded hover:bg-gray-300"
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="block p-2 rounded hover:bg-gray-300"
              >
                Configuration
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
