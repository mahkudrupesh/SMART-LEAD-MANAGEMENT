import { Bell, Search } from "lucide-react";

interface NavbarProps {
  title: string;
  subtitle: string;
}

const Navbar = ({ title, subtitle }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/85 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 shadow-sm md:flex">
            <Search size={16} />
            Search leads...
          </div>
          <button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700">
            <Bell size={18} />
          </button>
          <div className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800">
            Intern Demo
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
