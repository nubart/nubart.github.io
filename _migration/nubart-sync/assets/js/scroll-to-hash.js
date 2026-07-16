/* Scroll to Hash Functionality */

function getElementTopOffset(element) {
    if (!element.getClientRects().length) {
        return 0;
    }

    let rect = element.getBoundingClientRect();
    let win = element.ownerDocument.defaultView;
    return rect.top + win.scrollY;
}

window.addEventListener('load', event => {
    if (window.location.hash.length > 0) {
        window.setTimeout(() => {
            const target = document.getElementById(window.location.hash.substring(1));
            if (target) {
                window.scrollTo(0, getElementTopOffset(target));
            }
        }, 1000);
    }
});
