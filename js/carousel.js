/* Project Carousel */

export function initCarousel() {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const carousel = document.querySelector('.carousel');

    if (!carousel || !nextBtn || !prevBtn) return;

    const slider = carousel.querySelector('.list');
    const thumbs = carousel.querySelector('.thumbnail');

    let autoNextTimer;
    const TIME_AUTO = 7000;
    const TIME_ANIM = 3000;

    function resetAutoNext() {
        clearTimeout(autoNextTimer);
        autoNextTimer = setTimeout(() => nextBtn.click(), TIME_AUTO);
    }

    function rotateItems(type) {
        const slides = [...slider.children];
        const thumbItems = [...thumbs.children];

        carousel.classList.add(type);

        if (type === 'next') {
            slider.appendChild(slides[0]);
            thumbs.appendChild(thumbItems[0]);
        } else {
            slider.prepend(slides.at(-1));
            thumbs.prepend(thumbItems.at(-1));
        }

        setTimeout(() => {
            carousel.classList.remove(type);
            nextBtn.style.pointerEvents = prevBtn.style.pointerEvents = "auto";
        }, TIME_ANIM);

        resetAutoNext();
    }

    nextBtn.onclick = () => {
        nextBtn.style.pointerEvents = prevBtn.style.pointerEvents = "none";
        rotateItems("next");
    };

    prevBtn.onclick = () => {
        nextBtn.style.pointerEvents = prevBtn.style.pointerEvents = "none";
        rotateItems("prev");
    };

    resetAutoNext();
}
