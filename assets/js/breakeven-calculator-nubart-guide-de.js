/* ============================================================
   Nubart GUIDE — Break-even calculator (cards sold separately)
   Used by: de/audioguides/qr-code-audioguide-kostenpflichtig-anbieten.html
   Take-up by selling price is estimated from Nubart installation
   data and is deliberately conservative. REVIEW ANNUALLY.
   ============================================================ */
(function () {
    var eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    var eur2 = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    var int = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });

    // --- Expected take-up by selling price (Nubart data; REVIEW ANNUALLY) ---
    // Piecewise-linear interpolation through measured anchor points
    // (corrected for unused cards). Below €1 and above €5 the nearest
    // anchor value is held flat.
    function takeupFor(price) {
        var pts = [[1.00, 0.0501], [2.00, 0.0721], [3.00, 0.1375], [5.00, 0.0208]];
        if (price <= pts[0][0]) return pts[0][1];
        if (price >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
        for (var i = 0; i < pts.length - 1; i++) {
            var x0 = pts[i][0], y0 = pts[i][1], x1 = pts[i + 1][0], y1 = pts[i + 1][1];
            if (price >= x0 && price <= x1) {
                return y0 + (y1 - y0) * (price - x0) / (x1 - x0);
            }
        }
        return pts[pts.length - 1][1];
    }

    var ids = ['visitors', 'price', 'content'], el = {};
    ids.forEach(function (i) { el[i] = document.getElementById(i); });

    // Only run on pages that actually contain the calculator
    if (ids.some(function (i) { return !el[i]; })) return;

    function o(id) { return document.getElementById(id); }

    function calc() {
        var CARD_COST = 1.00;   // Nubart card price (cards sold separately) — fixed
        var SETUP = 1850;       // one-time setup fee (€)
        var MIN_CARDS = 4000;   // minimum first card order
        var v = +el.visitors.value || 0,
            p = +el.price.value || 0,
            content = +el.content.value || 0;
        var t = takeupFor(p);
        var cards = Math.round(v * t),
            rev = cards * p,
            margin = p - CARD_COST,
            annual = cards * margin,                              // steady-state surplus (year 2+)
            upfront = SETUP + MIN_CARDS * CARD_COST + content;    // one-time outlay to recover
        o('r-tu').textContent = (t * 100).toFixed(2) + '%';
        o('r-cards').textContent = int.format(cards);
        o('r-rev').textContent = eur.format(rev);
        o('r-upfront').textContent = eur.format(upfront);
        o('r-margin').textContent = eur2.format(margin);
        o('r-ongoing').textContent = margin > 0 ? eur.format(annual) : '—';
        var be = o('r-be');
        if (margin <= 0) {
            be.innerHTML = 'Legen Sie einen Verkaufspreis über den Kartenkosten von 1 € fest, um eine Marge zu erzielen.';
            return;
        }
        // The MIN_CARDS starter cards are pre-paid in the upfront outlay, so each of
        // those sales returns the full selling price. If recovery needs more than the
        // starter batch, the extra cards must be reordered at CARD_COST, so beyond the
        // batch each sale only returns the margin.
        var beCards, withinBatch = Math.ceil(upfront / p);
        if (withinBatch <= MIN_CARDS) {
            beCards = withinBatch;
        } else {
            // Starter batch alone doesn't recover the outlay; remaining cards net only margin.
            beCards = Math.ceil((SETUP + content) / margin);
        }
        var t2 = '';
        if (cards > 0) {
            var m = beCards / cards * 12;
            t2 = m <= 12
                ? (' — etwa <b>' + int.format(Math.ceil(m)) + ' Monate</b> bei Ihren Besucherzahlen.')
                : (' — etwa <b>' + (Math.round(m / 12 * 10) / 10) + ' Jahre</b> bei Ihren Besucherzahlen.');
        }
        be.innerHTML = 'Amortisation nach <b>' + int.format(beCards) + ' verkauften Karten</b>' + t2;
    }

    ids.forEach(function (i) { el[i].addEventListener('input', calc); });
    calc();
})();
