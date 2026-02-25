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
        closeBtn.addEventListener('click', close);

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
            iframe.src = appendUtmParams(formUrl);
            iframe.style.border = 'none';
            iframe.style.minWidth = '100%';
            iframe.style.overflow = 'hidden';
            bodyEl.appendChild(iframe);

            // Listen for height adjustments from Zoho
            window.addEventListener('message', function (event) {
                var data = event.data;
                if (data && typeof data === 'string') {
                    var parts = data.split('|');
                    if (parts.length === 2) {
                        var perma = parts[0];
                        var newHeight = (parseInt(parts[1], 10) + 15) + 'px';
                        if (iframe.src.indexOf(perma) > 0) {
                            iframe.style.minHeight = newHeight;
                            document.getElementById(containerId).style.height = newHeight;
                        }
                    }
                }
            }, false);
        }

        document.getElementById(overlayId).style.display = 'block';
        document.body.style.overflow = 'hidden';
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
