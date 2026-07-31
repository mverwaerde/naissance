document.addEventListener('DOMContentLoaded', function () {
    offCanvas();
    highlightCurrentPage();
});

function highlightCurrentPage() {
    var a = document.querySelector("a[href='" + location.href + "']");
    if (a && a.parentElement) a.parentElement.classList.add('active');
}

function offCanvas() {
    document.querySelectorAll('[data-toggle="offcanvas"]').forEach(function (el) {
        el.addEventListener('click', function () {
            var row = document.querySelector('.row-offcanvas');
            if (row) row.classList.toggle('active');
        });
    });
}
