// ---- Nubart LIVE Cost Calculator — FR ----
const LIVE_RATE = 39;
const LIVE_TRIAL = 0.5;
const LIVE_PYO_SETUP = 79;
const LIVE_PYO_PER_CODE = 1.5;
const LIVE_BASIC_PRICE = 599;
const LIVE_MEDIA_FIRST = 500;
const LIVE_MEDIA_EXTRA = 250;

function liveCustomPrice(qty) {
    if (qty <= 3000) return 3500;
    if (qty <= 5000) return 5000;
    if (qty <= 10000) return 8500;
    return null;
}

let liveCalcState = {
    pkg: null, pkgQty: 0,
    media: false, mediaQty: 0,
    translate: false, guides: 1, hours: 0, firstTime: null
};

function liveCalcGoToStep(n) {
    [1,2,3,4].forEach(i => {
        document.getElementById('live-calc-step-' + i).classList.add('d-none');
    });
    document.getElementById('live-calc-step-' + n).classList.remove('d-none');
}

// ---- Étape 1 : Forfait de cartes ----
function liveCalcSetPackage(pkg) {
    liveCalcState.pkg = pkg;
    ['pyo','basic','custom'].forEach(p => {
        const btn = document.getElementById('btn-pkg-' + p);
        btn.classList.toggle('btn-primary', p === pkg);
        btn.classList.toggle('btn-outline-secondary', p !== pkg);
    });
    document.getElementById('live-calc-pyo-form').classList.toggle('d-none', pkg !== 'pyo');
    document.getElementById('live-calc-basic-form').classList.toggle('d-none', pkg !== 'basic');
    document.getElementById('live-calc-custom-form').classList.toggle('d-none', pkg !== 'custom');
    document.getElementById('live-calc-custom-hint').textContent = '';
}

function liveCalcStep1Next() {
    const pkg = liveCalcState.pkg;
    if (!pkg) return;

    if (pkg === 'pyo') {
        const el = document.getElementById('live-calc-pyo-qty');
        const qty = parseInt(el.value);
        if (!qty || qty < 50) { el.classList.add('is-invalid'); return; }
        el.classList.remove('is-invalid');
        liveCalcState.pkgQty = qty;
    } else if (pkg === 'basic') {
        const el = document.getElementById('live-calc-basic-qty');
        const qty = parseInt(el.value);
        if (!qty || qty < 1) { el.classList.add('is-invalid'); return; }
        el.classList.remove('is-invalid');
        liveCalcState.pkgQty = qty;
    } else if (pkg === 'custom') {
        const el = document.getElementById('live-calc-custom-qty');
        const qty = parseInt(el.value);
        const hint = document.getElementById('live-calc-custom-hint');
        if (!qty || qty < 3000) {
            hint.textContent = 'La commande minimale pour les cartes Custom est de 3\u00a0000.';
            hint.style.color = '#dc3545';
            el.classList.add('is-invalid'); return;
        }
        if (qty % 1000 !== 0) {
            hint.textContent = 'Veuillez saisir un multiple de 1\u00a0000 (ex. 3000, 4000, 5000\u2026).';
            hint.style.color = '#dc3545';
            el.classList.add('is-invalid'); return;
        }
        if (qty > 10000) {
            hint.innerHTML = 'Pour les commandes supérieures à 10\u00a0000 cartes, veuillez <a href="../../contact.html">contacter notre équipe commerciale</a> pour un devis personnalisé.';
            hint.style.color = '#0d6efd';
            el.classList.remove('is-invalid'); return;
        }
        hint.textContent = '';
        el.classList.remove('is-invalid');
        liveCalcState.pkgQty = qty;
    }
    liveCalcGoToStep(2);
}

// ---- Étape 2 : Bibliothèque multimédia ----
function liveCalcSetMedia(yes) {
    liveCalcState.media = yes;
    document.getElementById('btn-media-no').classList.toggle('btn-primary', !yes);
    document.getElementById('btn-media-no').classList.toggle('btn-outline-secondary', yes);
    document.getElementById('btn-media-yes').classList.toggle('btn-primary', yes);
    document.getElementById('btn-media-yes').classList.toggle('btn-outline-secondary', !yes);
    document.getElementById('live-calc-media-form').classList.toggle('d-none', !yes);
}

function liveCalcStep2Next() {
    if (liveCalcState.media) {
        const el = document.getElementById('live-calc-media-qty');
        const qty = parseInt(el.value);
        if (!qty || qty < 1) { el.classList.add('is-invalid'); return; }
        el.classList.remove('is-invalid');
        liveCalcState.mediaQty = qty;
    } else {
        liveCalcState.mediaQty = 0;
    }
    liveCalcGoToStep(3);
}

