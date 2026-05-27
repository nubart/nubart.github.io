/**
 * Zoho Forms Lightbox
 *
 * Opens a Zoho form inside a lightbox overlay on the same page.
 *
 * Usage:
 *   1. Include zoho-lightbox.css in <head>
 *   2. Include this script (defer) before </body>
 *   3. After this script, initialise with the form URL:
 *        <script>ZohoLightbox.init('https://forms.zohopublic.eu/...');</script>
 *   4. On every CTA link/button, add:
 *        onclick="ZohoLightbox.open(); return false;"
 */

var ZohoLightbox = (function () {
    var formUrl = '';
    var overlayId = 'zf-lightbox-overlay';
    var bodyId = 'zf-lightbox-body';
    var containerId = 'zf-lightbox-container';
    var built = false;

    function build() {
        if (built) return;

        var body = document.createElement('div');
        body.setAttribute('id', bodyId);
        body.setAttribute('class', 'zf-lightbox-body');

        var closeBtn = document.createElement('div');
        closeBtn.setAttribute('class', 'zf-lightbox-close');
        closeBtn.setAttribute('tabindex', '0');
        closeBtn.addEventListener('click', close);
        closeBtn.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                close();
            }
        });

        var container = document.createElement('div');
        container.setAttribute('id', containerId);
        container.setAttribute('class', 'zf-lightbox-container');
        container.appendChild(body);
        container.appendChild(closeBtn);

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'zf-lightbox-wrapper');
        wrapper.appendChild(container);

        var dimmer = document.createElement('div');
        dimmer.setAttribute('class', 'zf-lightbox-dimmer');
        dimmer.addEventListener('click', close);

        var overlay = document.createElement('div');
        overlay.setAttribute('id', overlayId);
        overlay.style.display = 'none';
        overlay.appendChild(wrapper);
        overlay.appendChild(dimmer);

        document.body.appendChild(overlay);
        built = true;
    }

    function open() {
        build();

        var bodyEl = document.getElementById(bodyId);
        var iframe = bodyEl.querySelector('iframe');

        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.src = appendReferrer(appendUtmParams(formUrl));
            iframe.style.border = 'none';
            iframe.style.minWidth = '100%';
            iframe.style.overflow = 'hidden';
            bodyEl.appendChild(iframe);

            // Listen for height adjustments from Zoho
            window.addEventListener('message', function (event) {
                var data = event.data;
                if (data && typeof data === 'string') {
                    var parts = data.split('|');
                    if (parts.length === 2 || parts.length === 3) {
                        var perma = parts[0];
                        var newHeight = (parseInt(parts[1], 10) + 15) + 'px';
                        if (iframe.src.indexOf('formperma') > 0 && iframe.src.indexOf(perma) > 0) {
                            var container = document.getElementById(containerId);
                            if (iframe.style.minHeight !== newHeight) {
                                if (parts.length === 3) {
                                    iframe.scrollIntoView();
                                    setTimeout(function () {
                                        iframe.style.minHeight = newHeight;
                                        container.style.height = newHeight;
                                    }, 500);
                                } else {
                                    iframe.style.minHeight = newHeight;
                                    container.style.height = newHeight;
                                }
                            }
                        }
                    }
                }
            }, false);
        }

        document.getElementById(overlayId).style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Accessibility: focus the dialog so keyboard / screen-reader users land inside it
        setTimeout(function () {
            var container = document.getElementById(containerId);
            container.setAttribute('tabindex', '-1');
            container.focus();
        }, 100);
    }

    function close() {
        document.getElementById(overlayId).style.display = 'none';
        document.body.style.overflow = '';
        // Remove iframe so form resets on next open
        var bodyEl = document.getElementById(bodyId);
        var iframe = bodyEl.querySelector('iframe');
        if (iframe) iframe.remove();
    }

    function appendUtmParams(src) {
        try {
            if (typeof ZFAdvLead !== 'undefined' && typeof zfutm_zfAdvLead !== 'undefined') {
                for (var i = 0; i < ZFAdvLead.utmPNameArr.length; i++) {
                    var param = ZFAdvLead.utmPNameArr[i];
                    var val = zfutm_zfAdvLead.zfautm_gC_enc(param);
                    if (val && val !== '') {
                        src += (src.indexOf('?') > 0 ? '&' : '?') + param + '=' + val;
                    }
                }
            }
            if (typeof ZFLead !== 'undefined' && typeof zfutm_zfLead !== 'undefined') {
                for (var j = 0; j < ZFLead.utmPNameArr.length; j++) {
                    var param2 = ZFLead.utmPNameArr[j];
                    var val2 = zfutm_zfLead.zfutm_gC_enc(param2);
                    if (val2 && val2 !== '') {
                        src += (src.indexOf('?') > 0 ? '&' : '?') + param2 + '=' + val2;
                    }
                }
            }
        } catch (e) { }
        return src;
    }

    function appendReferrer(src) {
        if (/[?&]referrername=/.test(src)) return src;
        try {
            var rfr = window.location.href;
            try {
                rfr = window.self !== window.top
                    ? window.top.location.href
                    : (/^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(rfr) ? rfr : '');
            } catch (e) { }
            if (rfr) {
                if (rfr.length > 1800) {
                    var q = rfr.indexOf('?');
                    if (q > -1) rfr = rfr.substring(0, q);
                    if (rfr.length > 1800) rfr = rfr.substring(0, 1800);
                }
                src += (src.indexOf('?') > 0 ? '&' : '?') + 'referrername=' + encodeURIComponent(rfr);
            }
        } catch (e) { }
        return src;
    }

    function init(url) {
        formUrl = url;
        if (document.readyState === 'complete') {
            build();
        } else {
            window.addEventListener('load', build);
        }
    }

    return {
        init: init,
        open: open,
        close: close
    };
})();
