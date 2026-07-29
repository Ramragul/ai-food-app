// import api from "../../utils/api";
// import type { WorkspaceInvitationResponse } from "../../types/invitation.types";

// export const getMyInvitations = async () => {

//     const response = await api.get(
//         "/organizations/invitations/me"
//     );

//     return response.data.data;

// };

// export const acceptInvitation = async (
//     invitationId: number
// ) => {

//     const response = await api.post(
//         `/organizations/invitations/${invitationId}/accept`
//     );

//     return response.data;

// };

// export const declineInvitation = async (
//     invitationId: number
// ) => {

//     const response = await api.post(
//         `/organizations/invitations/${invitationId}/decline`
//     );

//     return response.data;

// };



// Version 2

import api from "../../utils/api";
import type { InvitationResponse } from "../../types/invitation.types";

export const getMyInvitations = async () => {

    const response = await api.get<InvitationResponse>(
        "/organizations/invitations/me"
    );

    return response.data.data;
};

export const acceptInvitation = async (
    invitationId: number
) => {

    const response = await api.post(
        `/organizations/invitations/${invitationId}/accept`
    );

    return response.data;
};

export const declineInvitation = async (
    invitationId: number
) => {

    const response = await api.post(
        `/organizations/invitations/${invitationId}/decline`
    );

    return response.data;
};