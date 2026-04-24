"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Target,
  Mail,
  Wrench,
  Wallet,
  Monitor,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ExternalLink,
  Trophy,
  Medal,
  Award,
} from "lucide-react";

import {
  COMPANY_SIZES,
  SECTORS,
  USER_COUNT_OPTIONS,
  SALES_PROCESS_OPTIONS,
  EMAIL_MARKETING_OPTIONS,
  BUDGET_OPTIONS_BY_SIZE,
  BUDGET_OPTIONS,
  EXISTING_TOOLS_OPTIONS,
  DIGITAL_COMFORT_OPTIONS,
} from "@/lib/constants";

import { QuizAnswers, QuizResult, CompanySize, Sector, DigitalComfort, SalesProcess, UserCount } from "@/types/platform";
import { calculateQuizResults } from "@/lib/quiz-engine";
import { formatPrice, getCtaLabel } from "@/lib/utils";
import { PlatformLogo } from "@/components/shared/platform-logo";
import { ScoreBadge } from "@/components/ui/score-badge";
import { AffiliateLink } from "@/components/shared/affiliate-link";
import { trackQuizCompletion } from "@/lib/affiliate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STEPS = ["Taille", "Secteur", "Utilisateurs", "Processus", "Email", "Outils", "Budget", "Confort"];

const stepIcons = {
  0: Building2,
  1: Target,
  2: Users,
  3: Target,
  4: Mail,
  5: Wrench,
  6: Wallet,
  7: Monitor,
};

