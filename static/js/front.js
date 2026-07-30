masonry();
document.addEventListener('DOMContentLoaded', function () {
    offCanvas();
    utils();
    highlightCurrentPage();
    makeImagesResponsive();
});

function highlightCurrentPage() {
    var activeLink = document.querySelector("a[href='" + location.href + "']");
    if (activeLink && activeLink.parentElement) {
        activeLink.parentElement.classList.add('active');
    }
}

function makeImagesResponsive() {
    document.querySelectorAll('img').forEach(function (img) {
        img.classList.add('img-responsive');
    });
}

function masonry() {
    var grid = document.querySelector('.grid');
    if (!grid) return;
    var msnry = new Masonry(grid, {
        itemSelector: '.masonry-item'
    });
    imagesLoaded(grid).on('progress', function () {
        msnry.layout();
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
    var checkout = document.getElementById('checkout');
    if (checkout) {
        checkout.addEventListener('click', function (e) {
            var box = e.target.closest('.box.shipping-method, .box.payment-method');
            if (box) {
                var radio = box.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            }
        });
    }
    document.querySelectorAll('.box.clickable').forEach(function (el) {
        el.addEventListener('click', function () {
            var link = el.querySelector('a');
            if (link) window.location = link.getAttribute('href');
        });
    });
    document.querySelectorAll('.external').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(el.getAttribute('href'));
        });
    });
    document.querySelectorAll('.scroll-to').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            var parts = el.getAttribute('href').split('#');
            var target = document.getElementById(parts[1]);
            if (target) {
                var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });
}

window.alignElementsSameHeight = function () {
    document.querySelectorAll('.same-height-row').forEach(function (row) {
        var children = row.querySelectorAll('.same-height');
        var maxHeight = 0;
        children.forEach(function (child) {
            child.style.height = 'auto';
        });
        if (window.innerWidth > 768) {
            children.forEach(function (child) {
                if (child.clientHeight > maxHeight) {
                    maxHeight = child.clientHeight;
                }
            });
            if (maxHeight > 0) {
                children.forEach(function (child) {
                    var cs = getComputedStyle(child);
                    var pt = parseFloat(cs.paddingTop) || 0;
                    var pb = parseFloat(cs.paddingBottom) || 0;
                    child.style.height = (maxHeight - pt - pb) + 'px';
                });
            }
        }
        var always = row.querySelectorAll('.same-height-always');
        maxHeight = 0;
        always.forEach(function (child) {
            child.style.height = 'auto';
            if (child.clientHeight > maxHeight) {
                maxHeight = child.clientHeight;
            }
        });
        if (maxHeight > 0) {
            always.forEach(function (child) {
                var cs = getComputedStyle(child);
                var pt = parseFloat(cs.paddingTop) || 0;
                var pb = parseFloat(cs.paddingBottom) || 0;
                child.style.height = (maxHeight - pt - pb) + 'px';
            });
        }
    });
};

var windowWidth;
window.addEventListener('load', function () {
    windowWidth = window.innerWidth;
    window.alignElementsSameHeight();
});

window.addEventListener('resize', function () {
    var newWindowWidth = window.innerWidth;
    if (windowWidth !== newWindowWidth) {
        setTimeout(function () {
            window.alignElementsSameHeight();
        }, 205);
        windowWidth = newWindowWidth;
    }
});
