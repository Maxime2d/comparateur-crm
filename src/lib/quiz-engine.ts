import { getTopPlatforms } from "@/lib/platforms";
import { Platform, QuizAnswers, QuizResult } from "@/types/platform";

function getAllPlatforms(): Platform[] {
  return getTopPlatforms(100);
}

export function calculateQuizResults(answers: QuizAnswers): QuizResult[] {
  const platforms = getAllPlatforms();
  const results: QuizResult[] = [];

  for (const platform of platforms) {
    let score = 0;
    const reasons: string[] = [];

    // 1. Company Size Match (25 points)
    if (answers.companySize && platform.target.sizes.includes(answers.companySize as any)) {
      score += 25;
      reasons.push(`Adapté aux ${answers.companySize}`);
    }

    // 2. Budget Match (20 points)
    if (answers.budget) {
      const budgetScore = calculateBudgetScore(answers.budget, platform);
      score += budgetScore;
      if (budgetScore > 0) reasons.push("Compatible avec votre budget");
    }

    // 3. User Count Match (10 points)
    if (answers.userCount) {
      const userScore = calculateUserCountScore(answers.userCount, platform);
      score += userScore;
      if (userScore > 0) reasons.push("Scalabilité appropriée pour votre équipe");
    }

    // 4. Sales Process Match (10 points)
    if (answers.salesProcess) {
      const salesScore = calculateSalesProcessScore(answers.salesProcess, platform);
      score += salesScore;
      if (salesScore > 0) reasons.push(`Bien adapté pour votre cycle de vente`);
    }

    // 5. Email Marketing Match (10 points)
    if (answers.needsEmailMarketing) {
      const emailScore = calculateEmailMarketingScore(answers.needsEmailMarketing, platform);
      score += emailScore;
      if (emailScore > 0) {
        if (answers.needsEmailMarketing === "essential" && platform.features.emailIntegration) {
          reasons.push("Emailing intégré au CRM");
        } else if (answers.needsEmailMarketing === "nice-to-have") {
          reasons.push("Option emailing disponible");
        }
      }
    }

    // 6. Sector Match (5 points)
    if (answers.sector && platform.target.sectors.includes(answers.sector as any)) {
      score += 5;
      reasons.push("Spécialisé dans votre secteur");
    }

    // 7. Digital Comfort Match (10 points)
    if (answers.digitalComfort) {
      const comfortScore = calculateDigitalComfortScore(answers.digitalComfort, platform);
      score += comfortScore;
      if (comfortScore > 0) {
        if (answers.digitalComfort === "beginner") reasons.push("Interface simple et intuitive");
        else if (answers.digitalComfort === "advanced") reasons.push("API et intégrations avancées");
      }
    }

    // 8. Existing Tools Match (10 points)
    if (answers.existingTools.length > 0) {
      const toolsScore = calculateToolsScore(answers.existingTools, platform);
      score += toolsScore;
      if (toolsScore > 0) reasons.push("Intégrations avec vos outils actuels");
    }

    if (score > 0) {
      results.push({ platform, compatibilityScore: Math.min(100, score), reasons: reasons.slice(0, 3) });
    }
  }

  return results.sort((a, b) => b.compatibilityScore - a.compatibilityScore).slice(0, 3);
}

function calculateBudgetScore(budget: string, platform: Platform): number {
  const price = platform.pricing.startsAt;
  if (budget === "free") return platform.pricing.hasFreePlan ? 20 : 0;
  if (budget === "under-30" && price < 30) return 20;
  if (budget === "30-80" && price >= 30 && price < 80) return 20;
  if (budget === "80-plus" && price >= 80) return 20;
  if (budget === "on-quote" && platform.pricing.onQuote) return 20;
  if (budget === "unlimited") return 20;
  if (budget === "under-30" && price < 50) return 10;
  if (budget === "30-80" && price >= 20 && price < 100) return 10;
  if (budget === "80-plus" && price >= 50) return 10;
  return 0;
}

function calculateUserCountScore(userCount: string, platform: Platform): number {
  const scores: Record<string, number> = {
    solo: platform.pricing.hasFreePlan ? 10 : 5,
    "2-5": 10,
    "6-20": 10,
    "20-plus": platform.pricing.onQuote || platform.scores.features > 7 ? 10 : 5,
  };
  return scores[userCount] || 0;
}

function calculateSalesProcessScore(salesProcess: string, platform: Platform): number {
  const processFeatures: Record<string, (f: any) => boolean> = {
    "short-cycle": (f) => f.pipelineManagement && f.leadScoring,
    "long-cycle": (f) => f.pipelineManagement && f.forecastingTools && f.taskManagement,
    ecommerce: (f) => f.contactManagement && f.webFormsTracking,
    subscription: (f) => f.contactManagement && f.reportingAnalytics,
  };
  const checker = processFeatures[salesProcess];
  return checker && checker(platform.features) ? 10 : 3;
}

function calculateEmailMarketingScore(need: string, platform: Platform): number {
  if (need === "essential") return platform.features.emailIntegration || platform.features.automation ? 10 : 0;
  if (need === "nice-to-have") return platform.features.emailIntegration || platform.features.automation ? 10 : 5;
  return 0;
}

function calculateDigitalComfortScore(comfort: string, platform: Platform): number {
  const uxScore = platform.scores.ux;
  if (comfort === "beginner") return uxScore >= 7 ? 10 : uxScore >= 5 ? 5 : 0;
  if (comfort === "intermediate") return 10;
  if (comfort === "advanced") return platform.features.customizableFields ? 10 : 5;
  return 0;
}

function calculateToolsScore(tools: string[], platform: Platform): number {
  if (tools.length === 0 || tools.includes("none")) return 0;
  const integrations = platform.integrations.map((i) => i.toLowerCase());
  const toolMap: Record<string, string[]> = {
    gmail: ["gmail", "google"],
    outlook: ["outlook", "microsoft", "microsoft365"],
    facturation: ["factur", "pennylane", "sellsy", "invoice"],
    erp: ["erp", "sage", "sap", "dynamics"],
    telephony: ["aircall", "ringover", "twilio"],
    marketing: ["mailchimp", "brevo", "hubspot", "marketing"],
  };
  let matchCount = 0;
  for (const tool of tools) {
    const relatedKeywords = toolMap[tool] || [tool.toLowerCase()];
    if (relatedKeywords.some((keyword) => integrations.some((i) => i.includes(keyword)))) matchCount++;
  }
  if (matchCount >= tools.length * 0.7) return 10;
  if (matchCount >= tools.length * 0.4) return 7;
  if (matchCount > 0) return 3;
  return 0;
}
