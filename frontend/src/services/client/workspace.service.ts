import api from "../../utils/api";

import type {
    WorkspaceMembersResponse
} from "../../types/client.types";

export const getWorkspaceMembers =
async (): Promise<WorkspaceMembersResponse> => {

    const response =
        await api.get(
            "/organizations/workspace/members"
        );

    return response.data.data;

};



export const leaveWorkspace =
async () => {

    const response =
        await api.post(
            "/organizations/workspace/leave"
        );

    return response.data;

};