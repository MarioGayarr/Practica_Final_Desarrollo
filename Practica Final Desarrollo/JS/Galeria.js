//Codigo para expandir/contraer tarjetas de razas
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.breed-card');

    cards.forEach(card => {
        
        //EVENTO CLICK: Expande la tarjeta
        card.addEventListener('click', (e) => {
            //Evitar que el click en detalles cierre la tarjeta
            if (e.target.closest('.details-content')) {
                return;
            }

            const isAlreadyActive = card.classList.contains('expanded');

            //Resetear todas las tarjetas
            cards.forEach(c => {
                c.classList.remove('expanded');
                c.classList.remove('dimmed');
                
                //Resetear scroll al top
                const info = c.querySelector('.breed-info');
                if(info) info.scrollTop = 0;
            });

            //Si no estaba activa, expandirla ahora
            if (!isAlreadyActive) {
                card.classList.add('expanded');
                
                //Oscurecer las demás
                cards.forEach(c => {
                    if (c !== card) {
                        c.classList.add('dimmed');
                    }
                });
            }
        });

        //EVENTO HOVER: Mostrar info sin expandir
        card.addEventListener('mouseenter', () => {
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