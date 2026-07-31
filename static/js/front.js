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