export function QuizClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    companySize: null,
    userCount: null,
    salesProcess: null,
    needsEmailMarketing: null,
    existingTools: [],
    budget: null,
    sector: null,
    digitalComfort: null,
  });
  const [results, setResults] = useState<QuizResult[] | null>(null);

  const handleCompanySize = (size: CompanySize) => {
    setAnswers((prev) => ({ ...prev, companySize: size }));
    nextStep();
  };

  const handleSector = (sector: Sector) => {
    setAnswers((prev) => ({ ...prev, sector }));
    nextStep();
  };

  const handleUserCount = (count: UserCount) => {
    setAnswers((prev) => ({ ...prev, userCount: count }));
    nextStep();
  };

  const handleSalesProcess = (process: SalesProcess) => {
    setAnswers((prev) => ({ ...prev, salesProcess: process }));
    nextStep();
  };

  const handleEmailMarketing = (need: string) => {
    setAnswers((prev) => ({ ...prev, needsEmailMarketing: need as "essential" | "nice-to-have" | "no" }));
    nextStep();
  };

  const handleToolToggle = (tool: string) => {
    setAnswers((prev) => {
      const tools = prev.existingTools || [];
      if (tools.includes(tool)) {
        return { ...prev, existingTools: tools.filter((t) => t !== tool) };
      } else {
        return { ...prev, existingTools: [...tools, tool] };
      }
    });
  };

  const handleToolsNext = () => {
    nextStep();
  };

  const handleBudget = (budget: string) => {
    setAnswers((prev) => ({ ...prev, budget }));
    nextStep();
  };

  const handleDigitalComfort = (comfort: DigitalComfort) => {
    setAnswers((prev) => ({ ...prev, digitalComfort: comfort }));
    handleQuizComplete(comfort);
  };

  const handleQuizComplete = (comfort: DigitalComfort) => {
    const allAnswers = { ...answers, digitalComfort: comfort } as QuizAnswers;
    const quizResults = calculateQuizResults(allAnswers);
    setResults(quizResults);
    if (quizResults.length > 0 && allAnswers.companySize) {
      trackQuizCompletion(allAnswers.companySize, quizResults[0].platform.slug);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({ companySize: null, userCount: null, salesProcess: null, needsEmailMarketing: null, existingTools: [], budget: null, sector: null, digitalComfort: null });
    setResults(null);
  };

  if (results) {
    return <ResultsView results={results} onReset={resetQuiz} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Trouvez votre CRM</h1>
              <div className="text-sm font-medium text-gray-500">
                Étape {currentStep + 1} / {STEPS.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <Step0CompanySize selected={answers.companySize ?? undefined} onSelect={handleCompanySize} />
              )}
              {currentStep === 1 && <Step1Sector selected={answers.sector ?? undefined} onSelect={handleSector} />}
              {currentStep === 2 && (
                <Step2UserCount selected={answers.userCount ?? undefined} onSelect={handleUserCount} />
              )}
              {currentStep === 3 && (
                <Step3SalesProcess selected={answers.salesProcess ?? undefined} onSelect={handleSalesProcess} />
              )}
              {currentStep === 4 && (
                <Step4EmailMarketing selected={answers.needsEmailMarketing ?? undefined} onSelect={handleEmailMarketing} />
              )}
              {currentStep === 5 && (
                <Step5ExistingTools selected={answers.existingTools || []} onToggle={handleToolToggle} onNext={handleToolsNext} />
              )}
              {currentStep === 6 && (
                <Step6Budget
                  selected={answers.budget ?? undefined}
                  companySize={answers.companySize ?? undefined}
                  onSelect={handleBudget}
                />
              )}
              {currentStep === 7 && (
                <Step7DigitalComfort selected={answers.digitalComfort ?? undefined} onSelect={handleDigitalComfort} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-10 gap-4">
            <Button
              onClick={previousStep}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Précédent
            </Button>
            <div className="text-sm text-gray-500 flex items-center">
              {STEPS[currentStep]}
            </div>
            {currentStep < STEPS.length - 1 && (
              <Button
                onClick={nextStep}
                disabled={!isStepValid(currentStep, answers)}
                className="flex items-center gap-2"
              >
                Suivant
                <ArrowRight size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components

function Step0CompanySize({
  selected,
  onSelect,
}: {
  selected?: CompanySize;
  onSelect: (size: CompanySize) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quelle est la taille de votre entreprise?</h2>
      <p className="text-gray-600 mb-6">Cela nous aidera à recommander les solutions adaptées à votre structure.</p>
      <div className="grid grid-cols-2 gap-4">
        {COMPANY_SIZES.map((size) => (
          <Card
            key={size.value}
            label={size.label}
            icon={Building2}
            isSelected={selected === size.value}
            onClick={() => onSelect(size.value as CompanySize)}
          />
        ))}
      </div>
    </div>
  );
}

function Step1Sector({
  selected,
  onSelect,
}: {
  selected?: Sector;
  onSelect: (sector: Sector) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quel est votre secteur d&apos;activité?</h2>
      <p className="text-gray-600 mb-6">Nous pourrons identifier les solutions spécialisées dans votre domaine.</p>
      <div className="grid grid-cols-2 gap-4">
        {SECTORS.map((sector) => (
          <Card
            key={sector.value}
            label={sector.label}
            icon={Target}
            isSelected={selected === sector.value}
            onClick={() => onSelect(sector.value as Sector)}
          />
        ))}
      </div>
    </div>
  );
}

function Step2UserCount({
  selected,
  onSelect,
}: {
  selected?: UserCount;
  onSelect: (count: UserCount) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Combien d&apos;utilisateurs aurez-vous?</h2>
      <p className="text-gray-600 mb-6">Cela détermine la scalabilité et les tarifs nécessaires.</p>
      <div className="grid grid-cols-2 gap-4">
        {USER_COUNT_OPTIONS.map((option) => (
          <Card
            key={option.value}
            label={option.label}
            description={option.description}
            icon={Users}
            isSelected={selected === option.value}
            onClick={() => onSelect(option.value as UserCount)}
          />
        ))}
      </div>
    </div>
  );
}

function Step3SalesProcess({
  selected,
  onSelect,
}: {
  selected?: SalesProcess;
  onSelect: (process: SalesProcess) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quel est votre processus de vente?</h2>
      <p className="text-gray-600 mb-6">Sélectionnez le type de cycle de vente qui vous correspond.</p>
      <div className="grid grid-cols-2 gap-4">
        {SALES_PROCESS_OPTIONS.map((option) => (
          <Card
            key={option.value}
            label={option.label}
            description={option.description}
            icon={Target}
            isSelected={selected === option.value}
            onClick={() => onSelect(option.value as SalesProcess)}
          />
        ))}
      </div>
    </div>
  );
}

function Step4EmailMarketing({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect: (need: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Avez-vous besoin d&apos;emailing?</h2>
      <p className="text-gray-600 mb-6">Certains CRM intègrent des fonctionnalités d&apos;email marketing.</p>
      <div className="grid grid-cols-2 gap-4">
        {EMAIL_MARKETING_OPTIONS.map((option) => (
          <Card
            key={option.value}
            label={option.label}
            description={option.description}
            icon={Mail}
            isSelected={selected === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Step5ExistingTools({
  selected,
  onToggle,
  onNext,
}: {
  selected: string[];
  onToggle: (tool: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quels outils utilisez-vous déjà?</h2>
      <p className="text-gray-600 mb-6">Nous vous recommanderons des CRM compatibles avec vos outils existants.</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {EXISTING_TOOLS_OPTIONS.map((option) => (
          <ToggleCard
            key={option.value}
            label={option.label}
            icon={Wrench}
            isSelected={selected.includes(option.value)}
            onClick={() => onToggle(option.value)}
          />
        ))}
      </div>
      <Button onClick={onNext} className="w-full">
        Continuer
        <ArrowRight size={18} />
      </Button>
    </div>
  );
}

function Step6Budget({
  selected,
  companySize,
  onSelect,
}: {
  selected?: string;
  companySize?: CompanySize;
  onSelect: (budget: string) => void;
}) {
  const budgetOptions = companySize
    ? BUDGET_OPTIONS_BY_SIZE[companySize] || BUDGET_OPTIONS
    : BUDGET_OPTIONS;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quel est votre budget mensuel?</h2>
      <p className="text-gray-600 mb-6">Cela nous aidera à filtrer les solutions appropriées.</p>
      <div className="grid grid-cols-2 gap-4">
        {budgetOptions.map((option) => (
          <Card
            key={option.value}
            label={option.label}
            icon={Wallet}
            isSelected={selected === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Step7DigitalComfort({
  selected,
  onSelect,
}: {
  selected?: DigitalComfort;
  onSelect: (comfort: DigitalComfort) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quel est votre niveau de confort digital?</h2>
      <p className="text-gray-600 mb-6">Cela nous aidera à recommander des solutions adaptées à votre équipe.</p>
      <div className="grid grid-cols-1 gap-4">
        {DIGITAL_COMFORT_OPTIONS.map((option) => (
          <Card
            key={option.value}
            label={option.label}
            description={option.description}
            icon={Monitor}
            isSelected={selected === option.value}
            onClick={() => onSelect(option.value as DigitalComfort)}
            fullWidth
          />
        ))}
      </div>
    </div>
  );
}

// UI Components

interface CardProps {
  label: string;
  description?: string;
  icon: React.ComponentType<any>;
  isSelected: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}

function Card({ label, description, icon: Icon, isSelected, onClick, fullWidth }: CardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all text-left ${
        isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300"
      } ${fullWidth ? "col-span-1" : ""}`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${isSelected ? "text-blue-600" : "text-gray-400"}`} />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{label}</h3>
          {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
        </div>
      </div>
    </motion.button>
  );
}

function ToggleCard({ label, description, icon: Icon, isSelected, onClick }: CardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all text-left ${
        isSelected
          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
          : "border-gray-200 bg-white hover:border-blue-300"
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
            isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300"
          }`}
        >
          {isSelected && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" />}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{label}</h3>
          {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
        </div>
      </div>
    </motion.button>
  );
}

// Results View

function ResultsView({ results, onReset }: { results: QuizResult[]; onReset: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vos recommandations</h1>
          <p className="text-lg text-gray-600 mb-8">Basées sur vos réponses, voici les 3 meilleurs CRM pour vous</p>
          <Button onClick={onReset} variant="outline" className="inline-flex items-center gap-2">
            <RotateCcw size={18} />
            Recommencer le quiz
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {results.map((result, index) => {
            const podiumPositions = [1, 0, 2]; // Display order: 2nd, 1st (larger), 3rd
            const displayIndex = podiumPositions[index];

            return (
              <motion.div
                key={result.platform.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={`relative ${displayIndex === 0 ? "lg:row-span-1 lg:transform lg:scale-105" : ""}`}
              >
                <motion.div
                  animate={{
                    y: hoveredIndex === index ? -8 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow">
                    <div className={`p-8 text-center ${getPodiumBackground(displayIndex)}`}>
                      <div className="flex justify-center mb-4">
                        <PlatformLogo
                          website={result.platform.website}
                          name={result.platform.name}
                          size={48}
                          className="rounded-lg"
                        />
                      </div>

                      <div className="mb-4">
                        {displayIndex === 0 && (
                          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        )}
                        {displayIndex === 1 && (
                          <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        )}
                        {displayIndex === 2 && (
                          <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        )}
                      </div>

                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {result.platform.name}
                      </h2>

                      <p className="text-gray-600 text-sm mb-4">
                        {result.platform.shortDescription}
                      </p>

                      <ScoreBadge score={result.compatibilityScore} className="mx-auto mb-4" />

                      <p className="text-lg font-semibold text-gray-900 mb-4">
                        {formatPrice(result.platform.pricing.startsAt)}/mois
                      </p>

                      <div className="space-y-2 mb-6 text-left">
                        {result.reasons.map((reason, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-violet-600 mt-1">✓</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6 justify-center">
                        {result.platform.badges?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-3 flex-grow justify-end border-t">
                      <AffiliateLink
                        href={result.platform.affiliateUrl}
                        platformName={result.platform.name}
                        platformSlug={result.platform.slug}
                        source={displayIndex === 0 ? "quiz-podium" : "quiz-details"}
                        variant="button-primary"
                        size="md"
                        fullWidth
                      >
                        Essayer {result.platform.name}
                        <ExternalLink size={16} />
                      </AffiliateLink>

                      <a
                        href={`/crm/${result.platform.slug}`}
                        className="block text-center px-4 py-2 text-violet-600 font-medium hover:text-violet-700 border border-violet-200 rounded-lg transition-colors"
                      >
                        Voir les détails
                        <ArrowRight className="inline ml-2" size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Ces recommandations ne vous conviennent pas ?
          </p>
          <a
            href="/comparateur"
            className="text-violet-600 font-medium hover:text-violet-700 inline-flex items-center gap-2"
          >
            Voir tous les CRM
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

function getPodiumBackground(position: number): string {
  switch (position) {
    case 0:
      return "bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200";
    case 1:
      return "bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300";
    case 2:
      return "bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200";
    default:
      return "bg-white";
  }
}

// Helper function to validate if step is complete

function isStepValid(step: number, answers: Partial<QuizAnswers>): boolean {
  switch (step) {
    case 0:
      return !!answers.companySize;
    case 1:
      return !!answers.sector;
    case 2:
      return !!answers.userCount;
    case 3:
      return !!answers.salesProcess;
    case 4:
      return !!answers.needsEmailMarketing;
    case 5:
      return true; // Optional step
    case 6:
      return !!answers.budget;
    case 7:
      return !!answers.digitalComfort;
    default:
      return false;
  }
}
