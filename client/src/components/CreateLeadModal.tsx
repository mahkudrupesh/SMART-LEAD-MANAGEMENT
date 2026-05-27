import { FormEvent, useState } from "react";
import { LeadPayload, LeadStatus } from "../types";

interface CreateLeadModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: LeadPayload) => Promise<void>;
}

const CreateLeadModal = ({
  isOpen,
  isSubmitting,
  onClose,
  onSubmit
}: CreateLeadModalProps) => {
  const [formData, setFormData] = useState<LeadPayload>({
    name: "",
    email: "",
    company: "",
    status: "New",
    assignedTo: ""
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit({
      ...formData,
      assignedTo: formData.assignedTo || "Unassigned"
    });
    setFormData({
      name: "",
      email: "",
      company: "",
      status: "New",
      assignedTo: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Create Lead</h3>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            required
            placeholder="Lead Name"
            value={formData.name}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, name: event.target.value }))
            }
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, email: event.target.value }))
            }
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
          />
          <input
            required
            placeholder="Company"
            value={formData.company}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, company: event.target.value }))
            }
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
          />
          <input
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, assignedTo: event.target.value }))
            }
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
          />
          <select
            value={formData.status}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                status: event.target.value as LeadStatus
              }))
            }
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating..." : "Create Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadModal;
