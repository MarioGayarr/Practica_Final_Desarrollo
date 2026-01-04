$(document).ready(function () { 
    $('#contactForm').on('submit', function (e) { //Cuando se envía el formulario
        e.preventDefault(); /* previene el envio por defecto */
        e.stopPropagation(); /* detiene la propagacion del evento */

        let isValid = true; /* validacion */
        const $form = $(this); /* referencia al formulario */
        const $btn = $form.find('button[type="submit"]'); /* boton de envio */
        const $msg = $('#mensajeExito'); /* mensaje de exito */

        $form.find('input').each(function () { /* itera sobre todos los inputs */
            const $input = $(this); /* referencia al input actual */

            $input.css({ /* resetea estilos previos */
                'border': '', /* sin borde */
                'box-shadow': '', /* sin sombra */
                'background-color': 'rgba(0, 0, 0, 0.4)' /* restaura fondo original */
            });

            if (!$input.val().trim() || !this.checkValidity()) { /* valida que el campo no este vacio */
                isValid = false; /* marca como invalido */
                $input.css({ /* aplica estilos de error */
                    'border': '2px solid #ff4444', /* borde rojo */
                    'box-shadow': '0 0 10px rgba(255, 0, 0, 0.5)', /* sombra roja */
                    'background-color': 'rgba(255, 0, 0, 0.1)' /* fondo rojo claro */
                });
            }
        });

        if (!isValid) return; /* si falla validacion, no continua */

        const originalBtnText = $btn.text(); /* guarda el texto original del boton */
        $btn.text('Enviando...').prop('disabled', true); /* cambio visual del boton */

        $.ajax({ /* realiza peticion AJAX */
            url: 'https://httpbin.org/post', /* URL del endpoint */
            type: 'POST', /* metodo POST */
            data: $form.serialize(), /* serializa datos del formulario */
            success: function (response) { /* callback de exito */

                console.log('Datos recibidos por el servidor:', response); /* muestra respuesta en consola */

                /* seccion mostrada visual de exito */
                $msg.fadeIn().delay(3000).fadeOut(); /* muestra mensaje, espera 3s y oculta */

                /* seccion limpieza del formulario */
                $form[0].reset(); /* resetea el formulario */
            },
            error: function (xhr, status, error) { /* callback de error */
                console.error('Error:', error); /* muestra error en consola */
                alert('Error de conexión. Inténtalo más tarde.'); /* alerta de error */
            },
            complete: function () { /* callback final */
                /* seccion restauracion del boton */
                $btn.text(originalBtnText).prop('disabled', false); /* restaura boton original */
            }
        });
    });
});