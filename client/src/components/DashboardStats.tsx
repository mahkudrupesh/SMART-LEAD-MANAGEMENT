import { Lead } from "../types";

interface DashboardStatsProps {
  leads: Lead[];
}

const statuses = ["New", "Contacted", "In Progress", "Closed"] as const;

const DashboardStats = ({ leads }: DashboardStatsProps) => {
  const totalLeads = leads.length;
  const closedLeads = leads.filter((lead) => lead.status === "Closed").length;
  const conversionRate = totalLeads
    ? Math.round((closedLeads / totalLeads) * 100)
    : 0;

  const statusCounts = statuses.map((status) => ({
    label: status,
    value: leads.filter((lead) => lead.status === status).length
  }));

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <p className="text-sm text-slate-500">Total Leads</p>
        <h3 className="mt-2 text-3xl font-bold text-slate-900">{totalLeads}</h3>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <p className="text-sm text-slate-500">Closed Leads</p>
        <h3 className="mt-2 text-3xl font-bold text-slate-900">{closedLeads}</h3>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <p className="text-sm text-slate-500">Conversion Rate</p>
        <h3 className="mt-2 text-3xl font-bold text-slate-900">
          {conversionRate}%
        </h3>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <p className="text-sm text-slate-500">Pipeline Split</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {statusCounts.map((item) => (
            <span
              key={item.label}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardStats;
