import api from "../../utils/api";

export interface WorkspaceSettings {

  id: number;

  name: string;

  organization_type: string;

  logo_url: string | null;

  email: string | null;

  mobile: string | null;

  website: string | null;

  address: string | null;

  city: string | null;

  state: string | null;

  country: string | null;

  timezone: string;

  currency: string;

  subscription_plan: string;

  workspace_code: string;

  created_at: string;

  updated_at?: string;

}


export interface UpdateWorkspaceSettingsRequest {

  name: string;

  organization_type: string;

  email?: string;

  mobile?: string;

  website?: string;

  address?: string;

  city?: string;

  state?: string;

  country?: string;

  timezone?: string;

  currency?: string;

  logo_url?: string;

}


export const getWorkspaceSettings =
async (): Promise<WorkspaceSettings> => {

  const response =
    await api.get(
      "/organizations/settings"
    );

  return response.data.data;

};


export const updateWorkspaceSettings =
async (
  payload: UpdateWorkspaceSettingsRequest
): Promise<WorkspaceSettings> => {

  const response =
    await api.put(
      "/organizations/settings",
      payload
    );

  return response.data.data;

};


export const deleteWorkspace =
async () => {

  const response =
    await api.delete(
      "/organizations/settings"
    );

  return response.data.data;

};