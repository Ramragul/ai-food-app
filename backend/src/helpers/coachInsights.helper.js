export const generateCoachInsights = (
    summary,
    targets,
    days = []
) => {

    const insights = [];

    const data = summary.average || summary;

    /* ---------------------------------------------
       NO LOGGING
    ---------------------------------------------- */

    const loggedDays =
        days.filter(day => day.calories > 0).length;

    if (days.length && loggedDays === 0) {

        insights.push({

            severity: "critical",

            title: "No Meal Logging",

            description:
                "No meals were logged during this period."

        });

    }

    /* ---------------------------------------------
       LOW CONSISTENCY
    ---------------------------------------------- */

    else if (days.length && loggedDays <= Math.floor(days.length / 2)) {

        insights.push({

            severity: "warning",

            title: "Low Logging Consistency",

            description:
                `Meals were logged on ${loggedDays} of ${days.length} days.`

        });

    }

    /* ---------------------------------------------
       LOW PROTEIN
    ---------------------------------------------- */

    if (
        targets.protein > 0 &&
        data.protein < targets.protein * 0.70
    ) {

        insights.push({

            severity: "warning",

            title: "Protein Intake Needs Attention",

            description:
                "Average protein intake is well below the target."

        });

    }

    /* ---------------------------------------------
       HIGH CALORIES
    ---------------------------------------------- */

    if (
        targets.calories > 0 &&
        data.calories > targets.calories * 1.10
    ) {

        insights.push({

            severity: "warning",

            title: "Calorie Intake Above Target",

            description:
                "Average calorie intake is consistently above the goal."

        });

    }

    /* ---------------------------------------------
       POSITIVE FEEDBACK
    ---------------------------------------------- */

    if (

        data.calories >= targets.calories * 0.90 &&

        data.calories <= targets.calories * 1.10 &&

        targets.protein > 0 &&

        data.protein >= targets.protein * 0.90

    ) {

        insights.push({

            severity: "success",

            title: "Nutrition Progress Is On Track",

            description:
                "Calories and protein intake are aligned with the assigned goal."

        });

    }

    return insights;

};