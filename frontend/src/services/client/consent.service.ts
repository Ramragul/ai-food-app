import api from "../../utils/api";

import type {
    ConsentResponse
} from "../../types/consent.types";

export const getConsents = async () => {

    const response =
        await api.get<ConsentResponse>(
            "/consent"
        );

    return response.data.data;

};

export const grantConsent = async (
    organizationId: number
) => {

    const response =
        await api.post(
            "/consent/grant",
            {
                organization_id:
                    organizationId
            }
        );

    return response.data;

};

export const revokeConsent = async (
    organizationId: number
) => {

    const response =
        await api.post(
            "/consent/revoke",
            {
                organization_id:
                    organizationId
            }
        );

    return response.data;

};