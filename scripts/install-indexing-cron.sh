#!/usr/bin/env bash
#
# Installe le launchd qui exécute scripts/indexing-push.ts tous les jours à 18h.
#
# Usage : bash scripts/install-indexing-cron.sh
#
# Pour désinstaller : bash scripts/install-indexing-cron.sh --uninstall

set -euo pipefail

PLIST_NAME="com.maxime.comparateurcrm.indexing"
PLIST_SRC="$(cd "$(dirname "$0")" && pwd)/${PLIST_NAME}.plist"
PLIST_DEST="${HOME}/Library/LaunchAgents/${PLIST_NAME}.plist"

if [[ "${1:-}" == "--uninstall" ]]; then
  echo "→ Désinstallation du cron…"
  launchctl unload "${PLIST_DEST}" 2>/dev/null || true
  rm -f "${PLIST_DEST}"
  echo "✓ Désinstallé."
  exit 0
fi

echo "→ Installation du cron quotidien (18h00)…"

# Vérifier que les dépendances sont là
if ! command -v npx >/dev/null 2>&1; then
  echo "✗ npx introuvable. Installe Node.js (brew install node)." >&2
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "✗ git introuvable." >&2
  exit 1
fi

# Installer tsx + google-auth-library localement si pas déjà fait
echo "→ Vérification des dépendances npm…"
cd "$(cd "$(dirname "$0")"/.. && pwd)"
if [[ ! -d node_modules/tsx || ! -d node_modules/google-auth-library ]]; then
  echo "  Installation de tsx + google-auth-library…"
  npm install --save-dev tsx google-auth-library
else
  echo "  ✓ tsx et google-auth-library déjà installés"
fi

# Copier le plist
mkdir -p "${HOME}/Library/LaunchAgents"
cp "${PLIST_SRC}" "${PLIST_DEST}"

# Charger le launchd (unload d'abord au cas où)
launchctl unload "${PLIST_DEST}" 2>/dev/null || true
launchctl load "${PLIST_DEST}"

echo ""
echo "✓ Cron installé. Le script tournera tous les jours à 18h00."
echo ""
echo "Vérifications :"
echo "  - launchctl list | grep ${PLIST_NAME}"
echo "  - cat /tmp/comparateurcrm-indexing.log     (après le 1er run)"
echo ""
echo "Pour tester immédiatement (sans attendre 18h) :"
echo "  cd ~/Documents/affiliations/comparateur-crm"
echo "  npx tsx scripts/indexing-push.ts --dry-run    # simulation"
echo "  npx tsx scripts/indexing-push.ts              # vrai push"
echo ""
echo "Pour désinstaller :"
echo "  bash scripts/install-indexing-cron.sh --uninstall"
