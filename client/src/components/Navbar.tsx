import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-white/20 bg-white/75 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Smart Dashboard</h2>
          <p className="text-sm text-slate-500">
            Track performance and manage incoming leads
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm md:flex">
            <Search size={16} />
            Search leads...
          </div>
          <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
            <Bell size={18} />
          </button>
          <div className="rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30">
            Intern Demo
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
