    // Seleccionamos el navbar
    const navbar = document.getElementById('mainNavbar');
    // Guardamos la clase de expansión original
    const expandClass = 'navbar-expand-lg';

    window.addEventListener('scroll', () => {
        // Obtenemos el ancho de la ventana
        const width = window.innerWidth;

        // Si el scroll es mayor a 50px
        if (window.scrollY > 50) {
            // Quitamos la clase que lo mantiene horizontal
            // Esto fuerza a Bootstrap a mostrar el botón hamburguesa
            navbar.classList.remove(expandClass);
        } else {
            // Si volvemos arriba Y la pantalla es grande
            if (width >= 992) { 
                // Devolvemos la barra horizontal
                navbar.classList.add(expandClass);
                
                // Opcional: Cerrar el menú si estaba abierto al volver arriba
                const collapseElement = document.getElementById('navbarNavAltMarkup');
                if (collapseElement.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(collapseElement, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        }
    });