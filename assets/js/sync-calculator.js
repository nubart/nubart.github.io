/* ============================================
   Nubart SYNC Cost Calculator
   Used by: sync/index.html (and localized versions)
   Depends on: window.SYNC_CALC_I18N (defined inline per page)
   ============================================ */

const PRICING = {
    setupFee: 1500,
    monthlyBase: 199,
    monthlyExtra: 25,
    yearlyBase: 2199,
    yearlyExtra: 275,
    minMonths: 5
};

const calcState = {
    videos: null,
    exhibitionType: null, // 'temporary' | 'permanent'
    months: null,          // set when exhibitionType === 'temporary'
    billing: null,         // 'monthly' | 'yearly', set when exhibitionType === 'permanent'
    pwa: null              // true | false
};

function fmt(n) {
    n = Math.round(n * 100) / 100;
    const hasCents = Math.abs(n % 1) > 0.001;
    const locale = (window.SYNC_CALC_I18N && window.SYNC_CALC_I18N.locale) || 'en-IE';
    const formatted = n.toLocaleString(locale, {
        minimumFractionDigits: hasCents ? 2 : 0,
        maximumFractionDigits: 2,
        useGrouping: 'always'
    });
    return formatted + ' €';
}

function calcGoToStep(n) {
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById('calc-step-' + i);
        if (el) el.classList.toggle('d-none', i !== n);
    }
    const panel = document.getElementById('calc-quote-panel');
    if (panel) panel.classList.add('d-none');
}

// ---- Whole-number validation: counts such as cards, guides or videos can't be fractional ----
function calcWholeError(el, show) {
    let fb = document.getElementById(el.id + '-whole-error');
    if (!fb) {
        fb = document.createElement('div');
        fb.id = el.id + '-whole-error';
        fb.className = 'invalid-feedback';
        el.insertAdjacentElement('afterend', fb);
    }
    if (show) {
        fb.textContent = ((window.SYNC_CALC_I18N && window.SYNC_CALC_I18N.wholeNumberError) || 'Only whole numbers can be entered (no decimals).');
        el.classList.add('is-invalid');
        el.setAttribute('aria-describedby', fb.id);
    } else {
        fb.textContent = '';
        el.removeAttribute('aria-describedby');
    }
}

// Returns an integer, NaN if empty, or null if not a whole number (error shown).
function calcReadWhole(el) {
    const raw = String(el.value).trim();
    if (el.validity && el.validity.badInput) { calcWholeError(el, true); return null; }
    if (raw === '') { calcWholeError(el, false); return NaN; }
    if (!/^\d+$/.test(raw)) { calcWholeError(el, true); return null; }
    calcWholeError(el, false);
    return parseInt(raw, 10);
}

