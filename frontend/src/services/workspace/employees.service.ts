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

export interface ChangeEmployeeRoleRequest {

  role: string;

}


export interface ChangeEmployeeRoleResponse {

  member_id: number;

  role: string;

}


export interface RemoveEmployeeResponse {

  member_id: number;

  status: string;

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





/* ---------------------------------------------
   CHANGE EMPLOYEE ROLE
---------------------------------------------- */

export const changeEmployeeRole = async (
  memberId: number,
  role: string
) => {

  const response =
    await api.patch(
      `/organizations/members/${memberId}/role`,
      {
        role
      }
    );

  return response.data.data as
    ChangeEmployeeRoleResponse;

};


/* ---------------------------------------------
   REMOVE EMPLOYEE
---------------------------------------------- */

export const removeEmployee = async (
  memberId: number
) => {

  const response =
    await api.patch(
      `/organizations/members/${memberId}/remove`
    );

  return response.data.data as
    RemoveEmployeeResponse;

};