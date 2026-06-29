
export const pricingData = {
  cursor: {
    Hobby: { price: 0, perSeat: true, description: "Limited features" },
    Pro: { price: 20, perSeat: true, description: "Full features", url: "https://cursor.sh/pricing" },
    Business: { price: 40, perSeat: true, description: "Team features", url: "https://cursor.sh/pricing" },
    Enterprise: { price: 60, perSeat: true, description: "Custom", url: "https://cursor.sh/pricing" }
  },
  githubCopilot: {
    Individual: { price: 10, perSeat: true, url: "https://github.com/features/copilot#pricing" },
    Business: { price: 19, perSeat: true, url: "https://github.com/features/copilot#pricing" },
    Enterprise: { price: 39, perSeat: true, url: "https://github.com/features/copilot#pricing" }
  },
  claude: {
    Pro: { price: 20, perSeat: true, url: "https://claude.ai/pricing" },
    Team: { price: 30, perSeat: true, minSeats: 2, url: "https://claude.ai/pricing" },
    Enterprise: { price: 50, perSeat: true, url: "https://claude.ai/pricing" }
  },
  chatgpt: {
    Plus: { price: 20, perSeat: true, url: "https://openai.com/chatgpt/pricing" },
    Team: { price: 25, perSeat: true, minSeats: 2, url: "https://openai.com/chatgpt/pricing" },
    Enterprise: { price: 50, perSeat: true, url: "https://openai.com/chatgpt/pricing" }
  },
  gemini: {
    Pro: { price: 0, perSeat: true, description: "Limited free tier" },
    Ultra: { price: 30, perSeat: true, url: "https://gemini.google.com/pricing" }
  },
  windsurf: {
    Pro: { price: 15, perSeat: true, url: "https://windsurf.ai/pricing" }
  }
};

export const getPlanPrice = (tool, plan, seats) => {
  const planData = pricingData[tool]?.[plan];
  if (!planData) return 0;
  if (planData.perSeat) {
    return planData.price * seats;
  }
  return planData.price;
};