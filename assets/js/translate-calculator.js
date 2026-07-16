// ---- Nubart TRANSLATE Cost Calculator ----
const CALC_BASE = 349;
const CALC_EXTRA = 39;
const CALC_INCLUDED = 2;    // stream-hours included in base rate per event day
const CALC_TRIAL = 0.5;     // free trial deduction in hours (30 min)

// LWAC non-transferable access cards (step 4)
const CALC_PYO_SETUP    = 79;     // Print-Your-Own one-off setup fee
const CALC_PYO_PER_CODE = 1.50;   // per non-transferable code
const CALC_CUSTOM_FROM  = 3500;   // fully-branded cards, starting price
const CALC_PYO_MIN      = 50;     // minimum codes for Print-Your-Own

let calcState = {
    days: 0,
    hoursPerDay: 0,
    multiroom: false,
    rooms: [],              // [{hours}] per room
    firstTime: null,        // true/false, set in step 3
    lwac: null,             // null | 'no' | 'pyo' | 'custom', set in step 4
    lwacQty: 0              // number of PYO cards, only when lwac === 'pyo'
};

// Format a money amount, showing cents only when the value is fractional
// (PYO totals can land on a half-euro because of the €1.50 per-code price).
function calcFmt(n) {
    return n.toLocaleString('de-DE', {
        minimumFractionDigits: n % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
    });
}

function calcGoToStep(n) {
    // Null-safe: legacy pages not yet updated have no step 5.
    [1,2,3,4,5].forEach(i => {
        const el = document.getElementById('calc-step-' + i);
        if (el) el.classList.add('d-none');
    });
    const target = document.getElementById('calc-step-' + n);
    if (target) target.classList.remove('d-none');
}

function calcStep1Next() {
    const days = parseFloat(document.getElementById('calc-days').value);
    const hours = parseFloat(document.getElementById('calc-hours').value);
    const dEl = document.getElementById('calc-days');
    const hEl = document.getElementById('calc-hours');
    let ok = true;
    if (!days || days < 1) { dEl.classList.add('is-invalid'); ok = false; } else { dEl.classList.remove('is-invalid'); }
    if (!hours || hours <= 0) { hEl.classList.add('is-invalid'); ok = false; } else { hEl.classList.remove('is-invalid'); }
    if (!ok) return;
    calcState.days = days;
    calcState.hoursPerDay = hours;
    calcGoToStep(2);
}

function calcSetMultiroom(isMulti) {
    calcState.multiroom = isMulti;
    document.getElementById('btn-multiroom-no').classList.toggle('btn-primary', !isMulti);
    document.getElementById('btn-multiroom-no').classList.toggle('btn-outline-secondary', isMulti);
    document.getElementById('btn-multiroom-yes').classList.toggle('btn-primary', isMulti);
    document.getElementById('btn-multiroom-yes').classList.toggle('btn-outline-secondary', !isMulti);
    const form = document.getElementById('calc-multiroom-form');
    if (isMulti) { form.classList.remove('d-none'); } else { form.classList.add('d-none'); }
}

function calcRenderRoomTable() {
    const n = parseInt(document.getElementById('calc-room-count').value);
    const wrap = document.getElementById('calc-room-table-wrap');
    if (!n || n < 2) { wrap.innerHTML = ''; return; }
    const i18n = Object.assign({}, CALC_I18N_DEFAULT, window.CALC_I18N || {});
    let html = `<table class="table table-sm table-bordered mb-0" style="font-size:0.85rem;"><thead><tr><th>${i18n.tableRoom}</th><th>${i18n.tableHours}</th></tr></thead><tbody>`;
    for (let i = 1; i <= n; i++) {
        const prev = calcState.rooms[i-1] ? calcState.rooms[i-1].hours : calcState.hoursPerDay;
        html += `<tr><td class="align-middle fw-semibold">${i18n.roomLabel(i)}</td><td><input type="number" class="form-control form-control-sm" id="calc-room-${i}" min="0.5" step="0.5" max="24" value="${prev || ''}"></td></tr>`;
    }
    html += '</tbody></table>';
    wrap.innerHTML = html;
}

