import pool from "../db/connection.js";

export const searchFoodExact =
async (query)=>{

const result =
await pool.query(

`
SELECT DISTINCT ON(name)
*

FROM
(

SELECT

fr.id,

fr.food_name AS name

FROM food_reference fr

WHERE
LOWER(fr.food_name)=
LOWER($1)

UNION ALL

SELECT

fr.id,

fr.food_name AS name

FROM food_reference fr

INNER JOIN
food_reference_aliases fa

ON
fa.food_reference_id=
fr.id

WHERE
LOWER(fa.alias)=
LOWER($1)

) foods

LIMIT 1

`,
[query]

);

return result.rows[0]||null;

};