import { pricingData, getPlanPrice } from './pricingData';

export const auditSpend = (userInput) => {
  const { tools, teamSize, primaryUseCase } = userInput;
  const recommendations = [];
  let totalCurrentSpend = 0;
  let totalRecommendedSpend = 0;

  for (const tool of tools) {
    const currentSpend = parseFloat(tool.monthlySpend);
    totalCurrentSpend += currentSpend;
    
    const recommendation = analyzeToolSpend(tool, teamSize, primaryUseCase);
    if (recommendation) {
      recommendations.push(recommendation);
      totalRecommendedSpend += recommendation.recommendedSpend;
    } else {
      totalRecommendedSpend += currentSpend;
    }
  }

  const monthlySavings = totalCurrentSpend - totalRecommendedSpend;
  const annualSavings = monthlySavings * 12;

  return {
    userInput,
    totalCurrentSpend,
    totalRecommendedSpend,
    monthlySavings,
    annualSavings,
    recommendations,
    isOptimal: monthlySavings < 100,
    summary: generateSummary(monthlySavings, recommendations.length)
  };
};

const TOOL_KEY_MAP = {
  'cursor': 'cursor',
  'githubcopilot': 'githubCopilot',
  'github copilot': 'githubCopilot',
  'claude': 'claude',
  'chatgpt': 'chatgpt',
  'gemini': 'gemini',
  'windsurf': 'windsurf'
};

const normalizeToolKey = (name) => {
  const lower = name.toLowerCase().replace(/\s+/g, ' ').trim();
  return TOOL_KEY_MAP[lower] || TOOL_KEY_MAP[lower.replace(/\s/g, '')] || lower;
};

const analyzeToolSpend = (tool, teamSize, primaryUseCase) => {
  const { name, plan, monthlySpend, seats } = tool;
  const currentSpend = parseFloat(monthlySpend);
  const seatCount = parseInt(seats);
  const toolKey = normalizeToolKey(name);

  if (plan === 'Team' && seatCount === 1) {
    const individualPlan = findIndividualPlan(name);
    if (individualPlan) {
      const recommendedSpend = getPlanPrice(toolKey, individualPlan, 1);
      if (recommendedSpend < currentSpend) {
        return {
          tool: name,
          currentPlan: plan,
          currentSpend,
          recommendedAction: `Switch to ${individualPlan} plan`,
          recommendedSpend,
          savings: currentSpend - recommendedSpend,
          reason: `With ${seatCount} user, the Team plan is overkill. ${individualPlan} provides all needed features.`
        };
      }
    }
  }

  const officialPrice = getPlanPrice(toolKey, plan, seatCount);
  if (officialPrice > 0 && currentSpend > officialPrice * 1.1) {
    return {
      tool: name,
      currentPlan: plan,
      currentSpend,
      recommendedAction: `Audit your billing — official ${plan} price is $${officialPrice}/month`,
      recommendedSpend: officialPrice,
      savings: currentSpend - officialPrice,
      reason: `You're paying $${currentSpend}/month but the official ${plan} plan costs $${officialPrice}/month for ${seatCount} seat(s). Check for unused add-ons or billing errors.`
    };
  }

  const alternative = findCheaperAlternative(name, primaryUseCase);
  if (alternative && alternative.price < currentSpend) {
    return {
      tool: name,
      currentPlan: plan,
      currentSpend,
      recommendedAction: `Consider ${alternative.name} as alternative`,
      recommendedSpend: alternative.price,
      savings: currentSpend - alternative.price,
      reason: `For ${primaryUseCase} use cases, ${alternative.name} offers similar capabilities at ${Math.round((alternative.price/currentSpend)*100)}% of the cost.`
    };
  }

  const cheaperPlan = findCheaperPlanForSeats(toolKey, plan, seatCount);
  if (cheaperPlan && cheaperPlan.price < currentSpend) {
    return {
      tool: name,
      currentPlan: plan,
      currentSpend,
      recommendedAction: `Downgrade to ${cheaperPlan.planName} plan`,
      recommendedSpend: cheaperPlan.price,
      savings: currentSpend - cheaperPlan.price,
      reason: `The ${cheaperPlan.planName} plan covers your needs at $${cheaperPlan.price}/month vs $${currentSpend}/month.`
    };
  }

  return null;
};

const findIndividualPlan = (toolName) => {
  const individualPlans = {
    cursor: 'Pro',
    githubCopilot: 'Individual',
    claude: 'Pro',
    chatgpt: 'Plus'
  };
  return individualPlans[normalizeToolKey(toolName)];
};

const findCheaperAlternative = (toolName, useCase) => {
  const alternatives = {
    coding: {
      cursor: { name: 'GitHub Copilot', price: 10 },
      chatgpt: { name: 'Claude Pro', price: 20 },
      claude: { name: 'ChatGPT Plus', price: 20 }
    },
    writing: {
      chatgpt: { name: 'Claude Pro', price: 20 },
      claude: { name: 'ChatGPT Plus', price: 20 }
    }
  };
  
  const useCaseAlternatives = alternatives[useCase];
  if (!useCaseAlternatives) return null;
  
  const key = normalizeToolKey(toolName);
  return useCaseAlternatives[key] || null;
};

const findCheaperPlanForSeats = (toolKey, currentPlan, seatCount) => {
  const plans = pricingData[toolKey];
  if (!plans) return null;
  const currentPlanData = plans[currentPlan];
  if (!currentPlanData) return null;
  const currentPrice = currentPlanData.price * seatCount;

  let cheapest = null;
  for (const [planName, planData] of Object.entries(plans)) {
    if (planName === currentPlan) continue;
    const minSeats = planData.minSeats || 1;
    if (seatCount < minSeats) continue;
    const price = planData.price * seatCount;
    if (price < currentPrice && (!cheapest || price < cheapest.price)) {
      cheapest = { planName, price };
    }
  }
  return cheapest;
};

const generateSummary = (monthlySavings, recommendationsCount) => {
  if (monthlySavings === 0) {
    return "Great news! Your AI tool spending is already optimized. You're getting good value for your current setup.";
  } else if (monthlySavings < 100) {
    return `We found ${recommendationsCount} small optimizations that could save you approximately $${Math.round(monthlySavings)}/month. Consider adjusting your plans to capture these savings.`;
  } else {
    return `We've identified ${recommendationsCount} major savings opportunities totaling $${Math.round(monthlySavings)}/month! By implementing these changes, you could save $${Math.round(monthlySavings * 12)} annually.`;
  }
};