// ---- Étape 3 : Traduction IA ----
function liveCalcSetTranslation(yes) {
    liveCalcState.translate = yes;
    document.getElementById('btn-translate-no').classList.toggle('btn-primary', !yes);
    document.getElementById('btn-translate-no').classList.toggle('btn-outline-secondary', yes);
    document.getElementById('btn-translate-yes').classList.toggle('btn-primary', yes);
    document.getElementById('btn-translate-yes').classList.toggle('btn-outline-secondary', !yes);
    document.getElementById('live-calc-translate-form').classList.toggle('d-none', !yes);
}

function liveCalcSetFirstTime(isFirst) {
    liveCalcState.firstTime = isFirst;
    document.getElementById('btn-live-firsttime-yes').classList.toggle('btn-primary', isFirst);
    document.getElementById('btn-live-firsttime-yes').classList.toggle('btn-outline-secondary', !isFirst);
    document.getElementById('btn-live-firsttime-no').classList.toggle('btn-primary', !isFirst);
    document.getElementById('btn-live-firsttime-no').classList.toggle('btn-outline-secondary', isFirst);
}

function liveCalcStep3Next() {
    if (liveCalcState.translate) {
        const gEl = document.getElementById('live-calc-guides');
        const hEl = document.getElementById('live-calc-hours');
        const g = parseInt(gEl.value);
        const h = parseFloat(hEl.value);
        let ok = true;
        if (!g || g < 1) { gEl.classList.add('is-invalid'); ok = false; } else { gEl.classList.remove('is-invalid'); }
        if (!h || h <= 0) { hEl.classList.add('is-invalid'); ok = false; } else { hEl.classList.remove('is-invalid'); }
        if (liveCalcState.firstTime === null) {
            document.getElementById('live-calc-firsttime-warning').classList.remove('d-none');
            ok = false;
        } else {
            document.getElementById('live-calc-firsttime-warning').classList.add('d-none');
        }
        if (!ok) return;
        liveCalcState.guides = g;
        liveCalcState.hours = h;
    } else {
        liveCalcState.guides = 0;
        liveCalcState.hours = 0;
        liveCalcState.firstTime = false;
    }
    liveCalcCompute();
    liveCalcGoToStep(4);
}

// ---- Étape 4 : Calcul et résultat ----
function liveCalcCompute() {
    const s = liveCalcState;

    let cardCost = 0, cardLabel = '';
    if (s.pkg === 'pyo') {
        cardCost = LIVE_PYO_SETUP + (s.pkgQty * LIVE_PYO_PER_CODE);
        cardLabel = 'Print-Your-Own (frais de configuration + ' + s.pkgQty + ' codes)';
    } else if (s.pkg === 'basic') {
        cardCost = s.pkgQty * LIVE_BASIC_PRICE;
        cardLabel = s.pkgQty === 1 ? 'Basic (500 cartes)' : 'Basic (' + s.pkgQty + ' \u00d7 500 cartes)';
    } else if (s.pkg === 'custom') {
        cardCost = liveCustomPrice(s.pkgQty) || 0;
        cardLabel = 'Custom (' + s.pkgQty.toLocaleString('fr') + ' cartes)';
    }

    let mediaCost = 0;
    if (s.media && s.mediaQty > 0) {
        mediaCost = LIVE_MEDIA_FIRST + Math.max(0, s.mediaQty - 1) * LIVE_MEDIA_EXTRA;
    }

    let totalStreamHours = 0, translationCost = 0, trialDeduction = 0;
    if (s.translate) {
        totalStreamHours = Math.ceil(s.hours) * s.guides;
        trialDeduction = s.firstTime ? LIVE_TRIAL : 0;
        translationCost = Math.max(0, totalStreamHours - trialDeduction) * LIVE_RATE;
    }

    const total = cardCost + mediaCost + translationCost;
    document.getElementById('live-calc-result-total').textContent = '\u20ac' + total.toLocaleString('de-DE');

    // Détail
    let rows = '';
    rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">' + cardLabel + '</span><strong>\u20ac' + cardCost.toLocaleString('de-DE') + '</strong></li>';

    if (s.media && s.mediaQty > 0) {
        const ml = s.mediaQty === 1 ? 'Bibliothèque multimédia (1)' : 'Bibliothèques multimédia (' + s.mediaQty + ')';
        rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">' + ml + '</span><strong>\u20ac' + mediaCost.toLocaleString('de-DE') + '</strong></li>';
    }

    if (s.translate) {
        rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">Traduction (' + totalStreamHours + ' stream-h \u00d7 \u20ac' + LIVE_RATE + ')</span><strong>\u20ac' + (totalStreamHours * LIVE_RATE).toLocaleString('de-DE') + '</strong></li>';
        if (s.firstTime) {
            rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1" style="color:#059669;"><span>Déduction essai gratuit (30 min)</span><strong>\u2212 \u20ac' + (trialDeduction * LIVE_RATE).toLocaleString('de-DE') + '</strong></li>';
        }
    }
    document.getElementById('live-calc-result-breakdown').innerHTML = rows;

    // Chips
    const cs = 'background:#e9f9f7;color:#065f46;border:1px solid #2ec4b6;border-radius:2rem;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:600;';
    let ch = '<span style="' + cs + '">' + cardLabel + '</span>';
    if (s.media && s.mediaQty > 0) ch += '<span style="' + cs + '">' + (s.mediaQty > 1 ? s.mediaQty + ' bibliothèques multimédia' : '1 bibliothèque multimédia') + '</span>';
    if (s.translate) ch += '<span style="' + cs + '">' + s.guides + ' guide' + (s.guides > 1 ? 's' : '') + ' \u00b7 ' + s.hours + ' h traduction</span>';
    else ch += '<span style="' + cs + '">Sans traduction</span>';
    if (s.firstTime && s.translate) ch += '<span style="background:#dcfce7;color:#059669;border:1px solid #059669;border-radius:2rem;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:600;">Essai 30 min déduit</span>';
    document.getElementById('live-calc-summary-chips').innerHTML = ch;

    // Afficher/masquer la note de traduction
    document.getElementById('live-calc-translation-note').classList.toggle('d-none', !s.translate);
}

