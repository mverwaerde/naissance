function getCols() {
    var w = window.innerWidth;
    return w >= 1200 ? 4 : w >= 992 ? 3 : w >= 768 ? 2 : 1;
}

function masonry() {
    var g = document.querySelector('.grid');
    if (!g) return;
    var items = Array.from(g.querySelectorAll('.masonry-item'));
    var n = items.length;
    if (n === 0) return;

    items.forEach(function (el) {
        el.style.cssText = '';
    });
    g.offsetHeight;

    var cols = Math.min(getCols(), n);
    var gap = 30, pad = 15;
    var colW = (g.clientWidth - 2 * pad - (cols - 1) * gap) / cols;

    g.style.position = 'relative';
    g.style.height = '';

    var h = new Array(cols).fill(0);

    items.forEach(function (el) {
        var m = h.indexOf(Math.min.apply(null, h));
        el.style.cssText = 'position:absolute;top:' + h[m] + 'px;left:' + (pad + m * (colW + gap)) + 'px;width:' + colW + 'px;padding:0';
        h[m] += el.offsetHeight;
    });

    g.style.height = Math.max.apply(null, h) + 'px';
}

masonry();

function imagesLoaded(container, cb) {
    if (!container) return cb();
    var imgs = container.querySelectorAll('img');
    var n = imgs.length;
    if (n === 0) return cb();
    var d = 0;
    imgs.forEach(function (img) {
        function inc() { if (++d >= n) cb(); }
        if (img.complete) inc();
        else { img.addEventListener('load', inc); img.addEventListener('error', inc); }
    });
}

imagesLoaded(document.querySelector('.grid'), masonry);

var mt;
window.addEventListener('resize', function () {
    clearTimeout(mt);
    mt = setTimeout(masonry, 205);
});

document.addEventListener('DOMContentLoaded', function () {
    offCanvas();
    utils();
    highlightCurrentPage();
    makeImagesResponsive();
});

function highlightCurrentPage() {
    var a = document.querySelector("a[href='" + location.href + "']");
    if (a && a.parentElement) a.parentElement.classList.add('active');
}

function makeImagesResponsive() {
    document.querySelectorAll('img').forEach(function (img) {
        img.classList.add('img-responsive');
    });
}

function offCanvas() {
    document.querySelectorAll('[data-toggle="offcanvas"]').forEach(function (el) {
        el.addEventListener('click', function () {
            var row = document.querySelector('.row-offcanvas');
            if (row) row.classList.toggle('active');
        });
    });
}

function utils() {
    document.querySelectorAll('.external').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(el.getAttribute('href'));
        });
    });
}