function calcStep2Next() {
    if (calcState.multiroom) {
        const n = parseInt(document.getElementById('calc-room-count').value);
        if (!n || n < 2) {
            document.getElementById('calc-room-count').classList.add('is-invalid');
            return;
        }
        document.getElementById('calc-room-count').classList.remove('is-invalid');
        calcState.rooms = [];
        let ok = true;
        for (let i = 1; i <= n; i++) {
            const el = document.getElementById('calc-room-' + i);
            const h = parseFloat(el ? el.value : '');
            if (!h || h <= 0) {
                if (el) el.classList.add('is-invalid');
                ok = false;
            } else {
                if (el) el.classList.remove('is-invalid');
                calcState.rooms.push({ hours: h });
            }
        }
        if (!ok) return;
    }
    calcGoToStep(3);
}

function calcSetFirstTime(isFirst) {
    calcState.firstTime = isFirst;
    document.getElementById('btn-firsttime-yes').classList.toggle('btn-primary', isFirst);
    document.getElementById('btn-firsttime-yes').classList.toggle('btn-outline-secondary', !isFirst);
    document.getElementById('btn-firsttime-no').classList.toggle('btn-primary', !isFirst);
    document.getElementById('btn-firsttime-no').classList.toggle('btn-outline-secondary', isFirst);
}

function calcStep3Next() {
    if (calcState.firstTime === null) {
        document.getElementById('calc-firsttime-warning').classList.remove('d-none');
        return;
    }
    document.getElementById('calc-firsttime-warning').classList.add('d-none');
    // Updated pages have the confidentiality/LWAC step (step 4) before the result
    // (step 5). Legacy pages not yet updated jump straight to the result (step 4),
    // so compute here for them.
    if (document.getElementById('btn-lwac-no')) {
        calcGoToStep(4);
    } else {
        calcCompute();
        calcGoToStep(4);
    }
}

function calcSetLwac(choice) {
    calcState.lwac = choice;
    ['no','pyo','custom'].forEach(c => {
        const btn = document.getElementById('btn-lwac-' + c);
        if (btn) {
            btn.classList.toggle('btn-primary', c === choice);
            btn.classList.toggle('btn-outline-secondary', c !== choice);
        }
    });
    const pyoForm = document.getElementById('calc-lwac-pyo-form');
    if (pyoForm) pyoForm.classList.toggle('d-none', choice !== 'pyo');
    const customNote = document.getElementById('calc-lwac-custom-note');
    if (customNote) customNote.classList.toggle('d-none', choice !== 'custom');
    const warn = document.getElementById('calc-lwac-warning');
    if (warn) warn.classList.add('d-none');
}

function calcStep4Next() {
    const choice = calcState.lwac;
    if (choice === null) {
        document.getElementById('calc-lwac-warning').classList.remove('d-none');
        return;
    }
    document.getElementById('calc-lwac-warning').classList.add('d-none');

    if (choice === 'pyo') {
        const el = document.getElementById('calc-lwac-qty');
        const qty = parseInt(el.value);
        if (!qty || qty < CALC_PYO_MIN) {
            el.classList.add('is-invalid');
            return;
        }
        el.classList.remove('is-invalid');
        calcState.lwacQty = qty;
    } else {
        calcState.lwacQty = 0;
    }

    calcCompute();
    calcGoToStep(5);
}

