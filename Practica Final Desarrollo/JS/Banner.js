//Codigo para cerrar el banner flotante
document.addEventListener('DOMContentLoaded', function() {
    const closeBannerBtn = document.getElementById('close-banner');
    const floatingBanner = document.getElementById('floating-banner');

    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', function() {
            floatingBanner.style.display = 'none';
        });
    }
});
