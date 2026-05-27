import axios from "axios";
import { Lead, LeadPayload } from "../types";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const leadApi = {
  getLeads: async (): Promise<Lead[]> => {
    const response = await api.get<Lead[]>("/leads");
    return response.data;
  },
  createLead: async (payload: LeadPayload): Promise<Lead> => {
    const response = await api.post<{ lead: Lead }>("/leads/create", payload);
    return response.data.lead;
  },
  updateLead: async (
    leadId: string,
    payload: Partial<LeadPayload>
  ): Promise<Lead> => {
    const response = await api.put<{ lead: Lead }>(`/leads/${leadId}`, payload);
    return response.data.lead;
  },
  deleteLead: async (leadId: string): Promise<void> => {
    await api.delete(`/leads/${leadId}`);
  }
};
