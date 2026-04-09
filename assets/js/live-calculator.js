// ---- Nubart LIVE Cost Calculator ----
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

// ---- Step 1: Card package ----
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
            hint.textContent = 'The minimum order for Custom cards is 3,000.';
            hint.style.color = '#dc3545';
            el.classList.add('is-invalid'); return;
        }
        if (qty % 1000 !== 0) {
            hint.textContent = 'Please enter a multiple of 1,000 (e.g. 3000, 4000, 5000…).';
            hint.style.color = '#dc3545';
            el.classList.add('is-invalid'); return;
        }
        if (qty > 10000) {
            hint.innerHTML = 'For orders above 10,000 cards, please <a href="../contact.html">contact our sales team</a> for a custom quote.';
            hint.style.color = '#0d6efd';
            el.classList.remove('is-invalid'); return;
        }
        hint.textContent = '';
        el.classList.remove('is-invalid');
        liveCalcState.pkgQty = qty;
    }
    liveCalcGoToStep(2);
}

// ---- Step 2: Media Library ----
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

// ---- Step 3: AI Translation ----
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

// ---- Step 4: Compute & render ----
function liveCalcCompute() {
    const s = liveCalcState;

    let cardCost = 0, cardLabel = '';
    if (s.pkg === 'pyo') {
        cardCost = LIVE_PYO_SETUP + (s.pkgQty * LIVE_PYO_PER_CODE);
        cardLabel = 'Print-Your-Own (setup fee + ' + s.pkgQty + ' codes)';
    } else if (s.pkg === 'basic') {
        cardCost = s.pkgQty * LIVE_BASIC_PRICE;
        cardLabel = s.pkgQty === 1 ? 'Basic (500 cards)' : 'Basic (' + s.pkgQty + ' \u00d7 500 cards)';
    } else if (s.pkg === 'custom') {
        cardCost = liveCustomPrice(s.pkgQty) || 0;
        cardLabel = 'Custom (' + s.pkgQty.toLocaleString('en') + ' cards)';
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

    // Breakdown
    let rows = '';
    rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">' + cardLabel + '</span><strong>\u20ac' + cardCost.toLocaleString('de-DE') + '</strong></li>';

    if (s.media && s.mediaQty > 0) {
        const ml = s.mediaQty === 1 ? 'Media library (1)' : 'Media libraries (' + s.mediaQty + ')';
        rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">' + ml + '</span><strong>\u20ac' + mediaCost.toLocaleString('de-DE') + '</strong></li>';
    }

    if (s.translate) {
        rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1"><span class="text-muted">Translation (' + totalStreamHours + ' stream-h \u00d7 \u20ac' + LIVE_RATE + ')</span><strong>\u20ac' + (totalStreamHours * LIVE_RATE).toLocaleString('de-DE') + '</strong></li>';
        if (s.firstTime) {
            rows += '<li class="d-flex justify-content-between border-bottom pb-1 mb-1" style="color:#059669;"><span>Free trial deduction (30 min)</span><strong>\u2212 \u20ac' + (trialDeduction * LIVE_RATE).toLocaleString('de-DE') + '</strong></li>';
        }
    }
    document.getElementById('live-calc-result-breakdown').innerHTML = rows;

    // Chips
    const cs = 'background:#e9f9f7;color:#065f46;border:1px solid #2ec4b6;border-radius:2rem;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:600;';
    let ch = '<span style="' + cs + '">' + cardLabel + '</span>';
    if (s.media && s.mediaQty > 0) ch += '<span style="' + cs + '">' + s.mediaQty + ' media librar' + (s.mediaQty > 1 ? 'ies' : 'y') + '</span>';
    if (s.translate) ch += '<span style="' + cs + '">' + s.guides + ' guide' + (s.guides > 1 ? 's' : '') + ' \u00b7 ' + s.hours + ' h translation</span>';
    else ch += '<span style="' + cs + '">No translation</span>';
    if (s.firstTime && s.translate) ch += '<span style="background:#dcfce7;color:#059669;border:1px solid #059669;border-radius:2rem;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:600;">30-min trial deducted</span>';
    document.getElementById('live-calc-summary-chips').innerHTML = ch;

    // Show/hide translation note
    document.getElementById('live-calc-translation-note').classList.toggle('d-none', !s.translate);
}

// ---- Quote request ----
function liveCalcRequestQuote() {
    const s = liveCalcState;
    const total = (document.getElementById('live-calc-result-total') || {}).textContent || '\u2014';

    let details = [];
    if (s.pkg === 'pyo') details.push('Print-Your-Own: ' + s.pkgQty + ' codes');
    else if (s.pkg === 'basic') details.push('Basic: ' + s.pkgQty + ' \u00d7 500 cards');
    else if (s.pkg === 'custom') details.push('Custom: ' + s.pkgQty.toLocaleString('en') + ' cards');
    if (s.media && s.mediaQty > 0) details.push(s.mediaQty + ' media librar' + (s.mediaQty > 1 ? 'ies' : 'y'));
    if (s.translate) details.push('AI translation: ' + s.guides + ' guide' + (s.guides > 1 ? 's' : '') + ', ' + s.hours + ' h each');

    const config = details.join(' \u00b7 ');
    const trial = s.firstTime ? 'Yes (30-min trial to be deducted)' : 'No';
    const subject = 'Quote request \u2013 Nubart LIVE (est. ' + total + ')';
    const body = 'Hello,\n\nI used the cost calculator on your website and would like to receive an official quote for Nubart LIVE:\n\nConfiguration: ' + config + '\nFirst-time customer: ' + trial + '\nEstimated total (calculator): ' + total + ' excl. VAT\n\nPlease send me an official quote addressed to my company.\n\n[Please add your name, company name, and VAT number here]\n\nThank you';

    const mailtoLink = 'mailto:info@nubart.eu?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    document.getElementById('live-calc-quote-subject').textContent = subject;
    document.getElementById('live-calc-quote-body').textContent = body;
    document.getElementById('live-calc-quote-mailto').href = mailtoLink;

    const copyBtn = document.getElementById('live-calc-quote-copy');
    copyBtn.onclick = function() {
        const fullText = 'To: info@nubart.eu\nSubject: ' + subject + '\n\n' + body;
        navigator.clipboard.writeText(fullText).then(function() {
            var btn = document.getElementById('live-calc-quote-copy');
            var original = btn.textContent;
            var copiedText = btn.getAttribute('data-copied-text') || '\u2713 Copied!';
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
