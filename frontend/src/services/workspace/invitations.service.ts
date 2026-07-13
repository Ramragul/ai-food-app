import api from "../../utils/api";

export interface Invitation {

  id: number;

  invitation_type: string;

  invited_name: string;

  invited_mobile: string;

  invited_email: string;

  status: string;

  role: string;

  created_at: string;

  expires_at: string;

  accepted_at?: string | null;

}

export const getInvitations = async () => {

  const response =
    await api.get(
      "/organizations/invitations"
    );

  return response.data.data as Invitation[];

};