function calcCompute() {
    const { days, hoursPerDay, multiroom, rooms, firstTime } = calcState;
    const i18n = Object.assign({}, CALC_I18N_DEFAULT, window.CALC_I18N || {});
    const ui   = Object.assign({}, CALC_I18N_DEFAULT.ui, ((window.CALC_I18N || {}).ui) || {});

    // Base fee is FLAT per event day regardless of number of rooms/streams.
    // It includes 2 combined stream-hours per day in total (not per room).
    // Extra hours = all stream-hours above 2 per day, summed across all rooms.

    const baseFee = CALC_BASE * days;

    let totalBillableHours = 0;
    let totalExtraHours = 0;

    if (!multiroom) {
        const h = Math.ceil(hoursPerDay);
        totalBillableHours = h * days;
        totalExtraHours = Math.max(0, h - CALC_INCLUDED) * days;
    } else {
        rooms.forEach(r => {
            totalBillableHours += Math.ceil(r.hours) * days;
        });
        const streamHoursPerDay = rooms.reduce((sum, r) => sum + Math.ceil(r.hours), 0);
        totalExtraHours = Math.max(0, streamHoursPerDay - CALC_INCLUDED) * days;
    }

    // First-time customers: deduct the 30-min free trial from extra hours only
    // (trial minutes come off the top of billable usage, which eats into extra hours first)
    const trialDeduction = firstTime ? CALC_TRIAL : 0;
    const extraHoursAfterTrial = Math.max(0, totalExtraHours - trialDeduction);

    const extraFee = extraHoursAfterTrial * CALC_EXTRA;

    // LWAC non-transferable access cards
    let lwacCost = 0;
    let lwacLabel = '';
    if (calcState.lwac === 'pyo') {
        lwacCost = CALC_PYO_SETUP + (calcState.lwacQty * CALC_PYO_PER_CODE);
        lwacLabel = ui.lwacPyoLabel(calcState.lwacQty);
    } else if (calcState.lwac === 'custom') {
        lwacCost = CALC_CUSTOM_FROM;
        lwacLabel = ui.lwacCustomLabel;
    }

    const total = baseFee + extraFee + lwacCost;

    // Render total
    document.getElementById('calc-result-total').textContent = '€' + calcFmt(total);

    // Render breakdown
    const bd = document.getElementById('calc-result-breakdown');
    const trialRow = firstTime ? `
        <li class="d-flex justify-content-between border-bottom pb-1 mb-1" style="color: #059669;">
            <span>${ui.trialRow}</span>
            <strong>− €${(trialDeduction * CALC_EXTRA).toLocaleString('de-DE')}</strong>
        </li>` : '';

    const lwacRow = (calcState.lwac === 'pyo' || calcState.lwac === 'custom') ? `
        <li class="d-flex justify-content-between border-bottom pb-1 mb-1">
            <span class="text-muted">${lwacLabel}${calcState.lwac === 'custom' ? ' ⚠ ' + ui.lwacLeadTime : ''}</span>
            <strong>€${calcFmt(lwacCost)}</strong>
        </li>` : '';

    bd.innerHTML = `
        <li class="d-flex justify-content-between border-bottom pb-1 mb-1">
            <span class="text-muted">${ui.baseFee(days)}</span>
            <strong>€${baseFee.toLocaleString('de-DE')}</strong>
        </li>
        <li class="d-flex justify-content-between border-bottom pb-1 mb-1">
            <span class="text-muted">${ui.extraHours(totalExtraHours)}</span>
            <strong>${totalExtraHours > 0 ? '€'+(totalExtraHours * CALC_EXTRA).toLocaleString('de-DE') : '—'}</strong>
        </li>
        ${trialRow}
        ${lwacRow}
        <li class="d-flex justify-content-between">
            <span class="text-muted">${ui.totalHours}</span>
            <strong>${totalBillableHours} h</strong>
        </li>`;

    // Render summary chips
    const chips = document.getElementById('calc-summary-chips');
    const chipStyle = 'background:#e9f9f7; color:#065f46; border:1px solid #2ec4b6; border-radius:2rem; padding:0.25rem 0.75rem; font-size:0.78rem; font-weight:600;';
    chips.innerHTML = `
        <span style="${chipStyle}">${ui.chipDays(days)}</span>
        ${!multiroom
            ? `<span style="${chipStyle}">${ui.chipRoom(hoursPerDay)}</span>`
            : rooms.map((r,idx) => `<span style="${chipStyle}">${i18n.roomLabel(idx+1)}: ${r.hours} h/day</span>`).join('')
        }
        ${firstTime ? `<span style="background:#dcfce7; color:#059669; border:1px solid #059669; border-radius:2rem; padding:0.25rem 0.75rem; font-size:0.78rem; font-weight:600;">${ui.trialChip}</span>` : ''}
        ${calcState.lwac === 'pyo' ? `<span style="${chipStyle}">${ui.lwacPyoChip(calcState.lwacQty)}</span>` : ''}
        ${calcState.lwac === 'custom' ? `<span style="background:#fef3c7; color:#92400e; border:1px solid #f59e0b; border-radius:2rem; padding:0.25rem 0.75rem; font-size:0.78rem; font-weight:600;">${ui.lwacCustomChip}</span>` : ''}`;
}

