/* ---------------------------------------------
   CUSTOM MOUSE DOT + SECTION ACTIVE TRACKING
---------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".sectionaddactive");
    const portfolioDot = document.querySelector(".portfolio-dot");

    // Mouse dot
    document.addEventListener("mousemove", e => {
        if (!portfolioDot) return;
        portfolioDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Section active
    function checkSection() {
        const winH = window.innerHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            section.classList.toggle("active", rect.top < winH - 150 && rect.bottom > 0);
        });
    }

    window.addEventListener("scroll", checkSection, { passive: true });
    checkSection();
});


/* ---------------------------------------------
   LOADER + WAVE TRANSITION
---------------------------------------------- */
window.addEventListener("load", () => {
    const wave = document.querySelector('.wave-svg');
    const loader = document.getElementById('portfolioLoader');

    if (wave) wave.style.transform = 'translateY(-150vh)';
    setTimeout(() => loader?.classList.add('fade-out'), 2500);
});


/* ---------------------------------------------
   UNIVERSAL MARQUEE (Skills + Footer)
---------------------------------------------- */
function createMarquee(trackSelector, itemSelector, speed = 100, reverse = false) {
    const track = document.querySelector(trackSelector);
    if (!track) return;

    const items = gsap.utils.toArray(itemSelector);
    let totalWidth = items.reduce((sum, item) => sum + item.offsetWidth + 50, 0);

    const fromX = reverse ? -(totalWidth / 2) : 0;
    const toX = reverse ? 0 : -(totalWidth / 2);

    gsap.fromTo(track, { x: fromX }, {
        x: toX,
        duration: speed,
        ease: "linear",
        repeat: -1
    });
}

// MAIN SKILLS
createMarquee(".animated-skills-hlp .animated-skills", ".animated-skills-wrapper", 100);

// FOOTER SLIDER 1
createMarquee(".animated-contactslide .animated-skills-hlp-cross1 .animated-skills",
    ".animated-skills-hlp-cross1 .animated-skills-wrapper",
    50);

// FOOTER SLIDER 2 (Reverse)
createMarquee(".animated-contactslide .animated-skills-hlp-cross2 .animated-skills",
    ".animated-skills-hlp-cross2 .animated-skills-wrapper",
    50, true);




/* ---------------------------------------------
CUSTOM CAROUSEL (Optimized)
---------------------------------------------- */
if (window.innerWidth > 576) {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const carousel = document.querySelector('.carousel');
    if (!carousel || !nextBtn || !prevBtn) return;

    const slider = carousel.querySelector('.list');
    const thumbs = carousel.querySelector('.thumbnail');

    let autoNextTimer;
    const TIME_AUTO = 7000;
    const TIME_ANIM = window.innerWidth < 768 ? 1200 : 3000;

    function resetAutoNext() {
        clearTimeout(autoNextTimer);
        autoNextTimer = setTimeout(() => nextBtn.click(), TIME_AUTO);
    }

    function rotateItems(type) {
        const slides = [...slider.children];
        const thumbItems = [...thumbs.children];

        carousel.classList.add(type);

        type === "next"
            ? (slider.append(slides[0]), thumbs.append(thumbItems[0]))
            : (slider.prepend(slides.at(-1)), thumbs.prepend(thumbItems.at(-1)));

        setTimeout(() => {
            carousel.classList.remove(type);
            nextBtn.style.pointerEvents =
                prevBtn.style.pointerEvents = "auto";
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
} else {
    if (typeof gsap === "undefined") return;

    const carousel = document.querySelector('.carousel');
    const list = carousel.querySelector('.list');
    const items = [...list.children];
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    let index = 0;
    let animating = false;

    gsap.set(items, { opacity: 0, scale: 0.9 });
    gsap.set(items[0], { opacity: 1, scale: 1 });

    function showSlide(newIndex, dir) {
        if (animating) return;
        animating = true;

        gsap.timeline({
            onComplete: () => {
                index = newIndex;
                animating = false;
            }
        })
            .to(items[index], {
                opacity: 0,
                x: -30 * dir,
                duration: 0.4
            })
            .fromTo(items[newIndex], {
                opacity: 0,
                x: 30 * dir
            }, {
                opacity: 1,
                x: 0,
                duration: 0.4
            }, "-=0.2");
    }

    next.onclick = () => showSlide((index + 1) % items.length, 1);
    prev.onclick = () => showSlide((index - 1 + items.length) % items.length, -1);
}


/* ---------------------------------------------
   SCROLL TOP ON LOAD + BACK TO TOP
---------------------------------------------- */
window.addEventListener("beforeunload", () => scrollTo(0, 0));

document.querySelector('.footer-top-arrow .footer-top-arrow-hlp')
    ?.addEventListener('click', () => scrollTo({ top: 0, behavior: "smooth" }));


/* ---------------------------------------------
   FIXED MOBILE + DESKTOP RESUME SCROLL ENGINE
---------------------------------------------- */
/* ----------------------------------------------------
   ANDROID-PROOF SCROLL STACK ENGINE (Final Stable)
---------------------------------------------------- */
function initResume() {

    const section = document.querySelector(".my-resume-section .scroll-section");
    if (!section) return;

    const wrapper = section.querySelector(".list");
    const cards = [...wrapper.querySelectorAll(".item")];

    // REAL MOBILE FIX — dynamic card height
    const vwHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const cardHeight = vwHeight * 0.85;
    const gap = 40;

    // Kill old triggers
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.set(cards, { clearProps: "all" });

    // ⭐ Calculate wrapper height based on REAL device height
    const totalHeight = (cards.length * (cardHeight + gap));
    wrapper.style.height = totalHeight + "px";

    // ⭐ Set initial card positions
    cards.forEach((card, i) => {
        gsap.set(card, {
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            y: i * (cardHeight + gap)
        });
    });

    // ⭐ Scroll end value
    const endVal = totalHeight - vwHeight;

    // ⭐ TIMELINE
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=" + endVal,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            pinType: "fixed",  // ⭐ ANDROID BEST BEHAVIOR
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });

    // ⭐ Animate stack
    cards.forEach((card, i) => {
        if (i === 0) return;

        tl.to(cards[i - 1], {
            scale: 0.9,
            borderRadius: "15px",
            duration: 0.4
        });

        tl.to(card, {
            y: 0,
            duration: 0.6,
            ease: "power1.out"
        }, "<0.1");
    });

    ScrollTrigger.refresh(true);
}

// INIT + FIX ANDROID RESIZE BEHAVIOR
initResume();

// ⭐ Android fix: Visual viewport resize
if (window.visualViewport) {
    visualViewport.addEventListener("resize", () =>
        setTimeout(() => initResume(), 200)
    );
}

window.addEventListener("orientationchange", () =>
    setTimeout(() => initResume(), 300)
);

window.addEventListener("resize", () =>
    setTimeout(() => initResume(), 300)
);
