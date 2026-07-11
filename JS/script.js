// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Funksioni për butonin Lexo Më Shumë te Rreth Nesh
const readMoreBtn = document.getElementById('read-more-btn');
const moreText = document.getElementById('more-text');

if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener('click', function() {
        // Ndryshon klasën "show" (e shton ose e heq)
        moreText.classList.toggle('show');
        
        // Ndryshon tekstin e butonit varësisht nga gjendja
        if (moreText.classList.contains('show')) {
            readMoreBtn.textContent = 'Lexo Më Pak';
        } else {
            readMoreBtn.textContent = 'Lexo Më Shumë';
        }
    });
}

// LOGJIKA E SLIDER-IT TË MODULËVE
const slider = document.getElementById('moduleSlider');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

if (slider && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        // Merr gjerësinë e kartës së parë plus gap-in
        const cardWidth = slider.querySelector('.module-card').clientWidth + 30;
        slider.scrollLeft += cardWidth;
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = slider.querySelector('.module-card').clientWidth + 30;
        slider.scrollLeft -= cardWidth;
    });
}

// LOGJIKA E PËRDITËSUAR E AUTO-PLAY SLIDER
// LOGJIKA E RREGULLUAR DHE E SIGURT E AUTO-PLAY SLIDER
const autoSlider = document.getElementById('moduleSlider');

if (autoSlider) {
    const scrollSpeed = 3500; // Çdo 3.5 sekonda ndërrohet karta

    setInterval(() => {
        const firstCard = autoSlider.querySelector('.module-card');
        if (!firstCard) return;

        // Gjen në mënyrë dinamike gap-in aktual të aplikuar nga CSS
        const computedStyle = window.getComputedStyle(autoSlider);
        const gap = parseInt(computedStyle.gap) || 30;

        // Llogarit saktë gjerësinë totale që zë një kartë së bashku me hapësirën anësore
        const cardWidth = firstCard.getBoundingClientRect().width + gap;
        
        // Pika maksimale e mundshme e scroll-it
        const maxScrollLeft = autoSlider.scrollWidth - autoSlider.clientWidth;

        // Kusht i fuqizuar: Nëse hapi i radhës shkon përtej fundit ose jemi shumë afër tij
        if (autoSlider.scrollLeft + cardWidth >= maxScrollLeft + 5) {
            autoSlider.scrollLeft = 0; // Kthehu butësisht te karta e parë
        } else {
            autoSlider.scrollLeft += cardWidth; // Lëvize për një kartë të plotë
        }
    }, scrollSpeed);
}

// LOGJIKA PËR HAMBURGER MENU (DROPDOWN)
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('#navMenu a');

if (menuToggle && navMenu) {
    // Kur klikohet ikona e menusë
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Ndryshon ikonën nga ☰ (bars) në ✕ (x) kur është e hapur
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Kur klikohet ndonjëri nga linqet, menuja mbyllet automatikisht (që të shohësh seksionin)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
}