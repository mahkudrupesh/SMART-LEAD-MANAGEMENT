import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/70 to-violet-100/80 text-slate-800">
      <div className="flex">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col lg:ml-72">
          <Navbar />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
