$(document).ready(function() {
    // Seleccionamos el navbar
    const $navbar = $('#mainNavbar');
    const expandClass = 'navbar-expand-lg';

    // Función para verificar si el navbar cabe en la pantalla
    function navbarFitsOnScreen() {
        return $(window).width() >= 992; // Bootstrap lg breakpoint
    }

    // Función para actualizar el estado del navbar
    function updateNavbar() {
        const fitsOnScreen = navbarFitsOnScreen();
        const isScrolled = $(window).scrollTop() > 50;

        if (fitsOnScreen) {
            // El navbar CABE en la pantalla
            if (isScrolled) {
                // Excepción: Aunque cabe, si hay scroll, comprimimos
                $navbar.removeClass(expandClass);
            } else {
                // Sin scroll y cabe: expandimos
                $navbar.addClass(expandClass);
                
                // Cerrar el menú si estaba abierto
                const $collapseElement = $('#navbarNavAltMarkup');
                if ($collapseElement.hasClass('show')) {
                    $collapseElement.collapse('hide');
                }
            }
        } else {
            // El navbar NO cabe: siempre comprimido
            $navbar.removeClass(expandClass);
        }
    }

    // Escuchar scroll
    $(window).on('scroll', updateNavbar);

    // Escuchar cambios de tamaño de ventana
    $(window).on('resize', updateNavbar);

    // Ejecutar solo si la pantalla es pequeña
    if (!navbarFitsOnScreen()) {
        updateNavbar();
    }
});