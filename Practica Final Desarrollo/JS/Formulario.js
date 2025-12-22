$(document).ready(function () {
    $('#contactForm').on('submit', function (e) {
        // 1. IMPORTANTE: Esto evita que la página cambie a la pantalla blanca de Postman
        e.preventDefault();
        e.stopPropagation();

        let isValid = true;
        const $form = $(this);
        const $btn = $form.find('button[type="submit"]');
        const $msg = $('#mensajeExito'); // Seleccionamos el mensaje

        // 2. Validación visual
        $form.find('input').each(function () {
            const $input = $(this);

            // Limpiar estilos
            $input.css({
                'border': '',
                'box-shadow': '',
                'background-color': 'rgba(0, 0, 0, 0.4)' // Restaurar fondo original
            });

            if (!$input.val().trim() || !this.checkValidity()) {
                isValid = false;
                $input.css({
                    'border': '2px solid #ff4444',
                    'box-shadow': '0 0 10px rgba(255, 0, 0, 0.5)',
                    'background-color': 'rgba(255, 0, 0, 0.1)'
                });
            }
        });

        if (!isValid) return; // Si falla, no enviamos nada

        // 3. Envío por AJAX

        // Efecto visual en el botón
        const originalBtnText = $btn.text();
        $btn.text('Enviando...').prop('disabled', true);

        $.ajax({
            url: 'https://httpbin.org/post',
            type: 'POST',
            data: $form.serialize(),
            success: function (response) {
                // AQUÍ ESTÁ EL CAMBIO:
                // 1. Mostramos los datos SOLO en consola
                console.log('Datos recibidos por el servidor:', response);

                // 2. En la pantalla mostramos el div bonito
                $msg.fadeIn().delay(3000).fadeOut(); // Aparece, espera 3s, desaparece

                // 3. Limpiamos el formulario
                $form[0].reset();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                alert('Error de conexión. Inténtalo más tarde.');
            },
            complete: function () {
                // Restauramos el botón
                $btn.text(originalBtnText).prop('disabled', false);
            }
        });
    });
});