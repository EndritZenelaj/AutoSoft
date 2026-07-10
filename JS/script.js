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

// LOGJIKA E AUTO-PLAY SLIDER
const autoSlider = document.getElementById('moduleSlider');

if (autoSlider) {
    const scrollSpeed = 3500; // Koha e lëvizjes: 3.5 sekonda (Ideale për lexim)

    setInterval(() => {
        // Merr gjerësinë e një karte individuale plus gap-in prej 30px
        const cardWidth = autoSlider.querySelector('.module-card').clientWidth + 30;
        
        // Llogarit pikën maksimale të scroll-it
        const maxScrollLeft = autoSlider.scrollWidth - autoSlider.clientWidth;

        // Nëse kemi arritur në fund ose shumë afër fundit, kthehu në fillim
        if (autoSlider.scrollLeft >= maxScrollLeft - 5) {
            autoSlider.scrollLeft = 0;
        } else {
            // Përndryshe, lëvize djathtas për një kartë
            autoSlider.scrollLeft += cardWidth;
        }
    }, scrollSpeed);
}