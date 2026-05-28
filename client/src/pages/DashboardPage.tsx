import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Cog,
  Layers3,
  Link2,
  PlusCircle,
  Rocket,
  SlidersHorizontal,
  UserCog,
  Users
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Lead, LeadPayload, LeadStatus } from "../types";
import { NavSection } from "../components/Sidebar";

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState<NavSection>("Dashboard");
  const [leads, setLeads] = useState<Lead[]>([
    {
      _id: "1",
      name: "Riya Verma",
      email: "riya@brightlabs.io",
      company: "Bright Labs",
      status: "New",
      assignedTo: "Aman",
      createdAt: new Date().toISOString()
    },
    {
      _id: "2",
      name: "Arjun Mehta",
      email: "arjun@growthforge.ai",
      company: "GrowthForge",
      status: "In Progress",
      assignedTo: "Sneha",
      createdAt: new Date().toISOString()
    },
    {
      _id: "3",
      name: "Meera Nair",
      email: "meera@cloudnexus.in",
      company: "CloudNexus",
      status: "Closed",
      assignedTo: "Rahul",
      createdAt: new Date().toISOString()
    }
  ]);
  const [formData, setFormData] = useState<LeadPayload>({
    name: "",
    email: "",
    company: "",
    status: "New",
    assignedTo: "Sales Team"
  });
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const converted = leads.filter((lead) => lead.status === "Closed").length;
    const pending = leads.filter((lead) => lead.status !== "Closed").length;
    const revenuePotential = totalLeads * 1200;
    return { totalLeads, converted, pending, revenuePotential };
  }, [leads]);

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(true);
      const refreshTimer = window.setTimeout(() => setRefreshing(false), 600);
      return () => window.clearTimeout(refreshTimer);
    }
  }, [stats, isLoading]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newLead: Lead = {
      _id: `${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString()
    };
    setLeads((prev) => [newLead, ...prev]);
    setFormData({
      name: "",
      email: "",
      company: "",
      status: "New",
      assignedTo: "Sales Team"
    });
    setToast("Lead added successfully!");
    setTimeout(() => setToast(""), 2400);
  };

  const getStatusStyles = (status: LeadStatus) => {
    if (status === "Closed") return "bg-emerald-100 text-emerald-700";
    if (status === "In Progress") return "bg-amber-100 text-amber-700";
    if (status === "Contacted") return "bg-blue-50 text-blue-700";
    return "bg-cyan-100 text-cyan-700";
  };

  const cards = [
    {
      label: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      accent: "bg-blue-700",
      fill: Math.min(84, 40 + stats.totalLeads * 14),
      wave: "wave-blue"
    },
    {
      label: "Converted",
      value: stats.converted,
      icon: BadgeCheck,
      accent: "bg-emerald-600",
      fill: Math.min(76, 34 + stats.converted * 18),
      wave: "wave-emerald"
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock3,
      accent: "bg-amber-600",
      fill: Math.min(80, 36 + stats.pending * 16),
      wave: "wave-amber"
    },
    {
      label: "Revenue Potential",
      value: `$${stats.revenuePotential.toLocaleString()}`,
      icon: CircleDollarSign,
      accent: "bg-cyan-600",
      fill: Math.min(88, 40 + stats.revenuePotential / 100),
      wave: "wave-cyan"
    }
  ];

  const pageMeta: Record<NavSection, { title: string; subtitle: string }> = {
    Dashboard: {
      title: "Executive Dashboard",
      subtitle: "Monitor team pipeline and lead activity"
    },
    Leads: {
      title: "Leads Workspace",
      subtitle: "Review, qualify, and manage your lead records"
    },
    Analytics: {
      title: "Analytics",
      subtitle: "Track conversion trends and performance indicators"
    },
    Automation: {
      title: "Automation",
      subtitle: "Manage workflows and webhook execution status"
    },
    Settings: {
      title: "Workspace Settings",
      subtitle: "Configure account preferences and CRM defaults"
    }
  };

  const renderDashboardSection = () => (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Smart Lead Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Lead operations workspace with focused, presentation-ready UI
            </p>
          </div>
          <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Demo mode active
          </div>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse rounded-2xl border border-slate-200 bg-slate-100 p-5 shadow-sm"
              >
                <div className="h-10 w-10 rounded-lg bg-slate-200" />
                <div className="mt-4 h-4 w-28 rounded-full bg-slate-200" />
                <div className="mt-3 h-10 w-24 rounded bg-slate-200" />
              </div>
            ))
          : cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden">
                    <div
                      className={`absolute inset-x-0 bottom-0 water-wave ${card.wave}`}
                      style={{ height: `${card.fill}%` }}
                    />
                  </div>
                  <div className="relative z-10">
                    <div className={`inline-flex rounded-lg ${card.accent} p-2 text-white`}>
                      <Icon size={18} />
                    </div>
                    <p className="mt-4 text-sm text-slate-500">{card.label}</p>
                    <h3
                      className={`mt-1 text-[26px] font-semibold tracking-tight text-slate-900 ${
                        refreshing ? "animate-card-refresh" : ""
                      }`}
                    >
                      {card.value}
                    </h3>
                  </div>
                </div>
              );
            })}
      </section>
    </>
  );

  const renderLeadsSection = () => (
    <div className="grid gap-6 xl:grid-cols-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
        <div className="mb-5 flex items-center gap-2">
          <PlusCircle size={20} className="text-blue-700" />
          <h2 className="text-lg font-semibold text-slate-900">Add Lead</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            value={formData.name}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, name: event.target.value }))
            }
            placeholder="Lead name"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <input
            required
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Email address"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <input
            required
            value={formData.company}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, company: event.target.value }))
            }
            placeholder="Company"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <select
            value={formData.status}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                status: event.target.value as LeadStatus
              }))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Submit Lead
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {leads.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Company</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b border-slate-100">
                    <td className="px-3 py-3">
                      <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="px-3 py-3">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="px-3 py-3">
                      <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="px-3 py-3">
                      <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
                    </td>
                    <td className="px-3 py-3">
                      <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                    </td>
                  </tr>
                ))}

              {!isLoading &&
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                className="border-b border-slate-100 transition hover:bg-blue-50/40"
                  >
                    <td className="px-3 py-3 font-medium text-slate-800">{lead.name}</td>
                    <td className="px-3 py-3 text-slate-600">{lead.email}</td>
                    <td className="px-3 py-3 text-slate-600">{lead.company}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(lead.status)}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!isLoading && leads.length === 0 && (
            <div className="mx-3 my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">
              <AlertCircle size={20} className="text-slate-500" />
              <p className="mt-2 text-sm font-medium text-slate-700">No leads yet</p>
              <p className="mt-1 text-xs text-slate-500">
                Add your first lead using the form to populate this table.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderAnalyticsSection = () => (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <h3 className="text-base font-semibold text-slate-900">Pipeline Performance</h3>
        <div className="mt-6 grid grid-cols-4 gap-3">
          {["New", "Contacted", "In Progress", "Closed"].map((label) => {
            const count = leads.filter((lead) => lead.status === label).length;
            const height = Math.max(20, count * 18 + 18);
            return (
              <div key={label} className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <div className="mt-4 flex h-32 items-end">
                  <div
                    className="w-full rounded-md bg-blue-700"
                    style={{ height: `${height}px` }}
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900">{count}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Lead Response Time</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">2.4 hrs</h3>
          <p className="mt-2 text-xs text-slate-600">Stable over last 7 days</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Win Rate</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.totalLeads === 0
              ? "0%"
              : `${Math.round((stats.converted / stats.totalLeads) * 100)}%`}
          </h3>
          <p className="mt-2 text-xs text-slate-600">Based on current opportunities</p>
        </div>
      </div>
    </section>
  );

  const renderAutomationSection = () => (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <h3 className="text-base font-semibold text-slate-900">Workflow Center</h3>
        <div className="mt-4 space-y-3">
          {[
            {
              title: "New lead acknowledgement",
              status: "Active",
              detail: "Sends welcome email when a lead is added"
            },
            {
              title: "Sales owner assignment",
              status: "Active",
              detail: "Assigns lead based on company segment"
            },
            {
              title: "Follow-up reminder",
              status: "Paused",
              detail: "Creates reminder if status stays New for 48 hours"
            }
          ].map((flow) => (
            <div
              key={flow.title}
              className="flex items-start justify-between rounded-lg border border-slate-200 p-4"
            >
              <div>
                <p className="font-medium text-slate-900">{flow.title}</p>
                <p className="mt-1 text-sm text-slate-500">{flow.detail}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  flow.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {flow.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Link2 size={16} className="text-cyan-700" />
            <p className="text-sm font-medium text-slate-800">Webhook Status</p>
          </div>
          <p className="mt-3 text-sm text-slate-600">Connected and listening</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Rocket size={16} className="text-blue-700" />
            <p className="text-sm font-medium text-slate-800">Automation Health</p>
          </div>
          <p className="mt-3 text-sm text-slate-600">2 active, 1 paused</p>
        </div>
      </div>
    </section>
  );

  const renderSettingsSection = () => (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <UserCog size={18} className="text-slate-700" />
          <h3 className="text-base font-semibold text-slate-900">User Preferences</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <span className="text-slate-600">Compact table density</span>
            <CheckCircle2 size={18} className="text-emerald-600" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <span className="text-slate-600">Daily summary email</span>
            <CheckCircle2 size={18} className="text-emerald-600" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <span className="text-slate-600">Lead scoring visibility</span>
            <CheckCircle2 size={18} className="text-emerald-600" />
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Cog size={18} className="text-slate-700" />
          <h3 className="text-base font-semibold text-slate-900">System Controls</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <span className="text-slate-600">Pipeline stages</span>
            <Layers3 size={18} className="text-blue-700" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <span className="text-slate-600">Automation rules</span>
            <Rocket size={18} className="text-cyan-700" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <span className="text-slate-600">General preferences</span>
            <SlidersHorizontal size={18} className="text-blue-700" />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      title={pageMeta[activeSection].title}
      subtitle={pageMeta[activeSection].subtitle}
    >
      <div className="space-y-8">
        {activeSection === "Dashboard" && renderDashboardSection()}
        {activeSection === "Leads" && renderLeadsSection()}
        {activeSection === "Analytics" && renderAnalyticsSection()}
        {activeSection === "Automation" && renderAutomationSection()}
        {activeSection === "Settings" && renderSettingsSection()}

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-blue-700 px-4 py-3 text-sm font-medium text-white shadow-2xl">
            {toast}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
