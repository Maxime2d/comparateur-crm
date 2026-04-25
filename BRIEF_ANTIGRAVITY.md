# Brief Antigravity v2 — comparateurcrm.fr

Tu rejoins un projet bien avancé. Lis ce brief en entier avant d'agir. La majorité de l'infrastructure et beaucoup de contenus pilier sont en place. **Ta mission est de produire 19 fiches d'avis CRM individuelles** de haute qualité.

## État actuel du repo (résumé)

- **80 pages statiques** générées (Next.js 15 + MDX)
- **24 fiches CRM** existantes dans `src/lib/platforms.ts` avec scores, pricing, features, FAQ
- **5 fiches d'avis individuelles déjà publiées** dans `content/blog/*-avis-tarifs-test-complet-2026.mdx` :
  - hubspot-avis-tarifs-test-complet-2026
  - pipedrive-avis-tarifs-test-complet-2026
  - sellsy-avis-tarifs-test-complet-2026
  - axonaut-avis-tarifs-test-complet-2026
  - zoho-crm-avis-tarifs-test-complet-2026

## Ta mission : les 19 fiches d'avis manquantes

Pour chacun de ces 19 CRM, créer un fichier MDX dans `content/blog/{slug}-avis-tarifs-test-complet-2026.mdx`.

**Liste des 22 slugs (qui doivent matcher exactement ceux dans `src/lib/platforms.ts`)** :

1. salesforce
2. monday-sales-crm
3. freshsales
4. brevo
5. nocrm
6. teamleader
7. folk
8. efficy
9. microsoft-dynamics-365
10. sugarcrm
11. creatio
12. agile-crm
13. insightly
14. copper
15. close
16. karlia
17. youday-crm
18. initiative-crm
19. divalto-weavy
20. activecampaign
21. bitrix24
22. odoo-crm

**Format de nom de fichier** : `{slug}-avis-tarifs-test-complet-2026.mdx`

Exemple : `salesforce-avis-tarifs-test-complet-2026.mdx`

## Frontmatter obligatoire

Reproduit exactement la structure des 5 articles déjà publiés. Le `featuredPlatform` doit matcher le slug de la fiche. Exemple pour Salesforce :

```yaml
---
title: "Salesforce CRM : avis, tarifs et test complet 2026"
description: "Notre analyse détaillée de Salesforce en 2026 : tarifs par palier, forces, limites, alternatives. Verdict objectif par cas d'usage."
date: "2026-04-24"
author: "Équipe Comparateur CRM"
category: "Avis CRM"
readingTime: 12
tags: ["Salesforce", "avis Salesforce", "CRM", "enterprise"]
featuredPlatform: "salesforce"
---
```

## Structure de chaque article (~2000 mots)

Reproduit la structure de `content/blog/sellsy-avis-tarifs-test-complet-2026.mdx` :

1. **Introduction** (100 mots) — pose le contexte et le verdict express
2. **Verdict express** (h2 + 100-150 mots) — synthèse honnête en 2-3 paragraphes
3. **Présentation du produit et positionnement** (h2 + 200 mots) — histoire, vision, segment cible
4. **Tarifs détaillés par palier** (h2 + tableau Markdown + 200 mots) — palier par palier, avec **tableau** comparatif obligatoire
5. **Fonctionnalités clés** (h2 avec h3 par fonction, 4-5 fonctions, 400 mots total) — ce qui différencie
6. **Points forts et points faibles** (h2 avec h3 Avantages et h3 Inconvénients, listes à puces, 200 mots)
7. **Pour qui c'est idéal / à éviter** (h2 + 2 sous-listes, 150 mots)
8. **Intégrations disponibles** (h2 + 100 mots) — 5-10 intégrations notables citées
9. **Comparaison rapide avec 2-3 concurrents directs** (h2 + 250 mots) — courts paragraphes pointant vers les pages /comparer/{slug-vs-slug} si elles existent (`/comparer/hubspot-vs-pipedrive`, `/comparer/sellsy-vs-pipedrive`, etc.)
10. **FAQ : questions fréquentes sur {Name}** (h2 avec 4-6 sous-h3 question, 350 mots)
11. **Verdict final + CTA** (h2 + 150 mots) — recommandation par cas d'usage

## Données à utiliser

**Source de vérité** : `src/lib/platforms.ts` contient pour chaque CRM le pricing, les features, les badges, le shortDescription, externalReviews. **Reprends ces données** pour rester cohérent. Ne pas inventer de tarifs.

Ouvre le fichier et identifie l'objet du CRM concerné par son `slug`.

## Conventions MDX (strictes)

- **Markdown pur uniquement.** Pas de JSX custom, pas d'imports, pas de composants importés.
- **Pas de HTML avec `style="..."`** (le parser MDX casse). Si besoin d'un encart visuel, utilise `<blockquote>` ou `<details><summary>`.
- **Apostrophes directes (`'`)**, pas `&apos;` ni `&#39;`.
- **Liens internes en relatif** : `[voir le comparateur](/comparateur)`, `[fiche HubSpot](/crm/hubspot-crm)`.
- **Tableaux Markdown GFM** activés et encouragés pour les tarifs.
- **Le composant `BlogPlatformCTA`** est injecté automatiquement en fin d'article via le frontmatter `featuredPlatform`. Ne pas l'écrire manuellement dans le corps.

## Maillage interne — important pour le SEO

Dans chaque article, place **3 à 5 liens internes** vers :

- La fiche CRM correspondante : `/crm/{slug}`
- Au moins une page VS pertinente : `/comparer/hubspot-vs-pipedrive`, `/comparer/sellsy-vs-pipedrive`, etc.
- Le comparateur principal : `/comparateur`
- Le quiz : `/quiz`
- La page tarifs : `/tarifs`
- Une page hub pertinente : `/crm-francais` (pour Brevo, Karlia, Youday, Initiative, Divalto), `/crm-tpe` (pour les CRM TPE-friendly), `/crm-startup` (HubSpot, Pipedrive, Close, Folk, Freshsales).

## Workflow Git

**CRITIQUE** : ne pousse JAMAIS sur `main` directement. Travaille sur une branche dédiée.

```bash
git checkout -b content/antigravity-batch-4-reviews
# ... crée les 19 fichiers MDX ...
git add content/blog/
git commit -m "content: add 19 CRM review articles (batch 4)"
git push origin content/antigravity-batch-4-reviews
```

## Vérification avant commit

```bash
npm run build
```

Le build doit passer. Si erreur, c'est presque toujours :
- Un `featuredPlatform` qui ne matche pas un slug existant
- Un attribut `style="..."` dans le Markdown
- Une apostrophe échappée
- Un frontmatter YAML mal formaté

## Mises à jour COORDINATION.md

À la fin de la session, ajoute une entrée dans `COORDINATION.md` à la racine.

## Objectif

À l'arrivée, tous les 24 CRM du comparateur auront leur fiche d'avis individuelle en blog (5 déjà existantes + tes 19 = 24). Cela densifie massivement le maillage interne et capture les requêtes "{nom CRM} avis" / "{nom CRM} tarif" qui sont des intentions commerciales fortes.

Bon travail.
