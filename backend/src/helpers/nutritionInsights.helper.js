export const generateNutritionInsights = (
    period,
    summary,
    targets,
    days = []
) => {

    const insights = [];

    const data =
        summary.average || summary;

    /* ---------------------------------------------
       CALORIES
    ---------------------------------------------- */

    if (data.calories === 0) {

        insights.push({

            severity: "warning",

            category: "Calories",

            title: "No Meals Logged",

            description:
                "No nutrition has been logged for this " +
                period + "."

        });

    } else if (data.calories < targets.calories * 0.8) {

        insights.push({

            severity: "warning",

            category: "Calories",

            title: "Low Calorie Intake",

            description:
                "Average calorie intake is below 80% of the target."

        });

    } else if (data.calories > targets.calories * 1.1) {

        insights.push({

            severity: "warning",

            category: "Calories",

            title: "High Calorie Intake",

            description:
                "Average calorie intake exceeds the daily target."

        });

    } else {

        insights.push({

            severity: "success",

            category: "Calories",

            title: "Calories On Track",

            description:
                "Calorie intake is within the recommended range."

        });

    }

    /* ---------------------------------------------
       PROTEIN
    ---------------------------------------------- */

    if (data.protein < targets.protein * 0.7) {

        insights.push({

            severity: "warning",

            category: "Protein",

            title: "Low Protein Intake",

            description:
                "Protein intake is consistently below the target."

        });

    } else {

        insights.push({

            severity: "success",

            category: "Protein",

            title: "Protein Goal",

            description:
                "Protein intake is meeting expectations."

        });

    }

    /* ---------------------------------------------
       CARBS
    ---------------------------------------------- */

    if (data.carbs > targets.carbs * 1.2) {

        insights.push({

            severity: "info",

            category: "Carbohydrates",

            title: "High Carb Intake",

            description:
                "Carbohydrate intake is above the planned target."

        });

    }

    /* ---------------------------------------------
       FATS
    ---------------------------------------------- */

    if (data.fats > targets.fats * 1.2) {

        insights.push({

            severity: "info",

            category: "Fats",

            title: "High Fat Intake",

            description:
                "Fat intake is above the planned target."

        });

    }

    /* ---------------------------------------------
       FIBER
    ---------------------------------------------- */

    if (data.fiber < 20) {

        insights.push({

            severity: "info",

            category: "Fiber",

            title: "Increase Fiber",

            description:
                "Consider adding more fruits, vegetables and whole grains."

        });

    }

    /* ---------------------------------------------
       LOGGING CONSISTENCY
    ---------------------------------------------- */

    if (days.length) {

        const loggedDays =
            days.filter(
                day => day.calories > 0
            ).length;

        if (loggedDays <= Math.floor(days.length / 2)) {

            insights.push({

                severity: "warning",

                category: "Consistency",

                title: "Inconsistent Logging",

                description:
                    "Meals were logged on only " +
                    loggedDays +
                    " of " +
                    days.length +
                    " days."

            });

        } else {

            insights.push({

                severity: "success",

                category: "Consistency",

                title: "Consistent Tracking",

                description:
                    "Nutrition logging has been consistent."

            });

        }

    }

    return insights;

}

module.exports = {

    generateNutritionInsights

};