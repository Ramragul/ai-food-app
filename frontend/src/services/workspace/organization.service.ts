import api from "../../utils/api";

export interface CreateWorkspaceRequest {

    name: string;

    organization_type: string;

    mobile?: string | null;

    email?: string | null;

    website?: string | null;

}

export interface CreateWorkspaceResponse {

    id: number;

    name: string;

    organization_type: string;

    workspace_code: string;

    created_by: number;

}

export const createOrganization =
async (

    body: CreateWorkspaceRequest

): Promise<CreateWorkspaceResponse> => {

    const response =
        await api.post(

            "/organizations",

            body

        );

    return response.data.data;

};