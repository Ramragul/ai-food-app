export const calculateCalories = ({ weight, height, activity, goal }) => {
    let bmr = 10 * weight + 6.25 * height - 5 * 25 + 5;
  
    let multiplier = 1.2;
    if (activity === "MEDIUM") multiplier = 1.55;
    if (activity === "HIGH") multiplier = 1.75;
  
    let maintenance = bmr * multiplier;
  
    if (goal === "LOSS") return maintenance - 500;
    if (goal === "GAIN") return maintenance + 300;
    if (goal === "BULK") return maintenance + 500;
  
    return maintenance;
  };