# Raccordement Matomo + Google Search Console

Deux briques branchées dans ce repo. Il te reste à renseigner les identifiants.

---

## 1. Matomo (mesure d'audience)

Le tracking est déjà intégré et **respecte le bandeau de consentement** :

- Aucun choix fait → mesure **sans cookie** (anonyme, exemptable CNIL).
- « Accepter » → mesure **avec cookies** (meilleure déduplication).
- « Refuser » → **aucune mesure** (opt-out total).

Les clics affiliés et les soumissions newsletter remontent déjà comme
objectifs Matomo (`trackGoal`) via `src/lib/affiliate.ts`.

### À faire (5 min)

1. Dans ton instance Matomo (celle des 2 autres sites) :
   **Administration → Sites web → Ajouter un site** → renseigne
   `comparateurcrm.fr`. Note l'**ID du site** généré (ex. `3`).
2. Renseigne les variables d'environnement (Vercel → Settings → Environment
   Variables, et `.env.local` en local) :

   ```
   NEXT_PUBLIC_MATOMO_URL=https://analytics.tondomaine.fr/   (slash final !)
   NEXT_PUBLIC_MATOMO_SITE_ID=3
   ```

3. Redéploie. Vérifie dans Matomo → **Visiteurs → Temps réel** que les visites
   arrivent. Tant que les variables sont vides, le composant ne fait rien (no-op).

### Recommandé côté Matomo
- Active **Anonymiser les IP** (Confidentialité) et le respect du Do Not Track.
- Crée 2 objectifs manuels si besoin : `affiliate_click` (Goal 1) et
  `newsletter_signup` (Goal 2), déjà déclenchés par le code.

---

## 2. Google Search Console (extraction de données)

Le script `scripts/gsc-pull.ts` récupère requêtes, pages et opportunités SEO,
en **réutilisant le service account de l'indexation** (aucune nouvelle clé).

### À faire (une fois)

1. **Active l'API** dans Google Cloud Console (même projet que l'indexation) :
   APIs & Services → Library → « **Google Search Console API** » → Enable.
2. Le service account d'indexation est déjà ajouté dans Search Console. Si ce
   n'est pas le cas : Search Console → Paramètres → Utilisateurs → ajoute son
   email (lecture suffit pour ce script).

### Utilisation

```bash
npm run gsc:pull              # 28 derniers jours
npm run gsc:pull -- --days 90 # 90 jours
```

Génère dans `scripts/gsc-reports/` (ignoré par git) :

| Fichier | Contenu |
|---|---|
| `queries-*.csv` | Top requêtes : clics, impressions, CTR, position |
| `pages-*.csv` | Top pages |
| `opportunities-*.csv` | **Quick wins** : requêtes en position 5-20 avec du volume → contenu à optimiser en priorité |
| `summary-*.json` | Totaux + faits saillants |

Le terminal affiche directement le top des quick wins.

### Automatisation (optionnel)
Comme pour l'indexation, tu peux ajouter un cron hebdo qui lance
`npm run gsc:pull` et te génère un rapport frais chaque lundi.
