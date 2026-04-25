"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export function RoiCalculator() {
  const [commerciaux, setCommerciaux] = useState(5);
  const [panierMoyen, setPanierMoyen] = useState(5000);
  const [dealsPerMonth, setDealsPerMonth] = useState(3);
  const [coutMensuel, setCoutMensuel] = useState(45);
  const [tauxAmelioration, setTauxAmelioration] = useState(15);

  const calc = useMemo(() => {
    const caActuel = commerciaux * dealsPerMonth * panierMoyen * 12;
    const dealsAvecCrm = dealsPerMonth * (1 + tauxAmelioration / 100);
    const caAvecCrm = commerciaux * dealsAvecCrm * panierMoyen * 12;
    const gainCa = caAvecCrm - caActuel;
    const coutAnnuelCrm = commerciaux * coutMensuel * 12;
    const roi = ((gainCa - coutAnnuelCrm) / coutAnnuelCrm) * 100;
    const moisAvantBreakeven =
      coutAnnuelCrm > 0 && gainCa > 0
        ? (coutAnnuelCrm / (gainCa / 12)).toFixed(1)
        : "—";
    return {
      caActuel,
      caAvecCrm,
      gainCa,
      coutAnnuelCrm,
      roi: Math.round(roi),
      moisAvantBreakeven,
      gainNet: gainCa - coutAnnuelCrm,
    };
  }, [commerciaux, panierMoyen, dealsPerMonth, coutMensuel, tauxAmelioration]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="text-violet-600" size={24} />
          <h2 className="text-xl font-bold text-slate-900">Vos paramètres</h2>
        </div>

        <div className="space-y-5">
          <Field
            label="Nombre de commerciaux"
            value={commerciaux}
            onChange={setCommerciaux}
            min={1}
            max={500}
            step={1}
            suffix=""
          />
          <Field
            label="Panier moyen par affaire"
            value={panierMoyen}
            onChange={setPanierMoyen}
            min={100}
            max={500000}
            step={100}
            suffix="€"
          />
          <Field
            label="Nombre d'affaires gagnées par commercial / mois"
            value={dealsPerMonth}
            onChange={setDealsPerMonth}
            min={0.5}
            max={50}
            step={0.5}
            suffix=""
          />
          <Field
            label="Coût mensuel du CRM par utilisateur"
            value={coutMensuel}
            onChange={setCoutMensuel}
            min={0}
            max={500}
            step={5}
            suffix="€"
          />
          <Field
            label="Amélioration attendue du taux de closing"
            value={tauxAmelioration}
            onChange={setTauxAmelioration}
            min={0}
            max={50}
            step={1}
            suffix="%"
            helper="Une étude Salesforce 2024 indique +15% en moyenne après 6 mois d'usage CRM."
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-violet-600 to-violet-700 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={24} />
          <h2 className="text-xl font-bold">Vos résultats prévisionnels</h2>
        </div>

        <div className="space-y-4">
          <ResultRow label="Chiffre d'affaires actuel (annuel)" value={fmt(calc.caActuel)} />
          <ResultRow label="CA prévisionnel avec CRM (annuel)" value={fmt(calc.caAvecCrm)} highlight />
          <div className="h-px bg-violet-400/50 my-4" />
          <ResultRow label="Gain de chiffre d'affaires" value={fmt(calc.gainCa)} />
          <ResultRow label="Coût annuel du CRM" value={fmt(calc.coutAnnuelCrm)} negative />
          <div className="h-px bg-violet-400/50 my-4" />
          <ResultRow
            label="Gain net annuel"
            value={fmt(calc.gainNet)}
            highlight
            big
          />
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-violet-800/40 rounded-xl p-4">
              <div className="text-xs text-violet-200 uppercase tracking-wider mb-1">
                ROI annuel
              </div>
              <div className="text-2xl font-bold">
                {calc.roi > 0 ? "+" : ""}
                {calc.roi}%
              </div>
            </div>
            <div className="bg-violet-800/40 rounded-xl p-4">
              <div className="text-xs text-violet-200 uppercase tracking-wider mb-1">
                Break-even
              </div>
              <div className="text-2xl font-bold">
                {calc.moisAvantBreakeven} mois
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-violet-400/50">
          <p className="text-sm text-violet-100 mb-4">
            Prêt à concrétiser ce ROI ? Trouvez le CRM qui correspond à votre
            profil.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 bg-white text-violet-700 hover:bg-violet-50 font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
            >
              Faire le quiz
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/comparateur"
              className="inline-flex items-center justify-center gap-2 border border-white/40 hover:bg-white/10 font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors"
            >
              Voir les 24 CRM
            </Link>
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

function Field({ label, value, onChange, min, max, step, suffix, helper }: FieldProps) {
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
          highlight ? "text-white" : negative ? "text-violet-200" : "text-violet-50"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
