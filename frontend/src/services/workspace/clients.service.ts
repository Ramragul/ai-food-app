import api from "../../utils/api";

export interface AssignedCoach {

  member_id: number;

  user_id: number;

  name: string;

  role: string;

}

export interface Client {

  member_id: number;

  user_id: number;

  name: string;

  nickname?: string;

  mobile: string;

  email: string;

  status: string;

  joined_at: string;

  consent_granted: boolean;

  assigned_coach?: AssignedCoach | null;

}

export interface InviteClientRequest {

  organization_id: number;

  invited_name: string;

  invited_mobile: string;

  invited_email?: string;

}

export interface InviteClientResponse {

  id: number;

  status: string;

  invitation_type: string;

}


export interface ClientDetails {

  client: {

    id: number;

    name: string;

    nickname?: string;

    mobile: string;

    email: string;

    gender: string;

    age_range: string;

    created_at: string;

  };

  consent: {

    granted: boolean;

    status: string;

    message: string;

  };

  fitness_profile: any;

  today: any;

  coach_notes: any[];

  analytics: Record<string, unknown>;

  permissions: {

    can_view_profile: boolean;

    can_view_nutrition: boolean;

    can_write_notes: boolean;

    can_create_goal: boolean;

  };

}

export const inviteClient = async (

  payload: InviteClientRequest

) => {

  const response =
    await api.post(

      "/organizations/invite-client",

      payload

    );

  return response.data.data as InviteClientResponse;

};

export const getClients = async () => {

  const response = await api.get(
    "/organizations/clients"
  );

  return response.data.data as Client[];

};

export const getClientDetails = async (
  memberId: number
): Promise<ClientDetails> => {

  const response = await api.get(
    `/organizations/client/${memberId}`
  );

  return response.data.data;

};