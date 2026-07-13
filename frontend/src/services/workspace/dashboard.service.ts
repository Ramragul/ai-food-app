import api from "../../utils/api";

export interface OrganizationDashboard {

  organization: {
    id: number;
    name: string;
    organization_type: string;
    workspace_code: string;
  };

  summary: {
    employees: number;
    clients: number;
    pending_employee_invitations: number;
    pending_client_invitations: number;
    active_assignments: number;
    unassigned_clients: number;
  };

  quick_actions: {
    action: string;
    title: string;
    description: string;
  }[];

  recent_activity: {
    action: string;
    description: string;
    severity: string;
    created_at: string;
  }[];

}

export const getWorkspaceDashboard =
async () => {

  const response =
    await api.get(
      "/organizations/dashboard"
    );

  return response.data.data as OrganizationDashboard;

};