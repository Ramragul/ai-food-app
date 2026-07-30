export interface OrganizationConsent {

    organization_id: number;

    organization_name: string;

    organization_type: string;

    granted: boolean;

    granted_at: string | null;

    created_at: string;

}

export interface ConsentResponse {

    success: boolean;

    data: OrganizationConsent[];

}