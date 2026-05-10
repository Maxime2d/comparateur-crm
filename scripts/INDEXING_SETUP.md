# Indexation automatique quotidienne — Setup

Ce système pousse chaque jour à 18h **20 URLs** à l'indexation Google
(via Indexing API) + Bing/Yandex/Naver/Seznam/Yep (via IndexNow).

Le script évite de re-soumettre la même URL trop souvent (cooldown 14j),
priorise les URLs business (Tier 1 → hubs + top fiches CRM + VS) et tourne
les URLs au sein d'un même tier pour ne pas envoyer toujours la même
séquence à Google.

---

## Installation en 4 étapes (10 minutes)

### Étape 1 — Créer un projet Google Cloud + Service Account

1. Va sur **https://console.cloud.google.com/**
2. Crée un nouveau projet : `comparateurcrm-indexing` (ou nom de ton choix)
3. Active la **Web Search Indexing API** :
   - Menu → APIs & Services → Library
   - Recherche "Indexing API"
   - Clique "Enable"
4. Crée un **service account** :
   - Menu → IAM & Admin → Service Accounts → Create Service Account
   - Nom : `indexing-bot`
   - Clique "Create and Continue", puis "Done" (pas besoin de rôle)
5. Génère une **clé JSON** :
   - Clique sur le service account créé
   - Onglet "Keys" → Add Key → Create new key → Format JSON → Create
   - Le fichier `*.json` se télécharge automatiquement

### Étape 2 — Donner accès au service account dans Search Console

1. Note l'**email** du service account (visible dans la fiche, format
   `indexing-bot@<projet>.iam.gserviceaccount.com`)
2. Va sur **https://search.google.com/search-console**
3. Sélectionne la propriété `comparateurcrm.fr`
4. Menu → **Paramètres** → **Utilisateurs et autorisations**
5. Clique **Ajouter un utilisateur**
6. Email : colle l'email du service account
7. Autorisation : **Propriétaire** (obligatoire pour Indexing API)
8. Valide

### Étape 3 — Ranger la clé JSON sur ton Mac

```bash
mkdir -p ~/.config/comparateurcrm
mv ~/Downloads/comparateurcrm-indexing-*.json ~/.config/comparateurcrm/google-indexing.json
chmod 600 ~/.config/comparateurcrm/google-indexing.json
```

(Adapte le nom du fichier téléchargé selon ce que Google a généré.)

### Étape 4 — Installer le cron (1 commande)

```bash
cd ~/Documents/affiliations/comparateur-crm
bash scripts/install-indexing-cron.sh
```

Le script va :
- Installer les dépendances npm (`tsx`, `google-auth-library`)
- Copier le launchd dans `~/Library/LaunchAgents`
- Charger le service (déjà actif sans redémarrer le Mac)

C'est fini. Le cron tournera tous les jours à 18h00.

---

## Test immédiat (sans attendre 18h)

```bash
cd ~/Documents/affiliations/comparateur-crm

# Simulation (rien n'est soumis, juste les logs)
npx tsx scripts/indexing-push.ts --dry-run

# Vrai push (consomme du quota Google : 200/jour, on en utilise 20)
npx tsx scripts/indexing-push.ts
```

Tu peux changer le nombre d'URLs poussées par run :

```bash
npx tsx scripts/indexing-push.ts --limit 50
```

---

## Suivi des résultats

**Logs locaux** (chaque run y ajoute) :

```bash
tail -f /tmp/comparateurcrm-indexing.log
```

**État** : voir quelles URLs ont été poussées et quand :

```bash
cat scripts/indexing-state.json | jq
```

**Vérification dans GSC** :
- Search Console → Indexation → Pages
- Le nombre d'URLs indexées doit augmenter chaque semaine
- `data:image/svg+xml…` peut aussi vérifier dans "Inspection de l'URL"
  individuelle si une page précise est passée à "Indexée"

---

## Quotas et limites

- **Google Indexing API** : 200 URLs/jour par projet Google Cloud.
  Notre script en utilise 20/jour → marge confortable.
- **IndexNow** : pas de limite stricte, mais on bat le rythme par run.
- **Cooldown** : 14 jours par URL (ne re-soumet pas la même URL avant).
  Avec 100 URLs et 20 par jour, on tourne en environ 5 jours,
  puis on attend que le cooldown expire pour les premières.

---

## Désinstallation

```bash
bash scripts/install-indexing-cron.sh --uninstall
```

---

## Architecture technique

```
scripts/
├── indexing-priority.ts          ← Liste 100 URLs ordonnées par TIER
├── indexing-state.json           ← État (URLs déjà soumises + dates)
├── indexing-push.ts              ← Script principal (Google + IndexNow)
├── com.maxime.comparateurcrm.indexing.plist  ← launchd config
├── install-indexing-cron.sh      ← Installateur 1-clic
└── INDEXING_SETUP.md             ← Ce fichier
```

Le script est **idempotent** (peut être relancé sans risque) et
**transactionnel** (état mis à jour seulement après succès).

---

## Important : ce que l'Indexing API peut et ne peut pas faire

L'Indexing API de Google est **officiellement** réservée à 2 types de
contenus : `JobPosting` (offres d'emploi) et `BroadcastEvent` (livestream).
Pour les autres pages (fiches CRM, blog, hubs), Google **accepte** les
soumissions et les **traite en priorité**, mais ne **garantit pas**
l'indexation immédiate.

En pratique sur des sites jeunes :
- Un push via Indexing API accélère le crawl de **24-72h** (vs plusieurs
  semaines sans).
- Combiné avec IndexNow (Bing) et un sitemap propre, c'est le combo
  qui maximise tes chances.
- Le facteur N°1 reste les **backlinks de qualité** + le **contenu
  régulier** + l'**autorité de domaine** qui se construit dans le temps.

---

## Si quelque chose ne marche pas

**`Clé Google Indexing non trouvée`** → vérifier que le fichier est bien à
`~/.config/comparateurcrm/google-indexing.json`, ou pointer vers un autre
chemin via `GOOGLE_INDEXING_KEY_PATH=/chemin/vers/fichier.json npx tsx ...`

**`HTTP 403 Permission denied`** → le service account n'est pas
**Propriétaire** dans GSC. Re-vérifier l'étape 2.

**`HTTP 404`** → l'URL soumise n'est pas accessible publiquement (vérifier
qu'elle existe en navigateur).

**Le cron ne se déclenche pas** → vérifier `launchctl list | grep
comparateurcrm`. S'il n'y est pas, relancer `bash
scripts/install-indexing-cron.sh`. Vérifier aussi que ton Mac est allumé
à 18h (le launchd ne réveille pas le Mac).
