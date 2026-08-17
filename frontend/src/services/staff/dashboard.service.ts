import api from "../../utils/api";

export interface Goal {

  code: string;

  label: string;

}

export interface StaffOrganization {

  id: number;
  name: string;
  organization_type: string;
  logo_url: string | null;
  workspace_code: string;
  timezone: string;
  currency: string;

}

export interface ClientStatus {

  code: string;

  label: string;

  color: string;

  progress: number;

}

export interface DashboardClient {

  assignment_id: number;

  assigned_at: string;

  organization_id: number;

  organization_name: string;

  member_id: number;

  user_id: number;

  name: string;

  nickname: string;

  mobile: string;

  email: string;

  consent_granted: boolean;

  goal: Goal;

  height_cm: number;

  weight_kg: number;

  target_weight: number;

  target_calories: number;

  target_protein: number;

  target_carbs: number;

  target_fats: number;

  consumed_calories: number;

  consumed_protein: number;

  consumed_carbs: number;

  consumed_fats: number;

  consumed_fiber: number;

  status: ClientStatus;

}

export interface DashboardSummary {

  total_clients: number;

  pending_consents: number;

  active_goals: number;

  clients_logged_today: number;

  clients_pending: number;

}

export interface CoachDashboard {

  coach: {

    id: number;

    name: string;

    nickname: string;

    email: string;

    mobile: string;

  };

  organization: StaffOrganization;

  summary: DashboardSummary;

  clients: DashboardClient[];

}

export const getDashboard =
async () => {

  const response =
    await api.get(
      "/coach/dashboard"
    );

  return response.data.data as CoachDashboard;

};