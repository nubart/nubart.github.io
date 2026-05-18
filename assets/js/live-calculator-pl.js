// ---- Nubart LIVE Cost Calculator — PL ----
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

// ---- Krok 1: Pakiet kart ----
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
            hint.textContent = 'Minimalne zamówienie dla kart Custom wynosi 3\u00a0000.';
            hint.style.color = '#dc3545';
            el.classList.add('is-invalid'); return;
        }
        if (qty % 1000 !== 0) {
            hint.textContent = 'Wpisz wielokrotność 1\u00a0000 (np. 3000, 4000, 5000\u2026).';
            hint.style.color = '#dc3545';
            el.classList.add('is-invalid'); return;
        }
        if (qty > 10000) {
            hint.innerHTML = 'Przy zamówieniach powyżej 10\u00a0000 kart <a href="../../contact.html">skontaktuj się z naszym zespołem sprzedaży</a>, aby uzyskać indywidualną wycenę.';
            hint.style.color = '#0d6efd';
            el.classList.remove('is-invalid'); return;
        }
        hint.textContent = '';
        el.classList.remove('is-invalid');
        liveCalcState.pkgQty = qty;
    }
    liveCalcGoToStep(2);
}

// ---- Krok 2: Biblioteka multimediów ----
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

// ---- Krok 3: Tłumaczenie AI ----
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

// ---- Krok 4: Obliczenie i wynik ----
function liveCalcCompute() {
    const s = liveCalcState;

    let cardCost = 0, cardLabel = '';
    if (s.pkg === 'pyo') {
        cardCost = LIVE_PYO_SETUP + (s.pkgQty * LIVE_PYO_PER_CODE);
        cardLabel = 'Print-Your-Own (opłata konfiguracyjna + ' + s.pkgQty + ' kodów)';
    } else if (s.pkg === 'basic') {
        cardCost = s.pkgQty * LIVE_BASIC_PRICE;
        cardLabel = s.pkgQty === 1 ? 'Basic (500 kart)' : 'Basic (' + s.pkgQty + ' \u00d7 500 kart)';
    } else if (s.pkg === 'custom') {
        cardCost = liveCustomPrice(s.pkgQty) || 0;
        cardLabel = 'Custom (' + s.pkgQty.toLocaleString('pl') + ' kart)';
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

    // Zestawienie
    let rows = '';
    rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">' + cardLabel + '</span><strong>\u20ac' + cardCost.toLocaleString('de-DE') + '</strong></li>';

    if (s.media && s.mediaQty > 0) {
        const ml = s.mediaQty === 1 ? 'Biblioteka multimediów (1)' : 'Biblioteki multimediów (' + s.mediaQty + ')';
        rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">' + ml + '</span><strong>\u20ac' + mediaCost.toLocaleString('de-DE') + '</strong></li>';
    }

    if (s.translate) {
        rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">Tłumaczenie (' + totalStreamHours + ' stream-h \u00d7 \u20ac' + LIVE_RATE + ')</span><strong>\u20ac' + (totalStreamHours * LIVE_RATE).toLocaleString('de-DE') + '</strong></li>';
        if (s.firstTime) {
            rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1" style="color:#059669;"><span>Odliczenie okresu próbnego (30 min)</span><strong>\u2212 \u20ac' + (trialDeduction * LIVE_RATE).toLocaleString('de-DE') + '</strong></li>';
        }
    }
    document.getElementById('live-calc-result-breakdown').innerHTML = rows;

    // Chipy
    const cs = 'background:#e9f9f7;color:#065f46;border:1px solid #2ec4b6;border-radius:2rem;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:600;';
    let ch = '<span style="' + cs + '">' + cardLabel + '</span>';
    if (s.media && s.mediaQty > 0) ch += '<span style="' + cs + '">' + (s.mediaQty > 1 ? s.mediaQty + ' biblioteki multimediów' : '1 biblioteka multimediów') + '</span>';
    if (s.translate) ch += '<span style="' + cs + '">' + s.guides + ' przewodnik' + (s.guides > 1 ? 'ów' : '') + ' \u00b7 ' + s.hours + ' h tłumaczenia</span>';
    else ch += '<span style="' + cs + '">Bez tłumaczenia</span>';
    if (s.firstTime && s.translate) ch += '<span style="background:#dcfce7;color:#059669;border:1px solid #059669;border-radius:2rem;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:600;">Próba 30 min odliczona</span>';
    document.getElementById('live-calc-summary-chips').innerHTML = ch;

    // Pokaż/ukryj notatkę o tłumaczeniu
    document.getElementById('live-calc-translation-note').classList.toggle('d-none', !s.translate);
}

// ---- Zapytanie ofertowe ----
function liveCalcRequestQuote() {
    const s = liveCalcState;
    const total = (document.getElementById('live-calc-result-total') || {}).textContent || '\u2014';

    let cardLine = '';
    if (s.pkg === 'pyo') cardLine = 'Print-Your-Own (' + s.pkgQty + ' kodów)';
    else if (s.pkg === 'basic') cardLine = 'Basic (' + s.pkgQty + ' \u00d7 500 kart)';
    else if (s.pkg === 'custom') cardLine = 'Custom (' + s.pkgQty.toLocaleString('pl') + ' kart)';

    const mediaLine = (s.media && s.mediaQty > 0)
        ? 'Tak (' + (s.mediaQty > 1 ? s.mediaQty + ' biblioteki multimediów' : '1 biblioteka multimediów') + ')'
        : 'Nie';

    let translationLine, firstTimeLine = '';
    if (s.translate) {
        translationLine = 'Tak (' + s.guides + ' przewodnik' + (s.guides > 1 ? 'ów' : '') + ' \u00d7 ' + s.hours + ' h/os.)';
        firstTimeLine = '\n- Pierwsze użycie tłumaczenia AI: ' + (s.firstTime ? 'Tak (30 min okresu próbnego do odliczenia)' : 'Nie');
    } else {
        translationLine = 'Nie';
    }

    const subject = 'Zapytanie ofertowe \u2013 Nubart LIVE (szac. ' + total + ')';
    const body = 'Dzień dobry,\n\nSkorzystałem/am z kalkulatora kosztów na Waszej stronie i chciałbym/chciałabym otrzymać oficjalną ofertę dla Nubart LIVE:\n\n- Pakiet kart: ' + cardLine + '\n- Biblioteka multimediów: ' + mediaLine + '\n- Tłumaczenie AI: ' + translationLine + firstTimeLine + '\n- Szacowany koszt całkowity (kalkulator): ' + total + ' netto\n\nProszę o przesłanie oficjalnej oferty wystawionej na moją firmę.\n\n[Proszę podać imię i nazwisko, nazwę firmy oraz numer NIP]\n\nPozdrawiam';

    const mailtoLink = 'mailto:info@nubart.eu?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    document.getElementById('live-calc-quote-subject').textContent = subject;
    document.getElementById('live-calc-quote-body').textContent = body;
    document.getElementById('live-calc-quote-mailto').href = mailtoLink;

    const copyBtn = document.getElementById('live-calc-quote-copy');
    copyBtn.onclick = function() {
        const fullText = 'Do: info@nubart.eu\nTemat: ' + subject + '\n\n' + body;
        navigator.clipboard.writeText(fullText).then(function() {
            var btn = document.getElementById('live-calc-quote-copy');
            var original = btn.textContent;
            var copiedText = btn.getAttribute('data-copied-text') || '\u2713 Skopiowano!';
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
