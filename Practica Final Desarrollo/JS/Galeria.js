document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.breed-card');

    cards.forEach(card => {
        
        // 1. EVENTO CLICK (Expansión)
        card.addEventListener('click', (e) => {
            // Evitar que el click en detalles cierre la tarjeta
            if (e.target.closest('.details-content')) {
                return;
            }

            // Comprobamos si la tarjeta actual YA estaba abierta
            const isAlreadyActive = card.classList.contains('expanded');

            // PASO A: Resetear todo (Limpiar el tablero)
            // Quitamos clases 'expanded' y 'dimmed' de TODAS las tarjetas
            cards.forEach(c => {
                c.classList.remove('expanded');
                c.classList.remove('dimmed');
                
                // Forzamos el scroll al top del contenido si estaba bajado
                const info = c.querySelector('.breed-info');
                if(info) info.scrollTop = 0;
            });

            // PASO B: Si NO estaba activa, la activamos ahora
            if (!isAlreadyActive) {
                // Expandimos la clicada
                card.classList.add('expanded');
                
                // Oscurecemos y encogemos EL RESTO
                cards.forEach(c => {
                    if (c !== card) {
                        c.classList.add('dimmed');
                    }
                });
            }
        });

        // 2. HOVER - Mostrar info sin expandir
        // Solo queremos el efecto hover si NO hay ninguna tarjeta expandida
        card.addEventListener('mouseenter', () => {
            // Verificamos si hay alguna expandida en la web
            const anyExpanded = document.querySelector('.breed-card.expanded');
            
            if (!anyExpanded) {
                card.classList.add('hover-active');
            }
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-active');
        });
    });
});