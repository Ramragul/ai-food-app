import api from "../../utils/api";

export interface AssignedClient {

  member_id: number;

  user_id: number;

  name: string;

  nickname?: string;

  consent_granted: boolean;

  assigned_at: string;

}

export interface CoachAssignment {

  coach: {

    member_id: number;

    user_id: number;

    name: string;

    nickname?: string;

    role: string;

  };

  total_clients: number;

  clients: AssignedClient[];

}


export interface AssignmentResponse {

  id: number;

  organization_id: number;

  trainer_member_id: number;

  client_member_id: number;

  assigned_by: number;

  assigned_at: string;

  is_active: boolean;

  assigned_role: string;

  ended_at: string | null;

}

export interface AssignClientRequest {

  organization_id: number;

  trainer_member_id: number;

  client_member_id: number;

}

export const assignClient = async (



  payload: AssignClientRequest

): Promise<AssignmentResponse> => {

    console.log("Assign Client API called with payload : " + JSON.stringify(payload));

  const response = await api.post(

    "/organizations/assign-client",

    payload

  );

  console.log("Response Data from Servier is : " +JSON.stringify(response.data.data));

  return response.data.data;

};

export const getAssignments = async () => {

  const response =
    await api.get(
      "/organizations/assignments"
    );

  return response.data.data as CoachAssignment[];

};