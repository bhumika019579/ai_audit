const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.Groq_API_Key })

const generateSummary = async (tool, plan, recommendedPlan, useCase, teamSize, monthlyCost, recommendedCost, yearlySavings) => {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `
            You are an AI spend auditor. Write a short, smart, and friendly 3-4 sentence audit summary for this user:
            - AI Tool: ${tool}
            - Current Plan: ${plan} at $${monthlyCost}/month
            - Team Size: ${teamSize}
            - Primary Use Case: ${useCase}
            - Recommended Plan: ${recommendedPlan} at $${recommendedCost}/month
            - Yearly Savings if they switch: $${yearlySavings}
            
            Be direct, helpful and specific. Mention the tool name, current plan, recommended plan and yearly savings. Keep it under 4 sentences.
          `
        }
      ],
      max_tokens: 200
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Groq error:', error)
    return 'Unable to generate summary at this time.'
  }
}

module.exports = { generateSummary }