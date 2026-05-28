import {
  BarChart3,
  Bot,
  LayoutDashboard,
  LucideIcon,
  Settings,
  UsersRound
} from "lucide-react";

export type NavSection =
  | "Dashboard"
  | "Leads"
  | "Analytics"
  | "Automation"
  | "Settings";

const navItems: { label: NavSection; icon: LucideIcon }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Leads", icon: UsersRound },
  { label: "Analytics", icon: BarChart3 },
  { label: "Automation", icon: Bot },
  { label: "Settings", icon: Settings }
];

interface SidebarProps {
  activeSection: NavSection;
  onSectionChange: (section: NavSection) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200/80 bg-slate-950 p-6 lg:block">
      <div className="mb-10">
        <h1 className="text-xl font-bold tracking-tight text-white">
          SmartLead CRM
        </h1>
        <p className="mt-1 text-sm text-slate-300">Operations Workspace</p>
      </div>

      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.label;
          return (
          <button
            key={item.label}
            onClick={() => onSectionChange(item.label)}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/30"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
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
