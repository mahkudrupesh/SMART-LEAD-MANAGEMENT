import { Lead, LeadStatus } from "../types";

interface LeadCardProps {
  lead: Lead;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

const statusOptions: LeadStatus[] = ["New", "Contacted", "In Progress", "Closed"];

const LeadCard = ({ lead, onStatusChange, onDelete }: LeadCardProps) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-slate-900">{lead.name}</h4>
          <p className="text-sm text-slate-500">{lead.company}</p>
        </div>
        <button
          onClick={() => onDelete(lead._id)}
          className="rounded-lg px-2 py-1 text-xs font-medium text-rose-500 hover:bg-rose-50"
        >
          Delete
        </button>
      </div>

      <p className="text-sm text-slate-600">{lead.email}</p>
      <p className="mt-1 text-xs text-slate-500">Assigned: {lead.assignedTo}</p>

      <div className="mt-3">
        <label className="mb-1 block text-xs font-medium text-slate-500">
          Move to
        </label>
        <select
          value={lead.status}
          onChange={(event) =>
            onStatusChange(lead._id, event.target.value as LeadStatus)
          }
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
};

export default LeadCard;
