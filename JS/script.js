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

// LOGJIKA PËR FAQ ACCORDION
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Nëse dëshiron që kur hapet njëra, të tjerat të mbyllen automatikisht:
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item && i.classList.contains('active')) {
                    i.classList.remove('active');
                    i.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Ndërro gjendjen aktuale (Toggle)
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});

// LOGJIKA E ANIMACIONIT TË NUMËRIMIT (COUNTER ANIMATION)
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');

    if (!statsSection || statNumbers.length === 0) return;

    let animated = false;

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const isFloat = target % 1 !== 0; // Kontrollon nëse është numër me presje (si 99.9)
            
            let current = 0;
            const duration = 2000; // Kohëzgjatja e animacionit në milisekonda (2 sekonda)
            const steps = 60;
            const increment = target / steps;
            const stepTime = duration / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                // Formatimi i numrit (shtimi i presjes te 1,000 nëse dëshirohet)
                let displayValue = isFloat ? current.toFixed(1) : Math.floor(current);
                if (!isFloat && displayValue >= 1000) {
                    displayValue = displayValue.toLocaleString('en-US'); // E bën 1,000
                }

                counter.innerText = displayValue + suffix;
            }, stepTime);
        });
    };

    // Përdorim IntersectionObserver që animacioni të nisë VETËM kur përdoruesi mbërrin te ky seksion
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true; // Ekzekutohet vetëm një herë kur shihet
            }
        });
    }, { threshold: 0.4 }); // Aktivizohet kur 40% e seksionit është e dukshme në ekran

    observer.observe(statsSection);
});