import pool from "../../db/connection.js";

import {
  createProfileService,
  getActiveProfileService
} from "../profile/profile.service.js";

export const getMyCoachNotesService = async (userId) => {

    const client = await pool.connect();

    try {

        const { rows } = await client.query(
            `
            SELECT
                cn.id,
                cn.category,
                cn.title,
                cn.note,
                cn.created_at,
                cn.updated_at,

                org.id AS organization_id,
                org.name AS organization_name,
                org.organization_type,

                coach_user.id AS coach_user_id,
                coach_user.name AS coach_name

            FROM coach_notes cn

            INNER JOIN organization_members client_member
                ON client_member.id = cn.client_member_id

            INNER JOIN organizations org
                ON org.id = client_member.organization_id

            INNER JOIN organization_members coach_member
                ON coach_member.id = cn.coach_member_id

            INNER JOIN users coach_user
                ON coach_user.id = coach_member.user_id

            WHERE
                client_member.user_id = $1
                AND cn.deleted_at IS NULL

            ORDER BY
                cn.created_at DESC,
                org.name ASC
            `,
            [userId]
        );

        return rows;

    } finally {

        client.release();

    }

};