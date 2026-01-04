//Codigo para controlar el navbar responsive
$(document).ready(function() {
    const $navbar = $('#mainNavbar');
    const expandClass = 'navbar-expand-lg';

    //Verifica si el navbar cabe en la pantalla
    function navbarFitsOnScreen() {
        return $(window).width() >= 992; //Bootstrap lg breakpoint
    }

    //Actualiza el estado del navbar según scroll y tamaño
    function updateNavbar() {
        const fitsOnScreen = navbarFitsOnScreen();
        const isScrolled = $(window).scrollTop() > 50;

        if (fitsOnScreen) {
            if (isScrolled) {
                //Con scroll: comprimir navbar
                $navbar.removeClass(expandClass);
            } else {
                //Sin scroll: expandir navbar
                $navbar.addClass(expandClass);
                
                //Cerrar el menú si estaba abierto
                const $collapseElement = $('#navbarNavAltMarkup');
                if ($collapseElement.hasClass('show')) {
                    $collapseElement.collapse('hide');
                }
            }
        } else {
            //Pantalla pequeña: siempre comprimido
            $navbar.removeClass(expandClass);
        }
    }

    //Escuchar eventos
    $(window).on('scroll', updateNavbar);
    $(window).on('resize', updateNavbar);

    //Ejecutar al cargar si la pantalla es pequeña
    if (!navbarFitsOnScreen()) {
        updateNavbar();
    }
});