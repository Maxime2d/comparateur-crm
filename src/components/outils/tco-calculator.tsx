"use client";

import { useState, useMemo } from "react";
import { Calculator, Wallet, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export function TcoCalculator() {
  const [users, setUsers] = useState(10);
  const [pricePerUser, setPricePerUser] = useState(50);
  const [setupCost, setSetupCost] = useState(2000);
  const [trainingPerUser, setTrainingPerUser] = useState(200);
  const [growthRate, setGrowthRate] = useState(15);
  const [premiumSupport, setPremiumSupport] = useState(0);
  const [integrationsCost, setIntegrationsCost] = useState(600);

  const calc = useMemo(() => {
    // Users per year (compound growth)
    const usersY1 = users;
    const usersY2 = Math.round(users * (1 + growthRate / 100));
    const usersY3 = Math.round(users * Math.pow(1 + growthRate / 100, 2));

    // Licences annuelles
    const licenceY1 = usersY1 * pricePerUser * 12;
    const licenceY2 = usersY2 * pricePerUser * 12;
    const licenceY3 = usersY3 * pricePerUser * 12;
    const licenceTotal = licenceY1 + licenceY2 + licenceY3;

    // Paramétrage : Y1 uniquement
    const setupY1 = setupCost;
    const setupY2 = 0;
    const setupY3 = 0;
    const setupTotal = setupY1;

    // Formation : Y1 sur tous, Y2/Y3 uniquement sur les nouveaux
    const trainingY1 = usersY1 * trainingPerUser;
    const trainingY2 = Math.max(0, usersY2 - usersY1) * trainingPerUser;
    const trainingY3 = Math.max(0, usersY3 - usersY2) * trainingPerUser;
    const trainingTotal = trainingY1 + trainingY2 + trainingY3;

    // Support premium annuel
    const supportY1 = premiumSupport;
    const supportY2 = premiumSupport;
    const supportY3 = premiumSupport;
    const supportTotal = supportY1 + supportY2 + supportY3;

    // Intégrations annuelles
    const integrationsY1 = integrationsCost;
    const integrationsY2 = integrationsCost;
    const integrationsY3 = integrationsCost;
    const integrationsTotal = integrationsY1 + integrationsY2 + integrationsY3;

    const totalY1 = licenceY1 + setupY1 + trainingY1 + supportY1 + integrationsY1;
    const totalY2 = licenceY2 + setupY2 + trainingY2 + supportY2 + integrationsY2;
    const totalY3 = licenceY3 + setupY3 + trainingY3 + supportY3 + integrationsY3;
    const totalTco = totalY1 + totalY2 + totalY3;

    const hiddenFees = setupTotal + trainingTotal + integrationsTotal;
    const hiddenPct = totalTco > 0 ? (hiddenFees / totalTco) * 100 : 0;

    return {
      usersY1,
      usersY2,
      usersY3,
      licenceY1,
      licenceY2,
      licenceY3,
      licenceTotal,
      setupY1,
      setupY2,
      setupY3,
      setupTotal,
      trainingY1,
      trainingY2,
      trainingY3,
      trainingTotal,
      supportY1,
      supportY2,
      supportY3,
      supportTotal,
      integrationsY1,
      integrationsY2,
      integrationsY3,
      integrationsTotal,
      totalY1,
      totalY2,
      totalY3,
      totalTco,
      hiddenFees,
      hiddenPct: Math.round(hiddenPct),
    };
  }, [
    users,
    pricePerUser,
    setupCost,
    trainingPerUser,
    growthRate,
    premiumSupport,
    integrationsCost,
  ]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="space-y-8">
      {/* Inputs + Synthèse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="text-violet-600" size={24} />
            <h2 className="text-xl font-bold text-slate-900">Vos paramètres</h2>
          </div>

          <div className="space-y-5">
            <Field
              label="Nombre d'utilisateurs"
              value={users}
              onChange={setUsers}
              min={1}
              max={100}
              step={1}
              suffix=""
            />
            <Field
              label="Prix mensuel par utilisateur"
              value={pricePerUser}
              onChange={setPricePerUser}
              min={0}
              max={500}
              step={5}
              suffix="€"
            />
            <Field
              label="Coût de paramétrage initial"
              value={setupCost}
              onChange={setSetupCost}
              min={0}
              max={50000}
              step={500}
              suffix="€"
              helper="Intégrateur, import de données, personnalisation. 2 000€ couvre un déploiement simple."
            />
            <Field
              label="Coût de formation par utilisateur"
              value={trainingPerUser}
              onChange={setTrainingPerUser}
              min={0}
              max={2000}
              step={50}
              suffix="€"
            />
            <Field
              label="Croissance d'équipe par an"
              value={growthRate}
              onChange={setGrowthRate}
              min={0}
              max={50}
              step={1}
              suffix="%"
            />
            <Field
              label="Support premium annuel"
              value={premiumSupport}
              onChange={setPremiumSupport}
              min={0}
              max={20000}
              step={100}
              suffix="€"
              helper="0 si le support standard est inclus. SLA dédié facturé en plus."
            />
            <Field
              label="Intégrations / connecteurs annuels"
              value={integrationsCost}
              onChange={setIntegrationsCost}
              min={0}
              max={20000}
              step={100}
              suffix="€"
              helper="Zapier, Make, connecteurs ERP, plugins emailing — souvent oublié."
            />
          </div>
        </div>

        {/* Synthèse */}
        <div className="bg-gradient-to-br from-violet-600 to-violet-700 text-white rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Wallet size={24} />
            <h2 className="text-xl font-bold">TCO sur 3 ans</h2>
          </div>

          <div className="space-y-4">
            <ResultRow label="Coût total licence (3 ans)" value={fmt(calc.licenceTotal)} />
            <ResultRow
              label="Frais cachés (setup + formation + intégrations)"
              value={fmt(calc.hiddenFees)}
              negative
            />
            <div className="h-px bg-violet-400/50 my-4" />
            <ResultRow
              label="TCO 3 ans"
              value={fmt(calc.totalTco)}
              highlight
              big
            />

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-violet-800/40 rounded-xl p-4">
                <div className="text-xs text-violet-200 uppercase tracking-wider mb-1">
                  Part des frais cachés
                </div>
                <div className="text-2xl font-bold">{calc.hiddenPct}%</div>
              </div>
              <div className="bg-violet-800/40 rounded-xl p-4">
                <div className="text-xs text-violet-200 uppercase tracking-wider mb-1">
                  Coût moyen / utilisateur / an
                </div>
                <div className="text-2xl font-bold">
                  {fmt(Math.round(calc.totalTco / 3 / Math.max(1, calc.usersY2)))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-violet-400/50">
            <p className="text-sm text-violet-100 mb-4">
              Comparez les vraies offres avec le bon coût total : licence + frais
              cachés.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tarifs"
                className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 hover:bg-violet-50 font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
              >
                Voir les tarifs
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 border border-white/40 hover:bg-white/10 font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
              >
                Faire le quiz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau détaillé */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 overflow-x-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Détail année par année
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500 uppercase tracking-wider text-xs">
              <th className="py-3 pr-3 font-semibold">Poste</th>
              <th className="py-3 px-3 font-semibold text-right">
                Année 1 ({calc.usersY1} users)
              </th>
              <th className="py-3 px-3 font-semibold text-right">
                Année 2 ({calc.usersY2} users)
              </th>
              <th className="py-3 px-3 font-semibold text-right">
                Année 3 ({calc.usersY3} users)
              </th>
              <th className="py-3 pl-3 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <Row
              label="Licence CRM"
              tag="visible"
              values={[calc.licenceY1, calc.licenceY2, calc.licenceY3, calc.licenceTotal]}
              fmt={fmt}
            />
            <Row
              label="Paramétrage initial"
              tag="caché"
              values={[calc.setupY1, calc.setupY2, calc.setupY3, calc.setupTotal]}
              fmt={fmt}
            />
            <Row
              label="Formation utilisateurs"
              tag="caché"
              values={[
                calc.trainingY1,
                calc.trainingY2,
                calc.trainingY3,
                calc.trainingTotal,
              ]}
              fmt={fmt}
            />
            <Row
              label="Support premium"
              tag="visible"
              values={[
                calc.supportY1,
                calc.supportY2,
                calc.supportY3,
                calc.supportTotal,
              ]}
              fmt={fmt}
            />
            <Row
              label="Intégrations / connecteurs"
              tag="caché"
              values={[
                calc.integrationsY1,
                calc.integrationsY2,
                calc.integrationsY3,
                calc.integrationsTotal,
              ]}
              fmt={fmt}
            />
            <tr className="border-t-2 border-slate-300 font-bold text-slate-900">
              <td className="py-3 pr-3">Total</td>
              <td className="py-3 px-3 text-right">{fmt(calc.totalY1)}</td>
              <td className="py-3 px-3 text-right">{fmt(calc.totalY2)}</td>
              <td className="py-3 px-3 text-right">{fmt(calc.totalY3)}</td>
              <td className="py-3 pl-3 text-right text-violet-700">
                {fmt(calc.totalTco)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
          <AlertTriangle
            className="text-amber-600 flex-shrink-0 mt-0.5"
            size={18}
          />
          <div className="text-sm text-amber-900">
            <strong>Les frais cachés représentent {calc.hiddenPct} % du TCO</strong>{" "}
            sur 3 ans, soit {fmt(calc.hiddenFees)}. Ce sont les postes
            systématiquement sous-évalués dans les comparaisons rapides de prix.
            Paramétrage, formation et intégrations sont à intégrer dès le devis.
          </div>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  suffix: string;
  helper?: string;
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  helper,
}: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 accent-violet-600"
        />
        <div className="flex-shrink-0 w-32 flex items-center gap-1">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-right font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
          />
          {suffix && (
            <span className="text-sm font-medium text-slate-500">{suffix}</span>
          )}
        </div>
      </div>
      {helper && <p className="text-xs text-slate-500 mt-1.5">{helper}</p>}
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight = false,
  negative = false,
  big = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  negative?: boolean;
  big?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-violet-100">{label}</span>
      <span
        className={`font-bold ${big ? "text-3xl" : "text-lg"} ${
          highlight ? "text-white" : negative ? "text-fuchsia-200" : "text-violet-50"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Row({
  label,
  tag,
  values,
  fmt,
}: {
  label: string;
  tag: "visible" | "caché";
  values: [number, number, number, number];
  fmt: (n: number) => string;
}) {
  return (
    <tr className="border-b border-slate-100">
      <td className="py-3 pr-3">
        <div className="flex items-center gap-2">
          <span>{label}</span>
          <span
            className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
              tag === "caché"
                ? "bg-fuchsia-100 text-fuchsia-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {tag === "caché" ? "frais caché" : "licence"}
          </span>
        </div>
      </td>
      <td className="py-3 px-3 text-right tabular-nums">{fmt(values[0])}</td>
      <td className="py-3 px-3 text-right tabular-nums">{fmt(values[1])}</td>
      <td className="py-3 px-3 text-right tabular-nums">{fmt(values[2])}</td>
      <td className="py-3 pl-3 text-right tabular-nums font-semibold text-slate-900">
        {fmt(values[3])}
      </td>
    </tr>
  );
}
