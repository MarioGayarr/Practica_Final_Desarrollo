(() => {
  const track = document.getElementById("track");
  if (!track) return; 
  
  const wrap = track.parentElement; // div.slider
  const cards = Array.from(track.children);
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dotsBox = document.getElementById("dots");

  const isMobile = () => matchMedia("(max-width:767px)").matches;

  // Limpiar dots existentes por si acaso se duplican
  if (dotsBox) dotsBox.innerHTML = '';

  // Generar puntos (dots)
  if (dotsBox) {
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.onclick = () => activate(i, true);
      dotsBox.appendChild(dot);
    });
  }
  
  const dots = dotsBox ? Array.from(dotsBox.children) : [];
  let current = 0;

  function center(i) {
    const card = cards[i];
    // En móvil usamos 'top', en desktop 'left'
    const axis = isMobile() ? "top" : "left";
    const size = isMobile() ? "clientHeight" : "clientWidth";
    // Calculamos la posición relativa al track
    const start = isMobile() ? card.offsetTop : card.offsetLeft;
    
    if (wrap) {
        wrap.scrollTo({
            [axis]: start - (wrap[size] / 2 - card[size] / 2),
            behavior: "smooth"
        });
    }
  }

  function toggleUI(i) {
    // Usamos toggleAttribute con el segundo parámetro forzado
    cards.forEach((c, k) => {
        if (k === i) {
            c.setAttribute("active", "");
        } else {
            c.removeAttribute("active");
        }
    });
    
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
    
    if(prev) prev.disabled = i === 0;
    if(next) next.disabled = i === cards.length - 1;
  }

  function activate(i, scroll) {
    // Permitimos re-activar el 0 si es la primera carga para forzar el layout
    current = i;
    toggleUI(i);
    if (scroll) center(i);
  }

  function go(step) {
    const target = Math.min(Math.max(current + step, 0), cards.length - 1);
    activate(target, true);
  }

  if(prev) prev.onclick = () => go(-1);
  if(next) next.onclick = () => go(1);

  // Eventos de Teclado
  addEventListener("keydown", (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    }, { passive: true }
  );

  cards.forEach((card, i) => {
    // En desktop, hover activa. En móvil, solo click.
    card.addEventListener("mouseenter", () => !isMobile() && activate(i, false));
    card.addEventListener("click", () => activate(i, true));
  });

  // Inicialización forzada para evitar glitches visuales al cargar
  requestAnimationFrame(() => {
      activate(0, true);
  });
})();