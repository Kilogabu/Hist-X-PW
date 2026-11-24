(() => {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;
    const themeLabel = themeToggle.querySelector(".theme-label");
    const storageKey = "monarquia-romana-theme";
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem(storageKey);
    } catch (_) {
        // O modo de cor continua disponível mesmo quando o armazenamento está bloqueado.
    }

    const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

    themeToggle.addEventListener("click", () => {
        const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        try {
        localStorage.setItem(storageKey, nextTheme);
        } catch (_) {
        // A troca de tema não depende do armazenamento.
        }
    });
    

    function setTheme(theme) {
        const isDark = theme === "dark";
        root.dataset.theme = isDark ? "dark" : "light";
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
        themeLabel.textContent = isDark ? "Modo claro" : "Modo escuro";
    }
})();
