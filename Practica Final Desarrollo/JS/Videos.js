//Autoplay inteligente de videos
(() => {
	const observerOptions = { threshold: 0.6 }; //Video visible al 60%
	const videoObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const video = entry.target;
			if (!video) return;
			
			//Reproducir cuando es visible, pausar cuando no
			if (entry.isIntersecting) {
				video.play().catch(() => {});
			} else {
				video.pause();
			}
		});
	}, observerOptions);

	//Observar todos los videos
	document.querySelectorAll('.breed-video').forEach(video => {
		videoObserver.observe(video);
	});
})();

//Banner flotante: cerrar y recordar estado
(() => {
	const banner = document.getElementById('floating-banner');
	const closeBtn = document.getElementById('close-banner');
	if (!banner || !closeBtn) return;

	//Cerrar banner y guardar en localStorage
	closeBtn.addEventListener('click', () => {
		banner.style.display = 'none';
		localStorage.setItem('banner-closed', 'true');
	});

	//Verificar si ya fue cerrado antes
	if (localStorage.getItem('banner-closed') === 'true') {
		banner.style.display = 'none';
	}
})();
