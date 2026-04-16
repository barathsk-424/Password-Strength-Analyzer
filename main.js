function updateUI() {
    const passwordField = document.getElementById("password");
    if (!passwordField) return;
    
    const password = passwordField.value;
    const bar = document.getElementById("strength-bar");
    const status = document.getElementById("strength-status");
    
    // Requirements
    const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    // Update Checklist
    updateChecklistItem("req-length", checks.length);
    updateChecklistItem("req-upper", checks.upper);
    updateChecklistItem("req-number", checks.number);
    updateChecklistItem("req-symbol", checks.symbol);

    // Calculate Score
    let score = 0;
    if (password.length > 0) {
        if (checks.length) score += 25;
        if (checks.upper) score += 25;
        if (checks.number) score += 25;
        if (checks.symbol) score += 25;
    }

    // Update Meter
    bar.style.width = score + "%";
    
    if (score === 0) {
        status.innerText = "---";
        status.style.color = "var(--text-secondary)";
        bar.style.background = "transparent";
    } else if (score <= 25) {
        status.innerText = "WEAK";
        status.style.color = "var(--weak)";
        bar.style.background = "var(--weak)";
    } else if (score <= 75) {
        status.innerText = "MEDIUM";
        status.style.color = "var(--medium)";
        bar.style.background = "var(--medium)";
    } else {
        status.innerText = "STRONG";
        status.style.color = "var(--strong)";
        bar.style.background = "var(--strong)";
    }
}

function updateChecklistItem(id, isValid) {
    const el = document.getElementById(id);
    if (!el) return;
    if (isValid) {
        el.classList.add("valid");
    } else {
        el.classList.remove("valid");
    }
}

function togglePassword() {
    const passwordField = document.getElementById("password");
    const btn = document.getElementById("toggleBtn");
    if (!passwordField || !btn) return;

    if (passwordField.type === "password") {
        passwordField.type = "text";
        btn.innerText = "HIDE";
    } else {
        passwordField.type = "password";
        btn.innerText = "SHOW";
    }
}

// Attach events
document.addEventListener('DOMContentLoaded', () => {
    const passwordField = document.getElementById("password");
    if (passwordField) {
        passwordField.addEventListener('input', updateUI);
    }
});

// Attach to window for potential external access
window.updateUI = updateUI;
window.togglePassword = togglePassword;
