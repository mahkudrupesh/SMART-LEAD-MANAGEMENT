import { Lead, LeadStatus } from "../types";
import LeadCard from "./LeadCard";

interface KanbanBoardProps {
  leads: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

const columns: LeadStatus[] = ["New", "Contacted", "In Progress", "Closed"];

const KanbanBoard = ({ leads, onStatusChange, onDelete }: KanbanBoardProps) => {
  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {columns.map((column) => {
        const filteredLeads = leads.filter((lead) => lead.status === column);
        return (
          <div
            key={column}
            className="rounded-2xl border border-slate-200 bg-slate-100/70 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">{column}</h3>
              <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-600">
                {filteredLeads.length}
              </span>
            </div>

            <div className="space-y-3">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead._id}
                    lead={lead}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500">
                  No leads
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default KanbanBoard;