function calcAttachWholeGuard(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute('inputmode', 'numeric');
    el.addEventListener('keydown', function (e) {
        if (['.', ',', 'e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
            calcWholeError(el, true);
        }
    });
    el.addEventListener('input', function () {
        const v = calcReadWhole(el);
        if (v !== null) el.classList.remove('is-invalid');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    ['calc-videos', 'calc-months'].forEach(calcAttachWholeGuard);
});

function calcStep1Next() {
    const input = document.getElementById('calc-videos');
    const val = calcReadWhole(input);
    if (!val || val < 1) {
        input.classList.add('is-invalid');
        return;
    }
    input.classList.remove('is-invalid');
    calcState.videos = val;
    calcGoToStep(2);
}

function calcSetExhibitionType(type) {
    calcState.exhibitionType = type;

    const tempBtn = document.getElementById('btn-type-temp');
    const permBtn = document.getElementById('btn-type-perm');
    tempBtn.classList.toggle('btn-primary', type === 'temporary');
    tempBtn.classList.toggle('btn-outline-secondary', type !== 'temporary');
    permBtn.classList.toggle('btn-primary', type === 'permanent');
    permBtn.classList.toggle('btn-outline-secondary', type !== 'permanent');

    document.getElementById('calc-temp-form').classList.toggle('d-none', type !== 'temporary');
    document.getElementById('calc-perm-form').classList.toggle('d-none', type !== 'permanent');
    document.getElementById('calc-step2-warning').classList.add('d-none');
}

function calcCheckMinMonths() {
    const input = document.getElementById('calc-months');
    const warning = document.getElementById('calc-months-warning');
    const val = calcReadWhole(input);
    warning.classList.toggle('d-none', !(val && val < PRICING.minMonths));
}

function calcSetBilling(billing) {
    calcState.billing = billing;

    const monthlyBtn = document.getElementById('btn-billing-monthly');
    const yearlyBtn = document.getElementById('btn-billing-yearly');
    monthlyBtn.classList.toggle('btn-primary', billing === 'monthly');
    monthlyBtn.classList.toggle('btn-outline-secondary', billing !== 'monthly');
    yearlyBtn.classList.toggle('btn-primary', billing === 'yearly');
    yearlyBtn.classList.toggle('btn-outline-secondary', billing !== 'yearly');

    document.getElementById('calc-step2-warning').classList.add('d-none');
}

function calcStep2Next() {
    const warning = document.getElementById('calc-step2-warning');

    if (calcState.exhibitionType === 'temporary') {
        const input = document.getElementById('calc-months');
        const val = calcReadWhole(input);
        if (!val) {
            warning.classList.remove('d-none');
            return;
        }
        calcState.months = Math.max(val, PRICING.minMonths);
        calcGoToStep(3);
    } else if (calcState.exhibitionType === 'permanent') {
        if (!calcState.billing) {
            warning.classList.remove('d-none');
            return;
        }
        calcGoToStep(3);
    } else {
        warning.classList.remove('d-none');
    }
}

function calcSetPwa(value) {
    calcState.pwa = value;

    const yesBtn = document.getElementById('btn-pwa-yes');
    const noBtn = document.getElementById('btn-pwa-no');
    yesBtn.classList.toggle('btn-primary', value === true);
    yesBtn.classList.toggle('btn-outline-secondary', value !== true);
    noBtn.classList.toggle('btn-primary', value === false);
    noBtn.classList.toggle('btn-outline-secondary', value !== false);

    document.getElementById('calc-pwa-warning').classList.add('d-none');
}

function calcStep3Next() {
    if (calcState.pwa === null) {
        document.getElementById('calc-pwa-warning').classList.remove('d-none');
        return;
    }
    calcRender();
    calcGoToStep(4);
}

function calcCompute() {
    const I = window.SYNC_CALC_I18N.ui;
    const discount = calcState.pwa ? 0.5 : 0;
    const extraVideos = Math.max(0, calcState.videos - 5);

    const setupFee = PRICING.setupFee * (1 - discount);
    const breakdown = [];
    const chips = [I.chipVideos(calcState.videos)];
    let recurring, recurringLabel;

    function addUsageBreakdown(base, extraUnit, periodSuffix) {
        breakdown.push(I.baseFee(fmt(base) + periodSuffix));
        if (extraVideos > 0) {
            breakdown.push(I.extraVideos(extraVideos, fmt(extraUnit) + periodSuffix));
        }
    }

    if (calcState.exhibitionType === 'temporary') {
        const base = PRICING.monthlyBase * (1 - discount);
        const extraUnit = PRICING.monthlyExtra * (1 - discount);
        const monthlyRecurring = base + extraVideos * extraUnit;
        recurring = monthlyRecurring * calcState.months;
        recurringLabel = I.recurringTemp(calcState.months);
        chips.push(I.chipTemp(calcState.months));
        addUsageBreakdown(base, extraUnit, I.perMonthSuffix);
        breakdown.push(I.monthsLine(calcState.months));
    } else if (calcState.billing === 'monthly') {
        const base = PRICING.monthlyBase * (1 - discount);
        const extraUnit = PRICING.monthlyExtra * (1 - discount);
        recurring = base + extraVideos * extraUnit;
        recurringLabel = I.recurringMonthly;
        chips.push(I.chipPermMonthly);
        addUsageBreakdown(base, extraUnit, I.perMonthSuffix);
    } else {
        const base = PRICING.yearlyBase * (1 - discount);
        const extraUnit = PRICING.yearlyExtra * (1 - discount);
        recurring = base + extraVideos * extraUnit;
        recurringLabel = I.recurringYearly;
        chips.push(I.chipPermYearly);
        addUsageBreakdown(base, extraUnit, I.perYearSuffix);
    }

    if (calcState.pwa) {
        chips.push(I.chipPwa);
        breakdown.push(I.discountLine);
    }

    return { setupFee, recurring, recurringLabel, breakdown, chips };
}

function calcRender() {
    const r = calcCompute();

    document.getElementById('calc-result-setup').textContent = fmt(r.setupFee);
    document.getElementById('calc-result-recurring').textContent = fmt(r.recurring);
    document.getElementById('calc-result-recurring-label').textContent = r.recurringLabel;

    const chipWrap = document.getElementById('calc-summary-chips');
    chipWrap.innerHTML = r.chips.map(c =>
        `<span class="badge rounded-pill" style="background:#e6f7f6; color:#028a8c; font-weight:500; padding:0.5em 0.9em;">${c}</span>`
    ).join('');

    const list = document.getElementById('calc-result-breakdown');
    list.innerHTML = r.breakdown.map(b => `<li class="mb-1">${b}</li>`).join('');
}

function calcRequestQuote() {
    const r = calcCompute();
    const I = window.SYNC_CALC_I18N;
    const D = I.details;

    let details = D.videosLine(calcState.videos) + '\n';
    if (calcState.exhibitionType === 'temporary') {
        details += D.typeTempLine(calcState.months) + '\n';
    } else {
        const billingLabel = calcState.billing === 'monthly' ? D.billingMonthly : D.billingYearly;
        details += D.typePermLine(billingLabel) + '\n';
    }
    details += D.pwaLine(calcState.pwa ? D.yes : D.no) + '\n';
    details += D.setupLine(fmt(r.setupFee)) + '\n';
    details += D.recurringLine(r.recurringLabel, fmt(r.recurring)) + '\n';

    const totalLabel = `${fmt(r.setupFee)} + ${fmt(r.recurring)} (${r.recurringLabel})`;

    const subject = I.subject(totalLabel);
    const body = I.body(details, totalLabel);

    document.getElementById('calc-quote-subject').textContent = subject;
    document.getElementById('calc-quote-body').value = body;

    const mailto = document.getElementById('calc-quote-mailto');
    mailto.href = `mailto:info@nubart.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    document.getElementById('calc-quote-panel').classList.remove('d-none');
    document.getElementById('calc-quote-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function calcCloseQuotePanel() {
    document.getElementById('calc-quote-panel').classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', function () {
    const copyBtn = document.getElementById('calc-quote-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            const textarea = document.getElementById('calc-quote-body');
            textarea.select();
            navigator.clipboard.writeText(textarea.value).then(() => {
                const original = copyBtn.innerHTML;
                copyBtn.innerHTML = copyBtn.dataset.copiedText || '✓ Copied!';
                setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
            });
        });
    }
});
