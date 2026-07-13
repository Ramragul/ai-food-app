import api from "../../utils/api";

export interface Employee {

  member_id: number;

  user_id: number;

  name: string;

  nickname?: string;

  email: string;

  mobile: string;

  role: string;

  status: string;

  joined_at: string;

}

export interface InviteEmployeeRequest {

  organization_id: number;

  role: string;

  invited_name: string;

  invited_mobile: string;

  invited_email?: string;

}

export interface InviteEmployeeResponse {

  id: number;

  status: string;

  invitation_type: string;

}

export const getEmployees = async () => {

  const response = await api.get(
    "/organizations/employees"
  );

  return response.data.data as Employee[];

};

export const inviteEmployee = async (

  payload: InviteEmployeeRequest

) => {

  const response =
    await api.post(

      "/organizations/invite-employee",

      payload

    );

  return response.data.data as InviteEmployeeResponse;

};