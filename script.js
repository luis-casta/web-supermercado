// ============================================
// LA POMPA - JAVASCRIPT INTERACTIVO
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVEGACIÓN
    // ============================================
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Agregar clase 'scrolled' cuando se hace scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Menu toggle para móvil
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ANIMACIONES AL SCROLL (Intersection Observer)
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.product-card, .offer-card, .service-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ============================================
    // BUSCADOR DE PRODUCTOS
    // ============================================
    
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const category = card.querySelector('.product-category').textContent.toLowerCase();
                const description = card.querySelector('.product-description').textContent.toLowerCase();
                
                const matches = title.includes(query) || 
                               category.includes(query) || 
                               description.includes(query);
                
                if (matches || query === '') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // ============================================
    // MODO OSCURO/CLARO
    // ============================================
    
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('lapompa_theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    
    // Toggle de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            const isDark = document.body.classList.contains('dark-mode');
            if (themeIcon) {
                themeIcon.textContent = isDark ? '☀️' : '🌙';
            }
            
            localStorage.setItem('lapompa_theme', isDark ? 'dark' : 'light');
            
            // Animación del botón
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
    
    // ============================================
    // NEWSLETTER FORM
    // ============================================
    
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            
            // Validación simple
            if (emailInput.value && emailInput.validity.valid) {
                // Efecto visual de éxito
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = '✓ ¡Suscrito!';
                submitButton.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                
                // Limpiar input
                emailInput.value = '';
                
                // Restaurar después de 3 segundos
                setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.style.background = '';
                }, 3000);
            }
        });
    }
    
    // ============================================
    // PARALLAX SUAVE EN HERO
    // ============================================
    
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ============================================
    // CONTADOR DE OFERTAS (Efecto dinámico)
    // ============================================
    
    const offerBadges = document.querySelectorAll('.offer-badge');
    
    offerBadges.forEach(badge => {
        // Agregar un efecto de pulso sutil
        setInterval(() => {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    });
    
    // ============================================
    // MENSAJE DE BIENVENIDA
    // ============================================
    
    console.log('%c¡Bienvenido a Supermercado  La Pompa! 🛒', 'color: #22c55e; font-size: 24px; font-weight: bold;');
    console.log('%cTu supermercado de confianza', 'color: #f97316; font-size: 16px;');
    console.log('%cPara pedidos: WhatsApp o llámanos', 'color: #3b82f6; font-size: 14px;');
    
});

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Función para formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Función para detectar si el usuario está en móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Agregar estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
