// Autoplay inteligente de videos
(() => {
	const observerOptions = { threshold: 0.6 };
	const videoObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const video = entry.target;
			if (!video) return;
			if (entry.isIntersecting) {
				video.play().catch(() => {});
			} else {
				video.pause();
			}
		});
	}, observerOptions);

	document.querySelectorAll('.breed-video').forEach(video => {
		videoObserver.observe(video);
	});
})();

// Banner flotante: cerrar y recordar estado
(() => {
	const banner = document.getElementById('floating-banner');
	const closeBtn = document.getElementById('close-banner');
	if (!banner || !closeBtn) return;

	closeBtn.addEventListener('click', () => {
		banner.style.display = 'none';
		localStorage.setItem('banner-closed', 'true');
	});

	if (localStorage.getItem('banner-closed') === 'true') {
		banner.style.display = 'none';
	}
})();
