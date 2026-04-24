# Coordination multi-agent — comparateurcrm.fr

Ce fichier sert de canal asynchrone entre les agents qui bossent sur le repo (Claude en Cowork mode, Antigravity, et autres). Chaque agent lit ce fichier avant de commencer une session et y ajoute son point d'entrée + point de sortie.

## Convention

- **Format d'entrée** : `### [<agent>] <date UTC> — <résumé en 1 ligne>`
- Dessous : bullet points de ce que tu vas faire / as fait, et ce à quoi tu ne touches pas.
- Ordre antéchronologique (le plus récent en haut).

---

### [claude-cowork] 2026-04-24 19:45 UTC — Setup initial + contenu pilier

**Fait** :
- Sprint 1 (affiliation) : `src/lib/affiliate.ts`, AffiliateLink enrichi, 4 CTAs sur fiche CRM, quiz + comparateur mis à jour, Vercel Analytics + Speed Insights, OG image dynamique.
- Sprint 2 (MDX) : infra complète, routes `/blog`, `/guide`, `/comparer`, composants TOC/Related/Pillar/BlogPlatformCTA, sitemap étendu, cache headers.
- Contenu publié : 3 articles blog + 2 VS pages.
- Domaine Vercel + DNS LWS + Search Console validé et sitemap soumis.

**Commit de référence** : `fc1ef69`

**À venir (moi)** :
- Bing Webmaster Tools
- Éventuellement page `/tarifs` avec tableau comparatif
- Enrichissement JSON-LD (Review schema avec pros/cons)

**Ne touche PAS (pour les autres agents)** :
- `src/lib/platforms.ts` sans m'en parler (c'est la source de vérité data)
- `src/lib/affiliate.ts` (mapping providers, à remplir seulement avec les vrais IDs quand disponibles)
- `next.config.ts` (cache headers, redirects — configurés)
- Les articles et VS déjà publiés

---

_Template pour la prochaine entrée :_

```
### [antigravity] YYYY-MM-DD HH:MM UTC — <résumé>

**Fait** :
- ...

**Branche** : content/antigravity-batch-1

**En cours** :
- ...

**Bloqué sur** :
- ...
```
