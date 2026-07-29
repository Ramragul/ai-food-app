export interface WorkspaceInvitation {
    id: number;
    invitation_token: string;
    invitation_type: "CLIENT" | "EMPLOYEE";

    invited_name: string;
    invited_mobile: string;
    invited_email: string;

    status: "PENDING" | "ACCEPTED" | "DECLINED" | "EXPIRED";

    expires_at: string;
    created_at: string;

    organization_id: number;
    organization_name: string;
    organization_type: string;
    logo_url: string | null;

    role: string;
}

export interface InvitationResponse {
    success: boolean;
    data: WorkspaceInvitation[];
}