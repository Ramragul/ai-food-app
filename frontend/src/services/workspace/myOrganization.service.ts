import api from "../../utils/api";

export const getMyOwnedOrganizations =
async () => {

    const response =
        await api.get(
            "/organizations/my-owned"
        );

    return response.data.data;

};