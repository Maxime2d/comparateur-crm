# Brief pour Antigravity — comparateurcrm.fr

Tu rejoins un projet déjà amorcé. Lis ce brief entièrement avant de toucher à quoi que ce soit.

## Contexte projet (1 min)

**Site** : comparateurcrm.fr — comparateur de logiciels CRM avec monétisation par affiliation (programmes HubSpot, Pipedrive, Sellsy, etc.). Pendant de comparateur-efacturation.fr (dans le dossier parent).

**Modèle business** : SEO → pages comparateur / fiches CRM / blog → clic sur lien affilié → commission.

**Objectif SEO** : 20K+ visites organiques par mois à terme sur les mots-clés CRM français.

## Stack technique

- Next.js 15 + React 19 + TypeScript strict + Tailwind CSS 4
- Contenu éditorial : MDX via `next-mdx-remote@^6.0.0` + `gray-matter` + `remark-gfm`
- Analytics : `@vercel/analytics` + `@vercel/speed-insights`
- Hébergement : Vercel (projet `prj_WNnTdJp2XoXMhXk9kds6DcYMqkBh`)
- Domaine branché et actif, SSL OK. Live : https://comparateurcrm.fr

## État actuel du repo

- Branche : `main` (dernier commit `fc1ef69`)
- `src/lib/platforms.ts` : 24 fiches CRM avec scores, pricing, features, FAQ, externalReviews
- `src/lib/affiliate.ts` : builder UTM + mapping providers + tracking multi-canal. **Toute nouvelle page doit passer les liens affiliés par `AffiliateLink` avec une `AffiliateSource` valide (voir `src/lib/affiliate.ts` pour la liste des types)**
- `src/lib/mdx.ts` : helpers pour Blog / Guide / Comparison
- `src/components/mdx/mdx-components.tsx` : composants MDX stylés
- `src/components/shared/` : TableOfContents, RelatedArticles, PillarLinks, BlogPlatformCTA
- Routes : `/`, `/comparateur`, `/quiz`, `/crm/[slug]`, `/blog`, `/blog/[slug]`, `/guide`, `/guide/[slug]`, `/comparer`, `/comparer/[slug]`
- Contenus publiés :
  - Blog : `meilleur-crm-gratuit-2026`, `comment-choisir-crm`, `crm-pme-guide-complet`
  - Comparisons : `hubspot-vs-pipedrive`, `hubspot-vs-salesforce`

## Ta mission

