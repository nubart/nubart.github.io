/* Blog hub product filter.
   Buttons: .blog-filter-btn[data-filter]; cards: .blog-item[data-product].
   Supports deep links such as /x-blog/#translate. */
document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.blog-filter-btn');
    var items = document.querySelectorAll('.blog-item');
    var status = document.getElementById('blog-filter-status');
    if (!buttons.length || !items.length) return;

    function apply(filter, updateHash) {
        var shown = 0;
        items.forEach(function (item) {
            var match = filter === 'all' || item.dataset.product.split(' ').indexOf(filter) !== -1;
            item.classList.toggle('d-none', !match);
            if (match) shown++;
        });
        buttons.forEach(function (btn) {
            btn.setAttribute('aria-pressed', btn.dataset.filter === filter ? 'true' : 'false');
        });
        if (status) {
            /* Translatable via data-one / data-many on #blog-filter-status; {n} = count */
            var tpl = shown === 1 ? (status.dataset.one || 'Showing {n} article.') : (status.dataset.many || 'Showing {n} articles.');
            status.textContent = tpl.replace('{n}', shown);
        }
        if (updateHash && history.replaceState) {
            history.replaceState(null, '', filter === 'all' ? location.pathname : '#' + filter);
        }
        if (window.AOS) window.AOS.refresh();
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () { apply(btn.dataset.filter, true); });
    });

    var initial = location.hash.replace('#', '');
    if (document.querySelector('.blog-filter-btn[data-filter="' + initial + '"]')) apply(initial, false);
});
