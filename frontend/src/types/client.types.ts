export interface CoachUpdate {
    id: string;

    category: string;

    title: string;

    note: string;

    created_at: string;

    updated_at: string;

    organization_id: number;

    organization_name: string;

    organization_type: string;

    coach_user_id: number;

    coach_name: string;
}


/* ===========================================
   WORKSPACE MEMBERS
=========================================== */

export interface WorkspaceMember {

    id: number;

    user_id: number;

    name: string;

    nickname?: string;

    email: string;

    gender?: string;

    role: string;

    joined_at: string | null;

    is_current_user: boolean;

}

export interface WorkspaceOrganization {

    id: number;

    name: string;

    organization_type: string;

    workspace_code: string;

}

export interface WorkspaceMembersResponse {

    organization: WorkspaceOrganization;

    viewer_role: string;

    members: WorkspaceMember[];

}