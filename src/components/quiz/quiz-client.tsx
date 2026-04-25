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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-slate-50 py-12 px-4">
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
                className="bg-violet-600 h-2 rounded-full"
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
            <div className="text-sm font-medium text-slate-500 flex items-center">
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
        isSelected ? "border-violet-600 bg-violet-50" : "border-gray-200 bg-white hover:border-violet-300"
      } ${fullWidth ? "col-span-1" : ""}`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${isSelected ? "text-violet-600" : "text-gray-400"}`} />
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
          ? "border-violet-600 bg-violet-50 ring-2 ring-violet-200"
          : "border-gray-200 bg-white hover:border-violet-300"
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
            isSelected ? "border-violet-600 bg-violet-600" : "border-gray-300"
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

const podiumStyles = [
  // 0 = #1 (gagnant)
  {
    cardBorder: "border-violet-300 ring-2 ring-violet-200/50",
    cardBg: "bg-white",
    accentBg: "bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500",
    accentText: "text-white",
    icon: Trophy,
    iconBg: "bg-amber-400/20",
    iconColor: "text-amber-300",
    label: "Notre recommandation",
    pillBg: "bg-violet-100 text-violet-700",
    scoreBadge: "bg-white/15 text-white border-white/25",
  },
  // 1 = #2
  {
    cardBorder: "border-slate-200",
    cardBg: "bg-white",
    accentBg: "bg-gradient-to-br from-slate-50 to-violet-50",
    accentText: "text-slate-900",
    icon: Medal,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    label: "Excellente alternative",
    pillBg: "bg-violet-100 text-violet-700",
    scoreBadge: "bg-violet-100 text-violet-700 border-violet-200",
  },
  // 2 = #3
  {
    cardBorder: "border-slate-200",
    cardBg: "bg-white",
    accentBg: "bg-gradient-to-br from-slate-50 to-emerald-50",
    accentText: "text-slate-900",
    icon: Award,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    label: "À envisager aussi",
    pillBg: "bg-emerald-100 text-emerald-700",
    scoreBadge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
];

function ResultsView({
  results,
  onReset,
}: {
  results: QuizResult[];
  onReset: () => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero dark cohérent avec le reste du site */}
      <section className="relative overflow-hidden bg-[#0a0a0f] pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/30 rounded-full filter blur-[100px]" />
          <div className="absolute top-0 right-10 w-[400px] h-[300px] bg-fuchsia-500/20 rounded-full filter blur-[90px]" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-indigo-500/20 rounded-full filter blur-[90px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 backdrop-blur-sm text-violet-300 text-xs font-semibold px-4 py-1.5 mb-6">
            <Trophy size={12} />
            Vos résultats personnalisés
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tight">
            Vos{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              3 CRM idéaux
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-6">
            Basés sur vos réponses, voici les CRM les plus adaptés à votre
            profil, classés par compatibilité.
          </p>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/15 hover:border-white/25 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <RotateCcw size={16} />
            Recommencer le quiz
          </button>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#0a0a0f]/60 to-[#fafaff] pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* Body pastel avec halo */}
      <section className="relative bg-[#fafaff] flex-1 pt-8 pb-20 overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-violet-200/25 rounded-full filter blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-fuchsia-200/20 rounded-full filter blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {results.map((result, index) => {
              // displayIndex : 0 = #1 au centre, 1 = #2 à gauche, 2 = #3 à droite
              const podiumPositions = [1, 0, 2];
              const displayIndex = podiumPositions[index] ?? index;
              const style = podiumStyles[displayIndex];
              const Icon = style.icon;
              const isWinner = displayIndex === 0;

              const priceLabel = result.platform.pricing.onQuote
                ? "Sur devis"
                : result.platform.pricing.startsAt === 0
                  ? "Gratuit"
                  : `${result.platform.pricing.startsAt}€/mois`;

              return (
                <motion.div
                  key={result.platform.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className={`relative order-${displayIndex} lg:order-${displayIndex} ${
                    isWinner ? "lg:scale-[1.04] lg:z-10" : ""
                  }`}
                  style={{
                    order:
                      typeof window !== "undefined" &&
                      window.matchMedia &&
                      window.matchMedia("(min-width: 1024px)").matches
                        ? displayIndex
                        : index,
                  }}
                >
                  <motion.div
                    animate={{ y: hoveredIndex === index ? -8 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`h-full rounded-3xl overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-shadow border-2 ${style.cardBorder} ${style.cardBg}`}
                  >
                    {/* Header avec icône + label */}
                    <div
                      className={`relative px-6 py-5 ${style.accentBg} ${style.accentText} text-center overflow-hidden`}
                    >
                      {isWinner && (
                        <>
                          <div
                            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-white/20 rounded-full filter blur-3xl"
                            aria-hidden="true"
                          />
                          <div
                            className="absolute -bottom-10 right-0 w-[200px] h-[150px] bg-fuchsia-300/30 rounded-full filter blur-3xl"
                            aria-hidden="true"
                          />
                        </>
                      )}
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${style.iconBg} ${style.iconColor}`}
                        >
                          <Icon size={16} />
                        </span>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isWinner ? "text-white/90" : "text-slate-600"
                          }`}
                        >
                          #{displayIndex + 1} · {style.label}
                        </span>
                      </div>
                    </div>

                    {/* Body card */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-start gap-3 mb-3">
                        <PlatformLogo
                          website={result.platform.website}
                          name={result.platform.name}
                          size={44}
                          className="rounded-xl flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h2 className="text-xl font-black text-slate-900 leading-tight">
                            {result.platform.name}
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                            {result.platform.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Compatibilité + prix sur une ligne */}
                      <div className="grid grid-cols-2 gap-3 my-4">
                        <div
                          className={`rounded-xl border px-3 py-2.5 text-center ${style.scoreBadge}`}
                        >
                          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                            Compatibilité
                          </div>
                          <div className="text-2xl font-black tabular-nums">
                            {result.compatibilityScore}
                            <span className="text-base">%</span>
                          </div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-center">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            À partir de
                          </div>
                          <div className="text-2xl font-black tabular-nums text-slate-900">
                            {priceLabel}
                          </div>
                        </div>
                      </div>

                      {/* Raisons */}
                      <ul className="space-y-2 mb-5 flex-1">
                        {result.reasons.map((reason, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                              <svg
                                className="w-2.5 h-2.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Badges */}
                      {result.platform.badges &&
                        result.platform.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {result.platform.badges.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className={`text-[10px] font-semibold px-2 py-1 rounded-full ${style.pillBg}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* CTAs */}
                      <div className="space-y-2 mt-auto">
                        <AffiliateLink
                          href={result.platform.affiliateUrl}
                          platformName={result.platform.name}
                          platformSlug={result.platform.slug}
                          source={isWinner ? "quiz-podium" : "quiz-details"}
                          variant="button-primary"
                          size="md"
                          fullWidth
                        >
                          {getCtaLabel(result.platform.pricing)}
                          <ExternalLink size={14} />
                        </AffiliateLink>
                        <a
                          href={`/crm/${result.platform.slug}`}
                          className="block text-center px-4 py-2 text-sm text-violet-700 font-semibold hover:text-violet-800 hover:bg-violet-50 rounded-xl transition-colors"
                        >
                          Voir la fiche complète
                          <ArrowRight className="inline ml-1" size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="text-center bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <p className="text-slate-600 mb-3">
              Ces recommandations ne vous conviennent pas ?
            </p>
            <a
              href="/comparateur"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold"
            >
              Explorer les 27 CRM du comparateur
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
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