// Default English strings — override per page via window.CALC_I18N
const CALC_I18N_DEFAULT = {
    email:        'info@nubart.eu',
    subject:      (days, total) => `Quote request – Nubart TRANSLATE event (${days} day${days>1?'s':''}, est. ${total})`,
    roomLabel:    (i)           => `Room ${i}`,
    roomSuffix:   (n)           => `${n} simultaneous rooms`,
    tableRoom:    'Room',
    tableHours:   'Hours of active use per day',
    trialYes:     'Yes (30-min trial to be deducted)',
    trialNo:      'No',
    lwacNo:       'No (standard QR code)',
    lwacPyo:      (qty) => `Print-Your-Own non-transferable cards (${qty} codes)`,
    lwacCustom:   'Fully branded non-transferable cards (from €3,500, 30-day lead time)',
    body:         (eventDetails, trial, total, accessControl) =>
`Hello,

I used the cost calculator for Nubart TRANSLATE on your website and would like to receive an official quote for the following event:

Event details: ${eventDetails}
First-time customer: ${trial}
Access control: ${accessControl}
Estimated total (calculator): ${total} excl. VAT

Please send me an official quote addressed to my company.

[Please add your name, company name, and VAT number here]

Thank you`,
    ui: {
        baseFee:        (days) => `Base fee (${days} day${days>1?'s':''}, incl. 2 h/day)`,
        extraHours:     (h)    => `Extra hours (${h} h × €${CALC_EXTRA})`,
        totalHours:     'Total stream-hours billed',
        trialRow:       'Free trial deduction (30 min)',
        chipDays:       (days) => `${days} event day${days>1?'s':''}`,
        chipRoom:       (h)    => `${h} h/day · 1 room`,
        trialChip:      '30-min trial deducted',
        lwacPyoLabel:   (qty) => `Print-Your-Own cards (${qty} codes)`,
        lwacCustomLabel: 'Fully branded cards (from €3,500)',
        lwacLeadTime:   '30-day lead time',
        lwacPyoChip:    (qty) => `${qty} PYO cards`,
        lwacCustomChip: 'Branded cards · 30-day lead time'
    }
};

function calcRequestQuote() {
    const { days, hoursPerDay, multiroom, rooms, firstTime } = calcState;
    const i18n = Object.assign({}, CALC_I18N_DEFAULT, window.CALC_I18N || {});

    const totalEl = document.getElementById('calc-result-total');
    const total = totalEl ? totalEl.textContent : '—';

    let eventDetails;
    if (!multiroom) {
        eventDetails = `${days} day${days>1?'s':''}, ${hoursPerDay} h/day, 1 room`;
    } else {
        const roomList = rooms.map((r,i) => `${i18n.roomLabel(i+1)}: ${r.hours} h/day`).join(' | ');
        eventDetails = `${days} day${days>1?'s':''}, ${i18n.roomSuffix(rooms.length)} (${roomList})`;
    }

    const trial = firstTime ? i18n.trialYes : i18n.trialNo;

    const accessControl = calcState.lwac === 'pyo'
        ? i18n.lwacPyo(calcState.lwacQty)
        : calcState.lwac === 'custom'
            ? i18n.lwacCustom
            : i18n.lwacNo;

    const subject = i18n.subject(days, total);
    const body    = i18n.body(eventDetails, trial, total, accessControl);

    const mailtoLink = `mailto:${i18n.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Populate the fallback panel
    document.getElementById('calc-quote-subject').textContent = subject;
    document.getElementById('calc-quote-body').textContent = body;
    document.getElementById('calc-quote-mailto').href = mailtoLink;
    const toEl = document.getElementById('calc-quote-to');
    if (toEl) toEl.textContent = i18n.email;

    // Clipboard copy — reads feedback text from data-copied-text attribute (language-agnostic)
    const copyBtn = document.getElementById('calc-quote-copy');
    copyBtn.onclick = function() {
        const fullText = `To: ${i18n.email}\nSubject: ${subject}\n\n${body}`;
        navigator.clipboard.writeText(fullText).then(() => {
            const btn = document.getElementById('calc-quote-copy');
            const original = btn.textContent;
            const copiedText = btn.getAttribute('data-copied-text') || '✓ Copied!';
            btn.textContent = copiedText;
            btn.classList.add('btn-success');
            btn.classList.remove('btn-outline-secondary');
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove('btn-success');
                btn.classList.add('btn-outline-secondary');
            }, 2500);
        });
    };

    // Show the panel
    document.getElementById('calc-quote-panel').classList.remove('d-none');
    document.getElementById('calc-quote-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function calcCloseQuotePanel() {
    document.getElementById('calc-quote-panel').classList.add('d-none');
}