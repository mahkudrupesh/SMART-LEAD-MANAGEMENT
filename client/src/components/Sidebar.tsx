import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Settings,
  UsersRound
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Leads", icon: UsersRound, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Automation", icon: Bot, active: false },
  { label: "Settings", icon: Settings, active: false }
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/20 bg-white/70 p-6 backdrop-blur-xl lg:block">
      <div className="mb-10">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          SmartLead CRM
        </h1>
        <p className="mt-1 text-sm text-slate-500">SaaS Growth Workspace</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
              item.active
                ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30"
                : "text-slate-600 hover:bg-white hover:shadow-md"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
