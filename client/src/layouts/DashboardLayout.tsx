import { ReactNode } from "react";
import Sidebar, { NavSection } from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
  title: string;
  subtitle: string;
}

const DashboardLayout = ({
  children,
  activeSection,
  onSectionChange,
  title,
  subtitle
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 text-slate-800">
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
        <div className="flex min-h-screen flex-1 flex-col lg:ml-72">
          <Navbar title={title} subtitle={subtitle} />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
