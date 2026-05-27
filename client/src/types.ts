export type LeadStatus = "New" | "Contacted" | "In Progress" | "Closed";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
  assignedTo: string;
  createdAt: string;
}

export interface LeadPayload {
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
  assignedTo: string;
}
