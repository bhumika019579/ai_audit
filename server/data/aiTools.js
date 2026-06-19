
const aiTools = {
  ChatGPT: {
    plans: { Free: 0, Go: 4.2, Plus: 21.2, Pro: 113.3 },
    getRecommendedPlan: (teamSize, useCase) => {
      if (teamSize >= 1 && teamSize <= 5) {
        if (useCase === 'Coding') return 'Plus'
        if (useCase === 'Research') return 'Plus'
        if (useCase === 'Writing') return 'Go'
        if (useCase === 'Design') return 'Free'
        return 'Free'
      }
      if (teamSize >= 6 && teamSize <= 15) {
        if (useCase === 'Coding') return 'Plus'
        if (useCase === 'Research') return 'Plus'
        if (useCase === 'Writing') return 'Plus'
        if (useCase === 'Design') return 'Go'
        return 'Go'
      }
      if (teamSize >= 16 && teamSize <= 30) {
        if (useCase === 'Coding') return 'Pro'
        if (useCase === 'Research') return 'Pro'
        if (useCase === 'Writing') return 'Plus'
        if (useCase === 'Design') return 'Plus'
        return 'Plus'
      }
      if (teamSize > 30) {
        if (useCase === 'Coding') return 'Pro'
        if (useCase === 'Research') return 'Pro'
        if (useCase === 'Writing') return 'Pro'
        if (useCase === 'Design') return 'Plus'
        return 'Pro'
      }
    }
  },
  Claude: {
    plans: { Free: 0, Pro: 17, Max: 100 },
    getRecommendedPlan: (teamSize, useCase) => {
      if (teamSize >= 1 && teamSize <= 5) {
        if (useCase === 'Coding') return 'Pro'
        if (useCase === 'Research') return 'Max'
        if (useCase === 'Writing') return 'Pro'
        if (useCase === 'Design') return 'Free'
        return 'Free'
      }
      if (teamSize >= 6 && teamSize <= 15) {
        if (useCase === 'Coding') return 'Pro'
        if (useCase === 'Research') return 'Max'
        if (useCase === 'Writing') return 'Pro'
        if (useCase === 'Design') return 'Pro'
        return 'Pro'
      }
      if (teamSize >= 16 && teamSize <= 30) {
        if (useCase === 'Coding') return 'Max'
        if (useCase === 'Research') return 'Max'
        if (useCase === 'Writing') return 'Max'
        if (useCase === 'Design') return 'Pro'
        return 'Max'
      }
      if (teamSize > 30) {
        if (useCase === 'Coding') return 'Max'
        if (useCase === 'Research') return 'Max'
        if (useCase === 'Writing') return 'Max'
        if (useCase === 'Design') return 'Max'
        return 'Max'
      }
    }
  },
  Gemini: {
    plans: { Free: 0, AiPlus: 4.2, AiPro: 20.7, AiUltra: 68.9 },
    getRecommendedPlan: (teamSize, useCase) => {
      if (teamSize >= 1 && teamSize <= 5) {
        if (useCase === 'Coding') return 'AiPlus'
        if (useCase === 'Research') return 'AiPro'
        if (useCase === 'Writing') return 'AiPlus'
        if (useCase === 'Design') return 'Free'
        return 'Free'
      }
      if (teamSize >= 6 && teamSize <= 15) {
        if (useCase === 'Coding') return 'AiPro'
        if (useCase === 'Research') return 'AiPro'
        if (useCase === 'Writing') return 'AiPro'
        if (useCase === 'Design') return 'AiPlus'
        return 'AiPlus'
      }
      if (teamSize >= 16 && teamSize <= 30) {
        if (useCase === 'Coding') return 'AiPro'
        if (useCase === 'Research') return 'AiUltra'
        if (useCase === 'Writing') return 'AiPro'
        if (useCase === 'Design') return 'AiPro'
        return 'AiPro'
      }
      if (teamSize > 30) {
        if (useCase === 'Coding') return 'AiUltra'
        if (useCase === 'Research') return 'AiUltra'
        if (useCase === 'Writing') return 'AiUltra'
        if (useCase === 'Design') return 'AiPro'
        return 'AiUltra'
      }
    }
  },
  Cursor: {
    plans: { Free: 0, Pro: 20, Team: 40, Enterprise: 0 },
    getRecommendedPlan: (teamSize, useCase) => {
      if (teamSize >= 1 && teamSize <= 5) {
        if (useCase === 'Coding') return 'Pro'
        if (useCase === 'Research') return 'Free'
        if (useCase === 'Writing') return 'Free'
        if (useCase === 'Design') return 'Free'
        return 'Free'
      }
      if (teamSize >= 6 && teamSize <= 15) {
        if (useCase === 'Coding') return 'Team'
        if (useCase === 'Research') return 'Free'
        if (useCase === 'Writing') return 'Free'
        if (useCase === 'Design') return 'Free'
        return 'Pro'
      }
      if (teamSize >= 16 && teamSize <= 30) {
        if (useCase === 'Coding') return 'Team'
        if (useCase === 'Research') return 'Pro'
        if (useCase === 'Writing') return 'Pro'
        if (useCase === 'Design') return 'Pro'
        return 'Team'
      }
      if (teamSize > 30) {
        if (useCase === 'Coding') return 'Enterprise'
        if (useCase === 'Research') return 'Team'
        if (useCase === 'Writing') return 'Team'
        if (useCase === 'Design') return 'Team'
        return 'Enterprise'
      }
    }
  },
  'GitHub Copilot': {
    plans: { Free: 0, Pro: 10, ProPlus: 39, Max: 100 },
    getRecommendedPlan: (teamSize, useCase) => {
      if (teamSize >= 1 && teamSize <= 5) {
        if (useCase === 'Coding') return 'Pro'
        if (useCase === 'Research') return 'Free'
        if (useCase === 'Writing') return 'Free'
        if (useCase === 'Design') return 'Free'
        return 'Free'
      }
      if (teamSize >= 6 && teamSize <= 15) {
        if (useCase === 'Coding') return 'ProPlus'
        if (useCase === 'Research') return 'Free'
        if (useCase === 'Writing') return 'Free'
        if (useCase === 'Design') return 'Free'
        return 'Pro'
      }
      if (teamSize >= 16 && teamSize <= 30) {
        if (useCase === 'Coding') return 'ProPlus'
        if (useCase === 'Research') return 'Pro'
        if (useCase === 'Writing') return 'Pro'
        if (useCase === 'Design') return 'Pro'
        return 'ProPlus'
      }
      if (teamSize > 30) {
        if (useCase === 'Coding') return 'Max'
        if (useCase === 'Research') return 'ProPlus'
        if (useCase === 'Writing') return 'ProPlus'
        if (useCase === 'Design') return 'Pro'
        return 'Max'
      }
    }
  },
  Perplexity: {
    plans: { Free: 0, Pro: 17, Max: 167 },
    getRecommendedPlan: (teamSize, useCase) => {
      if (teamSize >= 1 && teamSize <= 5) {
        if (useCase === 'Coding') return 'Free'
        if (useCase === 'Research') return 'Pro'
        if (useCase === 'Writing') return 'Pro'
        if (useCase === 'Design') return 'Free'
        return 'Free'
      }
      if (teamSize >= 6 && teamSize <= 15) {
        if (useCase === 'Coding') return 'Free'
        if (useCase === 'Research') return 'Pro'
        if (useCase === 'Writing') return 'Pro'
        if (useCase === 'Design') return 'Free'
        return 'Pro'
      }
      if (teamSize >= 16 && teamSize <= 30) {
        if (useCase === 'Coding') return 'Pro'
        if (useCase === 'Research') return 'Max'
        if (useCase === 'Writing') return 'Pro'
        if (useCase === 'Design') return 'Pro'
        return 'Pro'
      }
      if (teamSize > 30) {
        if (useCase === 'Coding') return 'Pro'
        if (useCase === 'Research') return 'Max'
        if (useCase === 'Writing') return 'Max'
        if (useCase === 'Design') return 'Pro'
        return 'Max'
      }
    }
  }
}

module.exports = { aiTools }