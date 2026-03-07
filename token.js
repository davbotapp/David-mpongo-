// ===== token.js complet =====
const PlatformTokens = (() => {
  // ===== Liste des jetons valides =====
  const validTokens = {
    // Tâches
    G3: { days: 3, pageAccess: ["taches.html"] },

    // Produits
    N15: { days: 15, pageAccess: ["p1.html"] },
    P7: { days: 7, pageAccess: ["p3.html"] },
    M30: { days: 30, pageAccess: ["p3.html"] },
  };

  // Liste des jetons réels distribués (pour test ou production)
  const activeTokens = [
    "N3-TDFNNFNFNFKGIGIGIGI",
    "N3-TDFOeufoydhd",
    "P7-YRURURIIRIuRI",
    "P7-YAIDHNFKGHF",
    "M30-XUCIVOH0H9",
    "M30-YFJFKHLHOiH",
    "G3-ODLHDDYHLXkHOX",
    "G3-3JNJJKILLLLO"
  ];

  // ===== Validation d’un jeton =====
  function validatePlatformToken(token) {
    if (!token || typeof token !== "string") return { valid: false };

    const key = token.split("-")[0].toUpperCase();

    if (!validTokens[key]) return { valid: false };
    if (!activeTokens.includes(token)) return { valid: false };

    const days = validTokens[key].days;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + days * 24*60*60*1000);

    return { valid: true, type: key, expiresAt };
  }

  // ===== Vérification de l’accès à une page =====
  function checkPageAccess(tokenType, page) {
    if (!validTokens[tokenType]) return false;
    return validTokens[tokenType].pageAccess.includes(page);
  }

  // ===== Vérifier si le jeton est encore actif =====
  function isTokenActive(token) {
    const info = validatePlatformToken(token);
    if (!info.valid) return false;
    return new Date() < info.expiresAt;
  }

  // ===== Obtenir le temps restant en jours/heure/min =====
  function tokenTimeRemaining(token) {
    const info = validatePlatformToken(token);
    if (!info.valid) return null;
    const diffMs = info.expiresAt - new Date();
    const days = Math.floor(diffMs / (1000*60*60*24));
    const hours = Math.floor((diffMs % (1000*60*60*24)) / (1000*60*60));
    const mins = Math.floor((diffMs % (1000*60*60)) / (1000*60));
    return { days, hours, mins };
  }

  return {
    validatePlatformToken,
    checkPageAccess,
    isTokenActive,
    tokenTimeRemaining,
  };
})();
