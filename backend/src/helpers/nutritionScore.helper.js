// Version 1

// export const generateNutritionScore = (
//     period,
//     summary,
//     targets,
//     days = []
// ) => {

//     const data =
//         summary.average || summary;

//     const breakdown = {

//         calories: 0,

//         protein: 0,

//         fiber: 0,

//         consistency: 0,

//         balance: 0

//     };

//     /* ---------------------------------------------
//        CALORIES (30)
//     ---------------------------------------------- */

//     const calorieRatio =
//         targets.calories > 0
//             ? data.calories / targets.calories
//             : 0;

//     if (calorieRatio >= 0.90 && calorieRatio <= 1.10) {

//         breakdown.calories = 30;

//     }

//     else if (calorieRatio >= 0.80) {

//         breakdown.calories = 20;

//     }

//     else if (calorieRatio >= 0.60) {

//         breakdown.calories = 10;

//     }

//     /* ---------------------------------------------
//        PROTEIN (30)
//     ---------------------------------------------- */

//     const proteinRatio =
//         targets.protein > 0
//             ? data.protein / targets.protein
//             : 0;

//     if (proteinRatio >= 1.0) {

//         breakdown.protein = 30;

//     }

//     else if (proteinRatio >= 0.80) {

//         breakdown.protein = 20;

//     }

//     else if (proteinRatio >= 0.60) {

//         breakdown.protein = 10;

//     }

//     /* ---------------------------------------------
//        FIBER (10)
//     ---------------------------------------------- */

//     if (data.fiber >= 25) {

//         breakdown.fiber = 10;

//     }

//     else if (data.fiber >= 20) {

//         breakdown.fiber = 8;

//     }

//     else if (data.fiber >= 15) {

//         breakdown.fiber = 5;

//     }

//     /* ---------------------------------------------
//        LOGGING CONSISTENCY (20)
//     ---------------------------------------------- */

//     if (!days.length) {

//         // Today

//         breakdown.consistency =

//             data.calories > 0

//                 ? 20

//                 : 0;

//     }

//     else {

//         const loggedDays =
//             days.filter(
//                 day => day.calories > 0
//             ).length;

//         const ratio =
//             loggedDays / days.length;

//         if (ratio >= 0.90) {

//             breakdown.consistency = 20;

//         }

//         else if (ratio >= 0.75) {

//             breakdown.consistency = 15;

//         }

//         else if (ratio >= 0.50) {

//             breakdown.consistency = 10;

//         }

//         else {

//             breakdown.consistency = 5;

//         }

//     }

//     /* ---------------------------------------------
//        MACRO BALANCE (10)
//     ---------------------------------------------- */

//     const carbsOk =
//         data.carbs <= targets.carbs * 1.10;

//     const fatsOk =
//         data.fats <= targets.fats * 1.10;

//     if (carbsOk && fatsOk) {

//         breakdown.balance = 10;

//     }

//     else if (carbsOk || fatsOk) {

//         breakdown.balance = 5;

//     }

//     /* ---------------------------------------------
//        FINAL SCORE
//     ---------------------------------------------- */

//     const score =

//         breakdown.calories +

//         breakdown.protein +

//         breakdown.fiber +

//         breakdown.consistency +

//         breakdown.balance;

//     let grade = "F";

//     let status = "Poor";

//     if (score >= 90) {

//         grade = "A+";

//         status = "Excellent";

//     }

//     else if (score >= 80) {

//         grade = "A";

//         status = "Very Good";

//     }

//     else if (score >= 70) {

//         grade = "B";

//         status = "Good";

//     }

//     else if (score >= 60) {

//         grade = "C";

//         status = "Average";

//     }

//     else if (score >= 50) {

//         grade = "D";

//         status = "Needs Improvement";

//     }

//     return {

//         score,

//         grade,

//         status,

//         breakdown

//     };

// };



// Version 2

export const generateNutritionScore = (
    period,
    summary,
    targets,
    days = []
) => {

    const data =
        summary.average || summary;

    const breakdown = {

        calories: 0,

        protein: 0,

        fiber: 0,

        consistency: 0,

        balance: 0

    };

    /* ---------------------------------------------
       CALORIES (30)
    ---------------------------------------------- */

    const calorieRatio =
        targets.calories > 0
            ? data.calories / targets.calories
            : 0;

    if (calorieRatio >= 0.90 && calorieRatio <= 1.10) {

        breakdown.calories = 30;

    }

    else if (calorieRatio >= 0.80) {

        breakdown.calories = 20;

    }

    else if (calorieRatio >= 0.60) {

        breakdown.calories = 10;

    }

    /* ---------------------------------------------
       PROTEIN (30)
    ---------------------------------------------- */

    const proteinRatio =
        targets.protein > 0
            ? data.protein / targets.protein
            : 0;

    if (proteinRatio >= 1.00) {

        breakdown.protein = 30;

    }

    else if (proteinRatio >= 0.80) {

        breakdown.protein = 20;

    }

    else if (proteinRatio >= 0.60) {

        breakdown.protein = 10;

    }

    /* ---------------------------------------------
       FIBER (10)
    ---------------------------------------------- */

    if (data.fiber >= 25) {

        breakdown.fiber = 10;

    }

    else if (data.fiber >= 20) {

        breakdown.fiber = 8;

    }

    else if (data.fiber >= 15) {

        breakdown.fiber = 5;

    }

    /* ---------------------------------------------
       LOGGING CONSISTENCY (20)
    ---------------------------------------------- */

    if (!days.length) {

        // Today

        breakdown.consistency =

            data.calories > 0

                ? 20

                : 0;

    }

    else {

        const loggedDays =
            days.filter(
                day => day.calories > 0
            ).length;

        const ratio =
            loggedDays / days.length;

        if (ratio >= 0.90) {

            breakdown.consistency = 20;

        }

        else if (ratio >= 0.75) {

            breakdown.consistency = 15;

        }

        else if (ratio >= 0.50) {

            breakdown.consistency = 10;

        }

        else {

            breakdown.consistency = 5;

        }

    }

    /* ---------------------------------------------
       MACRO BALANCE (10)
    ---------------------------------------------- */

    const carbsOk =
        targets.carbs > 0 &&
        data.carbs <= targets.carbs * 1.10;

    const fatsOk =
        targets.fats > 0 &&
        data.fats <= targets.fats * 1.10;

    /*
        Only evaluate balance if the user has consumed
        at least 60% of their calorie target.

        This avoids giving a perfect balance score to
        someone who barely ate anything.
    */

    if (calorieRatio >= 0.60) {

        if (carbsOk && fatsOk) {

            breakdown.balance = 10;

        }

        else if (carbsOk || fatsOk) {

            breakdown.balance = 5;

        }

    }

    /* ---------------------------------------------
       FINAL SCORE
    ---------------------------------------------- */

    const score =

        breakdown.calories +

        breakdown.protein +

        breakdown.fiber +

        breakdown.consistency +

        breakdown.balance;

    let grade = "E";

    let status = "Poor";

    if (score >= 90) {

        grade = "A+";

        status = "Excellent";

    }

    else if (score >= 80) {

        grade = "A";

        status = "Very Good";

    }

    else if (score >= 70) {

        grade = "B";

        status = "Good";

    }

    else if (score >= 60) {

        grade = "C";

        status = "Fair";

    }

    else if (score >= 40) {

        grade = "D";

        status = "Needs Improvement";

    }

    return {

        score,

        grade,

        status,

        breakdown

    };

};