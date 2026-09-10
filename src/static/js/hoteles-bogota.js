document.addEventListener('DOMContentLoaded', function () {
  var tarjetas = document.querySelectorAll('.tarjeta-enlace');
  var prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefiereMenosMovimiento || !('IntersectionObserver' in window)) {
    tarjetas.forEach(function (tarjeta) { tarjeta.classList.add('visible'); });
    return;
  }

  // Corrección: Se cambió 'i3f' por 'if' que era un error tipográfico en el código original
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  tarjetas.forEach(function (tarjeta) { observador.observe(tarjeta); });
});

// Script adicional para calificación con estrellas (si se agregan al DOM)
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const value = star.getAttribute('data-value');
        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < value; i++) {
            stars[i].classList.add('selected');
        }
        console.log('Calificación:', value);
    });
});