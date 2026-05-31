/* ============================================================
   demos-trials.js
   Shared scripts for demo / trial instruction pages.
   Include at the bottom of <body>, after qrcode.min.js.
   ============================================================ */

// ── QR code from ?demo= URL parameter ──────────────────────
(function () {
    const qrEl    = document.getElementById('qrcode');
    if (!qrEl) return;

    const params  = new URLSearchParams(window.location.search);
    const demoUrl = params.get('demo');
    const missing = document.getElementById('qr-missing');
    const urlEl   = document.getElementById('demo-url-display');

    if (demoUrl) {
        const canvas = document.createElement('canvas');
        qrEl.appendChild(canvas);
        QRCode.toCanvas(canvas, demoUrl, {
            errorCorrectionLevel: 'M',
            margin: 4,
            width: 200,
            color: {
                dark:  '#000000',
                light: '#ffffff'
            }
        }, function (error) {
            if (error) {
                console.error('QR generation error:', error);
            }
        });
        urlEl.innerHTML = '<a href="' + demoUrl + '" target="_blank" rel="noopener">' + demoUrl + '</a>';
    } else {
        qrEl.style.display = 'none';
        missing.style.display = 'block';
    }
})();

// ── Invite link from ?invite= URL parameter ─────────────────
// Used on pages with a speaker/master device login box.
(function () {
    const inviteLink = document.getElementById('invite-link');
    if (!inviteLink) return;

    const params    = new URLSearchParams(window.location.search);
    const inviteUrl = params.get('invite');
    if (inviteUrl) {
        inviteLink.href        = inviteUrl;
        inviteLink.textContent = inviteUrl;
    } else {
        inviteLink.textContent = '(registration link to be provided by your Nubart contact)';
        inviteLink.removeAttribute('href');
        inviteLink.style.color     = '#aaa';
        inviteLink.style.fontStyle = 'italic';
    }
})();

// ── Registered email from ?email= URL parameter ─────────────
// Surfaces the email the account was registered with, so a customer
// who forgot which address they used can recover it from this page.
(function () {
    const emailEl = document.getElementById('registered-email');
    if (!emailEl) return;

    const params = new URLSearchParams(window.location.search);
    const email  = params.get('email');
    if (email) {
        emailEl.textContent = email;
    } else {
        const wrap = document.getElementById('registered-email-wrap');
        if (wrap) wrap.style.display = 'none';
    }
})();

// ── Troubleshooting accordion ───────────────────────────────
function toggleTroubleshooting() {
    const body    = document.getElementById('ts-body');
    const chevron = document.getElementById('ts-chevron');
    if (!body) return;
    const isOpen  = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    chevron.className  = isOpen
        ? 'bi bi-chevron-down ms-auto'
        : 'bi bi-chevron-up ms-auto';
}