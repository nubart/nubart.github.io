// ---- Nubart LIVE Cost Calculator — DE ----
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

// ---- Schritt 1: Kartenpaket ----
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
            hint.textContent = 'Der Mindestauftrag für Custom-Karten beträgt 3.000.';
            hint.style.color = '#dc3545';
            el.classList.add('is-invalid'); return;
        }
        if (qty % 1000 !== 0) {
            hint.textContent = 'Bitte geben Sie ein Vielfaches von 1.000 ein (z.\u00a0B. 3000, 4000, 5000\u2026).';
            hint.style.color = '#dc3545';
            el.classList.add('is-invalid'); return;
        }
        if (qty > 10000) {
            hint.innerHTML = 'Für Bestellungen über 10.000 Karten wenden Sie sich bitte an <a href="../../contact.html">unser Vertriebsteam</a> für ein individuelles Angebot.';
            hint.style.color = '#0d6efd';
            el.classList.remove('is-invalid'); return;
        }
        hint.textContent = '';
        el.classList.remove('is-invalid');
        liveCalcState.pkgQty = qty;
    }
    liveCalcGoToStep(2);
}

// ---- Schritt 2: Mediathek ----
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

// ---- Schritt 3: KI-Übersetzung ----
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

// ---- Schritt 4: Berechnung & Ergebnis ----
function liveCalcCompute() {
    const s = liveCalcState;

    let cardCost = 0, cardLabel = '';
    if (s.pkg === 'pyo') {
        cardCost = LIVE_PYO_SETUP + (s.pkgQty * LIVE_PYO_PER_CODE);
        cardLabel = 'Print-Your-Own (Einrichtungsgebühr + ' + s.pkgQty + ' Codes)';
    } else if (s.pkg === 'basic') {
        cardCost = s.pkgQty * LIVE_BASIC_PRICE;
        cardLabel = s.pkgQty === 1 ? 'Basic (500 Karten)' : 'Basic (' + s.pkgQty + ' \u00d7 500 Karten)';
    } else if (s.pkg === 'custom') {
        cardCost = liveCustomPrice(s.pkgQty) || 0;
        cardLabel = 'Custom (' + s.pkgQty.toLocaleString('de') + ' Karten)';
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

    // Kostenaufstellung
    let rows = '';
    rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">' + cardLabel + '</span><strong>\u20ac' + cardCost.toLocaleString('de-DE') + '</strong></li>';

    if (s.media && s.mediaQty > 0) {
        const ml = s.mediaQty === 1 ? 'Mediathek (1)' : 'Mediatheken (' + s.mediaQty + ')';
        rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">' + ml + '</span><strong>\u20ac' + mediaCost.toLocaleString('de-DE') + '</strong></li>';
    }

    if (s.translate) {
        rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">Übersetzung (' + totalStreamHours + ' stream-h \u00d7 \u20ac' + LIVE_RATE + ')</span><strong>\u20ac' + (totalStreamHours * LIVE_RATE).toLocaleString('de-DE') + '</strong></li>';
        if (s.firstTime) {
            rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1" style="color:#059669;"><span>Testabzug (30 Min.)</span><strong>\u2212 \u20ac' + (trialDeduction * LIVE_RATE).toLocaleString('de-DE') + '</strong></li>';
        }
    }
    document.getElementById('live-calc-result-breakdown').innerHTML = rows;

    // Chips
    const cs = 'background:#e9f9f7;color:#065f46;border:1px solid #2ec4b6;border-radius:2rem;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:600;';
    let ch = '<span style="' + cs + '">' + cardLabel + '</span>';
    if (s.media && s.mediaQty > 0) ch += '<span style="' + cs + '">' + (s.mediaQty > 1 ? s.mediaQty + ' Mediatheken' : '1 Mediathek') + '</span>';
    if (s.translate) ch += '<span style="' + cs + '">' + s.guides + ' Guide' + (s.guides > 1 ? 's' : '') + ' \u00b7 ' + s.hours + ' h Übersetzung</span>';
    else ch += '<span style="' + cs + '">Keine Übersetzung</span>';
    if (s.firstTime && s.translate) ch += '<span style="background:#dcfce7;color:#059669;border:1px solid #059669;border-radius:2rem;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:600;">30-Min.-Test abgezogen</span>';
    document.getElementById('live-calc-summary-chips').innerHTML = ch;

    // Übersetzungshinweis ein-/ausblenden
    document.getElementById('live-calc-translation-note').classList.toggle('d-none', !s.translate);
}

// ---- Angebotsanfrage ----
function liveCalcRequestQuote() {
    const s = liveCalcState;
    const total = (document.getElementById('live-calc-result-total') || {}).textContent || '\u2014';

    let cardLine = '';
    if (s.pkg === 'pyo') cardLine = 'Print-Your-Own (' + s.pkgQty + ' Codes)';
    else if (s.pkg === 'basic') cardLine = 'Basic (' + s.pkgQty + ' \u00d7 500 Karten)';
    else if (s.pkg === 'custom') cardLine = 'Custom (' + s.pkgQty.toLocaleString('de') + ' Karten)';

    const mediaLine = (s.media && s.mediaQty > 0)
        ? 'Ja (' + (s.mediaQty > 1 ? s.mediaQty + ' Mediatheken' : '1 Mediathek') + ')'
        : 'Nein';

    let translationLine, firstTimeLine = '';
    if (s.translate) {
        translationLine = 'Ja (' + s.guides + ' Guide' + (s.guides > 1 ? 's' : '') + ' \u00d7 ' + s.hours + ' h je Guide)';
        firstTimeLine = '\n- Erstmalige Nutzung der KI-Übersetzung: ' + (s.firstTime ? 'Ja (30 Min. Test werden abgezogen)' : 'Nein');
    } else {
        translationLine = 'Nein';
    }

    const subject = 'Angebotsanfrage \u2013 Nubart LIVE (ca. ' + total + ')';
    const body = 'Sehr geehrte Damen und Herren,\n\nich habe den Kostenkalkulator auf Ihrer Website verwendet und möchte ein offizielles Angebot für Nubart LIVE erhalten:\n\n- Kartenpaket: ' + cardLine + '\n- Mediathek: ' + mediaLine + '\n- KI-Übersetzung: ' + translationLine + firstTimeLine + '\n- Geschätzter Gesamtbetrag (Kalkulator): ' + total + ' zzgl. MwSt.\n\nBitte senden Sie mir ein offizielles Angebot auf meinen Firmennamen.\n\n[Bitte Name, Firmenname und USt-IdNr. hier eintragen]\n\nMit freundlichen Grüßen';

    const mailtoLink = 'mailto:info@nubart.eu?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    document.getElementById('live-calc-quote-subject').textContent = subject;
    document.getElementById('live-calc-quote-body').textContent = body;
    document.getElementById('live-calc-quote-mailto').href = mailtoLink;

    const copyBtn = document.getElementById('live-calc-quote-copy');
    copyBtn.onclick = function() {
        const fullText = 'An: info@nubart.eu\nBetreff: ' + subject + '\n\n' + body;
        navigator.clipboard.writeText(fullText).then(function() {
            var btn = document.getElementById('live-calc-quote-copy');
            var original = btn.textContent;
            var copiedText = btn.getAttribute('data-copied-text') || '\u2713 Kopiert!';
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
