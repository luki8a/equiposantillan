// Animación de aparición al hacer scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('section').forEach(sec => observer.observe(sec));


// Acordeón FAQ
document.querySelectorAll('.accordion-item h3').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// Scroll suave para navegación
document.querySelectorAll('.sticky-nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Botón flotante de WhatsApp
const whatsappBtn = document.createElement('a');
whatsappBtn.href = "https://wa.me/54123456789";
whatsappBtn.className = "whatsapp-float";
whatsappBtn.title = "¡Chatea por WhatsApp!";
whatsappBtn.target = "_blank";
whatsappBtn.innerHTML = `<img src="img/Whatsapp.svg.webp" alt="WhatsApp" width="32">`;
document.body.appendChild(whatsappBtn);


// Galería: visualización en pantalla completa (simulada)
document.querySelectorAll('.gallery-grid img').forEach(el => {
  el.addEventListener('click', function () {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.95)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 3000;
    overlay.style.cursor = 'zoom-out';

    let clone = document.createElement('img');
    clone.src = el.src;
    clone.alt = el.alt;
    clone.style.maxWidth = '90vw';
    clone.style.maxHeight = '90vh';
    clone.style.borderRadius = '16px';
    clone.style.boxShadow = '0 8px 32px #ff8c00';

    overlay.appendChild(clone);

    overlay.addEventListener('click', () => document.body.removeChild(overlay));
    document.body.appendChild(overlay);
  });
});


/* EFECTO FADE-IN AL SCROLL PARA LOS TESTIMONIOS */


document.addEventListener('DOMContentLoaded', function() {
  const testimonios = document.querySelectorAll('.testimonio');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      console.log('Entry:', entry.target, entry.isIntersecting);
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  testimonios.forEach(testimonio => {
    observer.observe(testimonio);
  });
});

// =========================
// JS MENÚ HAMBURGUESA CON ANIMACIÓN CLOSE
// =========================
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('closeBtn');

// Abrir menú mobile
burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  burgerBtn.style.display = 'none';
});

// Cerrar menú mobile
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  burgerBtn.style.display = 'flex';
});

// Cerrar menú al hacer click en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burgerBtn.style.display = 'flex';
  });
});

// HERO ANIMADO EQUIPO SANTILLÁN
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;
let interval = null;

// Cambia de slide
function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    slide.setAttribute('aria-hidden', i !== idx);
    dots[i].classList.toggle('active', i === idx);
  });
  current = idx;
}

// Avanza automáticamente
function nextSlide() {
  showSlide((current + 1) % slides.length);
}

// Retrocede (opcional, si quieres flechas)
function prevSlide() {
  showSlide((current - 1 + slides.length) % slides.length);
}

// Inicia el slider automático
function startSlider() {
  interval = setInterval(nextSlide, 5000);
}

// Detiene el slider automático
function stopSlider() {
  clearInterval(interval);
}

// Control manual con dots
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    stopSlider();
    showSlide(idx);
    startSlider();
  });
});

// Accesibilidad: permite avanzar con flechas del teclado
document.querySelector('.hero-slider').addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    stopSlider();
    nextSlide();
    startSlider();
  }
  if (e.key === 'ArrowLeft') {
    stopSlider();
    prevSlide();
    startSlider();
  }
});

// Inicializa
showSlide(0);
startSlider();

// Botón "Ir arriba"

document.addEventListener('DOMContentLoaded', function() {
  // Crear el botón
  const btnArriba = document.createElement('a');
  btnArriba.href = "#";
  btnArriba.className = "btn-ir-arriba";
  btnArriba.setAttribute('aria-label', 'Ir al inicio');
  btnArriba.innerHTML = '<img src="img/up-arrow.png" alt="Ir arriba">';

  // Buscar el botón de WhatsApp flotante
  const wspBtn = document.querySelector('.whatsapp-float');

  // Insertar el botón antes del de WhatsApp
  if (wspBtn && wspBtn.parentNode) {
    wspBtn.parentNode.insertBefore(btnArriba, wspBtn);
  } else {
    document.body.appendChild(btnArriba);
  }

  // Scroll suave al hero-slider
  btnArriba.addEventListener('click', function(e) {
    e.preventDefault();
    const hero = document.querySelector('.hero-slider');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const burgerBtn = document.getElementById('burgerBtn');
  const closeBtn = document.getElementById('closeBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const btnIrArriba = document.querySelector('.btn-ir-arriba');

  if (burgerBtn && btnIrArriba && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      btnIrArriba.style.display = 'none';
    });
  }
  if (closeBtn && btnIrArriba && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      btnIrArriba.style.display = 'flex';
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // WhatsApp
  const wspLinks = document.querySelectorAll('.whatsapp-float');
  wspLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      link.blur();
      const phone = '5491139245896';
      const mensaje = encodeURIComponent('Hola Equipo Santillán, me comunico de www.equiposantillan.com. Quiero más info.');
      const url = `https://wa.me/${phone}?text=${mensaje}`;
      window.open(url, '_blank');
    });
  });

  // Gmail
  const mailLinks = document.querySelectorAll('.mail-link');
  mailLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      link.blur();
      const correo = 'morellaabijou.com';
      const asunto = encodeURIComponent('Contacto Web');
      const body = encodeURIComponent('');
      const url = `mailto:${correo}?subject=${asunto}&body=${body}`;
      window.open(url, '_blank');
    });
  });

  // Instagram
  const igLinks = document.querySelectorAll('.ig-link');
  igLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      link.blur();
      const url = 'https://www.instagram.com/equiposantillan/';
      window.open(url, '_blank');
    });
  });
});
  
  
