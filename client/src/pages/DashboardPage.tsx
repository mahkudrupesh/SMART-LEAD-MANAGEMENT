import { FormEvent, useMemo, useState } from "react";
import {
  BadgeCheck,
  CircleDollarSign,
  Clock3,
  PlusCircle,
  Users
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Lead, LeadPayload, LeadStatus } from "../types";

const DashboardPage = () => {
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

  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const converted = leads.filter((lead) => lead.status === "Closed").length;
    const pending = leads.filter((lead) => lead.status !== "Closed").length;
    const revenuePotential = totalLeads * 1200;
    return { totalLeads, converted, pending, revenuePotential };
  }, [leads]);

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
    if (status === "Contacted") return "bg-sky-100 text-sky-700";
    return "bg-violet-100 text-violet-700";
  };

  const cards = [
    {
      label: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      accent: "from-indigo-500 to-violet-500"
    },
    {
      label: "Converted",
      value: stats.converted,
      icon: BadgeCheck,
      accent: "from-emerald-500 to-teal-500"
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock3,
      accent: "from-amber-500 to-orange-500"
    },
    {
      label: "Revenue Potential",
      value: `$${stats.revenuePotential.toLocaleString()}`,
      icon: CircleDollarSign,
      accent: "from-sky-500 to-indigo-500"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Smart Lead Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Beautiful local-state CRM dashboard for product demo and pitch
              </p>
            </div>
            <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Last updated just now
            </div>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="group rounded-2xl border border-white/50 bg-white/75 p-5 shadow-lg shadow-slate-300/25 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-r ${card.accent} p-2 text-white shadow-lg`}
                >
                  <Icon size={18} />
                </div>
                <p className="mt-4 text-sm text-slate-500">{card.label}</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {card.value}
                </h3>
              </div>
            );
          })}
        </section>

        <div className="grid gap-6 xl:grid-cols-5">
          <section className="rounded-2xl border border-white/40 bg-white/75 p-6 shadow-xl shadow-slate-300/20 backdrop-blur-xl xl:col-span-2">
            <div className="mb-5 flex items-center gap-2">
              <PlusCircle size={20} className="text-indigo-600" />
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <input
                required
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="Email address"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <input
                required
                value={formData.company}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, company: event.target.value }))
                }
                placeholder="Company"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <select
                value={formData.status}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: event.target.value as LeadStatus
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700"
              >
                Submit Lead
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-white/40 bg-white/75 p-6 shadow-xl shadow-slate-300/20 backdrop-blur-xl xl:col-span-3">
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
                    <th className="px-3 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/80"
                    >
                      <td className="px-3 py-3 font-medium text-slate-800">
                        {lead.name}
                      </td>
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
            </div>
          </section>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/40 bg-white/65 p-5 shadow-lg shadow-slate-300/20 backdrop-blur-xl">
            <p className="text-sm text-slate-500">Lead Response Time</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">2.4 hrs</h3>
            <p className="mt-2 text-xs text-emerald-600">+18% faster than last week</p>
          </div>
          <div className="rounded-2xl border border-white/40 bg-white/65 p-5 shadow-lg shadow-slate-300/20 backdrop-blur-xl">
            <p className="text-sm text-slate-500">Campaign Health</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Strong</h3>
            <p className="mt-2 text-xs text-indigo-600">Top funnel channels performing well</p>
          </div>
          <div className="rounded-2xl border border-white/40 bg-white/65 p-5 shadow-lg shadow-slate-300/20 backdrop-blur-xl">
            <p className="text-sm text-slate-500">Forecasted Closures</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">14 this month</h3>
            <p className="mt-2 text-xs text-violet-600">Based on current pipeline trend</p>
          </div>
        </section>

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-2xl">
            {toast}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
