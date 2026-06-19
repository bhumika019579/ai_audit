const { PrismaClient } = require('../prisma/generated/prisma')
const { nanoid } = require('nanoid')
const { aiTools } = require('../data/aiTools')
const { generateSummary } = require('../utils/groq')

const prisma = new PrismaClient()

const createAudit = async (req, res) => {
    try {
        const { tool, plan, teamSize, useCase, monthlyCost } = req.body

        // Validate required fields
        if (!tool || !plan || !teamSize || !useCase) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        // Get tool data from aiTools.js
        const toolData = aiTools[tool]
        if (!toolData) {
            return res.status(400).json({ error: 'Invalid tool selected' })
        }

        // Get recommended plan based on teamSize and useCase
        const recommendedPlan = toolData.getRecommendedPlan(Number(teamSize), useCase)

        // Get costs
        const currentCost = Number(monthlyCost)
        const recommendedCost = toolData.plans[recommendedPlan]

        // Calculate savings or increase
        // positive = overspending, negative = underspending
        const monthlySavings = currentCost - recommendedCost
        const yearlyCurrentSpend = currentCost * 12
        const yearlyRecommendedSpend = recommendedCost * 12
        const yearlySavings = yearlyCurrentSpend - yearlyRecommendedSpend

        // Determine spend status
        const spendStatus = monthlySavings > 0 ? 'overspending' : monthlySavings < 0 ? 'underspending' : 'optimal'

        // Generate message based on spend status
        let message = ''
        if (spendStatus === 'overspending') {
            message = `You're overspending by $${monthlySavings.toFixed(2)}/month on ${tool}. Downgrading to the ${recommendedPlan} plan will save you $${yearlySavings.toFixed(2)} yearly.`
        } else if (spendStatus === 'underspending') {
            const extraMonthly = Math.abs(monthlySavings).toFixed(2)
            const extraYearly = Math.abs(yearlySavings).toFixed(2)
            message = `You're underpaying for your current needs. Upgrading to the ${recommendedPlan} plan costs $${extraMonthly}/month more (+$${extraYearly}/year), but it's the right fit for your team size and use case.`
        } else {
            message = `You're on the perfect plan! ${recommendedPlan} is exactly right for your ${useCase} work with a team of ${teamSize}.`
        }

        // Generate Gemini summary
        const summary = await generateSummary(
            tool, plan, recommendedPlan, useCase,
            teamSize, currentCost, recommendedCost, yearlySavings
        )

        // Generate nanoid
        const id = nanoid(8)

        // Save to DB
        const audit = await prisma.audit.create({
            data: {
                nanoid: id,
                tool,
                plan,
                teamSize: Number(teamSize),
                useCase,
                monthlyCost: currentCost,
                recommendation: recommendedPlan,
                savings: monthlySavings,
                summary
            }
        })

        // Return result
        res.status(201).json({
            id: audit.nanoid,
            tool,
            plan,
            recommendedPlan,
            teamSize: Number(teamSize),
            useCase,
            monthlyCost: currentCost.toFixed(2),
            recommendedCost: recommendedCost.toFixed(2),
            monthlySavings: monthlySavings.toFixed(2),
            yearlyCurrentSpend: yearlyCurrentSpend.toFixed(2),
            yearlyRecommendedSpend: yearlyRecommendedSpend.toFixed(2),
            yearlySavings: yearlySavings.toFixed(2),
            spendStatus,        // 'overspending' | 'underspending' | 'optimal'
            message,
            summary
        })

    } catch (error) {
        console.error('Audit error:', error)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

const getAudit = async (req, res) => {
    try {
        const { id } = req.params

        const audit = await prisma.audit.findUnique({
            where: { nanoid: id }
        })

        if (!audit) {
            return res.status(404).json({ error: 'Audit not found' })
        }

        res.status(200).json(audit)

    } catch (error) {
        console.error('Get audit error:', error)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = { createAudit, getAudit }