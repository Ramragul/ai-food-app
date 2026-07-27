export interface Client {
    id: number;
    name: string;
    nickname: string;
    mobile: string;
    email: string;
    gender: string;
    age_range: string;
    created_at: string;
}

export interface Consent {
    granted: boolean;
    status: string;
    message: string;
}

export interface FitnessProfile {
    id: number;
    goal_type: string;
    activity_level: string;

    height_cm: number;
    weight_kg: number;
    target_weight: number;

    duration_days: number;

    target_calories: number;
    protein_target: number;
    carbs_target: number;
    fats_target: number;

    food_preference: string;
    meal_plan_enabled: boolean;

    goal_mode: string;
    target_source: string;

    created_at: string;
    updated_at: string;
}

export interface TodayNutrition {

    target: {

        calories: number;

        protein: number;

        carbs: number;

        fats: number;

    };

    consumed: {

        calories: number;

        protein: number;

        carbs: number;

        fats: number;

        fiber: number;

    };

    remaining: {

        calories: number;

        protein: number;

        carbs: number;

        fats: number;

    };

}

export interface ClientPermissions {

    can_view_profile: boolean;

    can_view_nutrition: boolean;

    can_write_notes: boolean;

    can_create_goal: boolean;

}

// export interface CoachNote {

//     id: number;

//     note: string;

//     created_at: string;

// }

export interface ClientDetails {

    client: Client;

    consent: Consent;

    fitness_profile: FitnessProfile;

    today: TodayNutrition | null;

    coach_notes: CoachNote[];

    analytics: Record<string, unknown>;

    permissions: ClientPermissions;

}

export interface CoachNote {

    id: number;

    category: string;

    title: string;

    note: string;

    coach_name: string;

    created_at: string;

}


export interface NutritionBreakdown {

    calories: number;

    protein: number;

    fiber: number;

    consistency: number;

    balance: number;

}

export interface NutritionScore {

    score: number;

    grade: string;

    status: string;

    breakdown: NutritionBreakdown;

}

export interface NutritionInsight {

    type: string;

    title: string;

    message: string;

}

export interface CoachInsight {

    severity: "success" | "info" | "warning" | "error";

    title: string;

    message: string;

}

export interface DailyNutrition {

    date: string;

    calories: number;

    protein: number;

    carbs: number;

    fats: number;

    fiber: number;

    calorie_completion: number;

}

export interface NutritionSummary {

    calories: number;

    protein: number;

    carbs: number;

    fats: number;

    fiber: number;

}

export interface NutritionTargets {

    calories: number;

    protein: number;

    carbs: number;

    fats: number;

}

export interface NutritionIntelligence {

    period: string;

    summary: NutritionSummary;

    targets: NutritionTargets;

    nutrition_score: NutritionScore;

    insights: NutritionInsight[];

    coach_insights: CoachInsight[];

    days?: DailyNutrition[];

    history?: DailyNutrition[];

}