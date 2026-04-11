const GOAL_MAP = {
  "weight loss": "weight_loss",
  "fat loss": "weight_loss",
  "cutting": "weight_loss",

  "muscle gain": "muscle_gain",
  "bulking": "muscle_gain",
  "lean bulk": "muscle_gain",

  "maintain": "maintenance",
  "balanced diet": "maintenance",
};

// 🔥 Nutrient keywords
const NUTRIENTS = ["protein", "carbs", "fat", "fibre", "calories"];

export const parseGoal = (goalString) => {
  if (!goalString) return {};

  const lower = goalString.toLowerCase();

  const result = {
    goalType: null,
    preferences: {},   // high/low
    targets: {},       // numeric targets
    original: goalString,
  };

  // 🎯 Goal Type
  Object.keys(GOAL_MAP).forEach((key) => {
    if (lower.includes(key)) {
      result.goalType = GOAL_MAP[key];
    }
  });

  // 🔥 Extract HIGH / LOW preferences
  NUTRIENTS.forEach((nutrient) => {
    if (lower.includes(`high ${nutrient}`)) {
      result.preferences[nutrient] = "high";
    }
    if (lower.includes(`low ${nutrient}`)) {
      result.preferences[nutrient] = "low";
    }
  });

  // 🔢 Extract numeric targets (generic 🔥)
  const regex = /(\d+)\s*(g|kcal|cal)?\s*(protein|carbs|fat|fibre|calories)/g;

  let match;
  while ((match = regex.exec(lower)) !== null) {
    const value = parseInt(match[1]);
    const unit = match[2];
    const nutrient = match[3];

    result.targets[nutrient] = {
      value,
      unit: unit || (nutrient === "calories" ? "kcal" : "g"),
    };
  }

  return result;
};