// ---- Demande de devis ----
function liveCalcRequestQuote() {
    const s = liveCalcState;
    const total = (document.getElementById('live-calc-result-total') || {}).textContent || '\u2014';

    let cardLine = '';
    if (s.pkg === 'pyo') cardLine = 'Print-Your-Own (' + s.pkgQty + ' codes)';
    else if (s.pkg === 'basic') cardLine = 'Basic (' + s.pkgQty + ' \u00d7 500 cartes)';
    else if (s.pkg === 'custom') cardLine = 'Custom (' + s.pkgQty.toLocaleString('fr') + ' cartes)';

    const mediaLine = (s.media && s.mediaQty > 0)
        ? 'Oui (' + (s.mediaQty > 1 ? s.mediaQty + ' bibliothèques multimédia' : '1 bibliothèque multimédia') + ')'
        : 'Non';

    let translationLine, firstTimeLine = '';
    if (s.translate) {
        translationLine = 'Oui (' + s.guides + ' guide' + (s.guides > 1 ? 's' : '') + ' \u00d7 ' + s.hours + ' h chacun)';
        firstTimeLine = '\n- Première utilisation de la traduction IA : ' + (s.firstTime ? 'Oui (30 min d\'essai à déduire)' : 'Non');
    } else {
        translationLine = 'Non';
    }

    const subject = 'Demande de devis \u2013 Nubart LIVE (est. ' + total + ')';
    const body = 'Bonjour,\n\nJ\'ai utilisé le calculateur de coûts sur votre site et je souhaite recevoir un devis officiel pour Nubart LIVE :\n\n- Forfait de cartes : ' + cardLine + '\n- Bibliothèque multimédia : ' + mediaLine + '\n- Traduction IA : ' + translationLine + firstTimeLine + '\n- Total estimé (calculateur) : ' + total + ' HT\n\nMerci de m\'envoyer un devis officiel au nom de mon entreprise.\n\n[Ajoutez ici votre nom, le nom de votre entreprise et votre numéro de TVA]\n\nCordialement';

    const mailtoLink = 'mailto:info@nubart.eu?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    document.getElementById('live-calc-quote-subject').textContent = subject;
    document.getElementById('live-calc-quote-body').textContent = body;
    document.getElementById('live-calc-quote-mailto').href = mailtoLink;

    const copyBtn = document.getElementById('live-calc-quote-copy');
    copyBtn.onclick = function() {
        const fullText = 'À : info@nubart.eu\nObjet : ' + subject + '\n\n' + body;
        navigator.clipboard.writeText(fullText).then(function() {
            var btn = document.getElementById('live-calc-quote-copy');
            var original = btn.textContent;
            var copiedText = btn.getAttribute('data-copied-text') || '\u2713 Copié\u00a0!';
            btn.textContent = copiedText;
            btn.classList.add('btn-success');
            btn.classList.remove('btn-outline-secondary');
            setTimeout(function() {
                btn.textContent = original;
                btn.classList.remove('btn-success');
                btn.classList.add('btn-outline-secondary');
            }, 2500);
        });
    };

    document.getElementById('live-calc-quote-panel').classList.remove('d-none');
    document.getElementById('live-calc-quote-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function liveCalcCloseQuotePanel() {
    document.getElementById('live-calc-quote-panel').classList.add('d-none');
}
