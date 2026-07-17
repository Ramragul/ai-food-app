import api from "../api";

export interface ClientStatus {

  code: string;

  label: string;

  color: string;

  progress: number;

}

export interface DashboardClient {

  assignment_id: number;

  member_id: number;

  user_id: number;

  name: string;

  nickname: string;

  mobile: string;

  email: string;

  consent_granted: boolean;

  goal_type: string | null;

  target_calories: number;

  consumed_calories: number;

  target_protein: number;

  consumed_protein: number;

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