Produire du **contenu MDX à fort potentiel SEO** en parallèle de Claude (qui bosse sur l'ops et la tech). Tu te concentres exclusivement sur `content/` — tu ne touches pas au code applicatif sauf si explicitement demandé.

### Priorité 1 : 5 fiches avis individuelles (~2500 mots chacune)

Dans `content/blog/` :

1. `hubspot-avis-tarifs-test-complet-2026.mdx` — `featuredPlatform: "hubspot-crm"`
2. `pipedrive-avis-tarifs-test-complet-2026.mdx` — `featuredPlatform: "pipedrive"`
3. `sellsy-avis-tarifs-test-complet-2026.mdx` — `featuredPlatform: "sellsy"`
4. `axonaut-avis-tarifs-test-complet-2026.mdx` — `featuredPlatform: "axonaut"`
5. `zoho-crm-avis-tarifs-test-complet-2026.mdx` — `featuredPlatform: "zoho-crm"`

Structure de chaque article (reprends la logique de `content/blog/crm-pme-guide-complet.mdx` en l'adaptant) :
- Introduction (contexte + verdict express)
- Présentation du produit et de son positionnement
- Tarifs détaillés par palier (avec tableau markdown)
- Fonctionnalités clés (ce qui différencie)
- Points forts et points faibles (honnêtes)
- Pour qui c'est idéal / à éviter
- Intégrations disponibles
- Comparaison rapide avec 2-3 concurrents directs
- FAQ (4-6 questions)
- Verdict final + CTA (le `BlogPlatformCTA` sera injecté automatiquement en fin d'article via `featuredPlatform` dans le frontmatter)

### Priorité 2 : 3 pages VS (~1800 mots chacune)

Dans `content/comparisons/` :

1. `sellsy-vs-pipedrive.mdx` — `platformA: "sellsy"`, `platformB: "pipedrive"`
2. `zoho-vs-hubspot.mdx` — `platformA: "zoho-crm"`, `platformB: "hubspot-crm"`
3. `axonaut-vs-sellsy.mdx` — `platformA: "axonaut"`, `platformB: "sellsy"`

Reprends la structure de `content/comparisons/hubspot-vs-pipedrive.mdx` : match en une minute, positionnement historique, tarifs comparés, UX, richesse fonctionnelle, cas d'usage où chacun gagne, mythes, verdict.

### Priorité 3 (si temps)

Dans `content/blog/` :
- `crm-immobilier-2026.mdx` — thématique verticale
- `crm-b2b-guide-complet-2026.mdx` — thématique verticale
- `meilleur-crm-tpe-2026.mdx` — variante volumique

## Conventions MDX (strictes)

Le pipeline MDX est sensible. Pour éviter de casser le build :

- **Markdown pur uniquement**. Pas de JSX custom, pas d'imports.
- **Pas de HTML avec attribut `style="..."`** (ça casse le parser). Si tu as besoin d'un encart, utilise `<blockquote>` ou un détail markdown.
- **Apostrophes directes (`'`)**, pas `&apos;` ni `&#39;`.
- **Liens internes** en relatif : `[voir le comparateur](/comparateur)`, `[fiche HubSpot](/crm/hubspot-crm)`.
- **Tableaux markdown** (GFM) autorisés et encouragés (`remark-gfm` est activé).
- **Frontmatter** obligatoire, validé par TypeScript. Regarde `src/lib/mdx.ts` pour les interfaces `BlogFrontmatter` et `ComparisonFrontmatter`. Tous les champs listés sont requis sauf mention `?`.

Exemple de frontmatter blog valide :

```yaml
---
title: "HubSpot CRM : avis, tarifs et test complet 2026"
description: "Notre analyse détaillée de HubSpot CRM en 2026 : tarifs par palier, forces, limites, alternatives. Verdict objectif par cas d'usage."
date: "2026-04-24"
author: "Équipe Comparateur CRM"
category: "Avis CRM"
readingTime: 12
tags: ["HubSpot", "avis HubSpot", "CRM", "comparatif"]
featuredPlatform: "hubspot-crm"
---
```

Exemple de frontmatter comparison valide :

```yaml
---
title: "Sellsy vs Pipedrive en 2026 : lequel choisir ?"
description: "Comparatif complet Sellsy vs Pipedrive en 2026 : tarifs, fonctionnalités, forces, faiblesses, cas d'usage idéal."
date: "2026-04-24"
platformA: "sellsy"
platformB: "pipedrive"
readingTime: 10
---
```

**Les slugs de `platformA` / `platformB` / `featuredPlatform` doivent exister dans `src/lib/platforms.ts`.** Si le slug n'existe pas, le build casse. Slugs valides disponibles :

```
hubspot-crm, salesforce, pipedrive, sellsy, axonaut, zoho-crm,
monday-sales-crm, freshsales, brevo, nocrm, teamleader, folk,
efficy, microsoft-dynamics-365, sugarcrm, creatio, agile-crm,
insightly, copper, close, karlia, youday-crm, initiative-crm,
divalto-weavy
```

## Qualité éditoriale

- Ton : professionnel, direct, pas promotionnel. L'honnêteté génère de la confiance et convertit mieux.
- Pas de superlatifs creux ("incroyable", "révolutionnaire"). Utilise des faits et des chiffres (tarifs exacts, volumes, %).
- Cite des cas d'usage concrets. Les lecteurs cherchent "est-ce fait pour ma boîte ?".
- Chaque article doit répondre à l'intention de recherche du mot-clé principal dans les 3 premiers paragraphes.
- Longueur cible : 2000-2500 mots pour les avis, 1800-2200 pour les VS.

## Git workflow

**Critique** : ne pousse JAMAIS directement sur `main`. Travaille sur une branche dédiée.

```bash
git checkout -b content/antigravity-batch-1
# ... crée/édite tes fichiers dans content/ ...
git add content/
git commit -m "content: add 5 CRM review articles + 3 VS pages

- hubspot-avis-tarifs-test-complet-2026
- pipedrive-avis-tarifs-test-complet-2026
- sellsy-avis-tarifs-test-complet-2026
- axonaut-avis-tarifs-test-complet-2026
- zoho-crm-avis-tarifs-test-complet-2026
- sellsy-vs-pipedrive
- zoho-vs-hubspot
- axonaut-vs-sellsy
"
git push origin content/antigravity-batch-1
```

Puis ouvre une PR vers `main`. Je reviendrai review et merger.

**Convention de commit** : préfixe `content:` pour tous tes commits de contenu. Ça distingue visuellement tes contributions dans `git log`.

## Vérification avant commit

Avant chaque commit :

```bash
npm run build
```

Le build doit passer. Si tu as une erreur MDX, c'est quasi toujours :
- Un slug `featuredPlatform` / `platformA` / `platformB` qui n'existe pas
- Un attribut `style="..."` dans le Markdown
- Une apostrophe échappée `&apos;` au lieu de `'`
- Un frontmatter malformé (YAML strict)

## Fichiers interdits

Tu ne touches PAS à :
- `src/` (tout le code applicatif)
- `package.json`, `next.config.ts`, `tsconfig.json`
- `public/`
- `next.config.ts`
- Les 3 articles déjà publiés (sauf correction orthographique)
- Les 2 comparaisons déjà publiées

Tu touches UNIQUEMENT à `content/` (tu crées de nouveaux `.mdx`).

## Quand tu as fini

1. Lance `npm run build` une dernière fois pour vérifier
2. Commit + push sur ta branche
3. Ouvre une PR vers main avec description claire
4. Ajoute une ligne dans `COORDINATION.md` (si présent à la racine) indiquant ce que tu as produit
5. Attends le merge

## En cas de blocage

Si tu es bloqué sur un détail technique (build qui casse, frontmatter rejeté, doute sur une convention), note-le dans `COORDINATION.md` et laisse une PR en draft. Je prendrai le relais.

## Objectif de volume

Si tu es efficace, tu devrais pouvoir sortir les 5 avis + 3 VS en une session. Si tu as le temps après, tape dans la priorité 3.

Bon travail.
