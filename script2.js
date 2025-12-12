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
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const carousel = document.querySelector('.carousel');

if (carousel && nextBtn && prevBtn) {

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
}


/* ---------------------------------------------
   SCROLL TOP ON LOAD + BACK TO TOP
---------------------------------------------- */
window.addEventListener("beforeunload", () => scrollTo(0, 0));

document.querySelector('.footer-top-arrow .footer-top-arrow-hlp')
    ?.addEventListener('click', () => scrollTo({ top: 0, behavior: "smooth" }));


/* ---------------------------------------------
RESUME SECTION SCROLL ANIMATION (Unified)
---------------------------------------------- */
function initResume(isMobile) {

    const resumeSection = document.querySelector(".my-resume-section .scroll-section");
    if (!resumeSection) return;

    const wrapper = resumeSection.querySelector(".list");
    const cards = [...wrapper.querySelectorAll(".item")];

    const cardHeight = 600;
    const gap = 50;
    const extraGap = 100;

    function safeHeight() {
        return isMobile
            ? (window.visualViewport?.height || window.innerHeight)
            : window.innerHeight;
    }

    function setupPositions() {
        cards.forEach((card, i) => {
            card.style.position = "absolute";
            card.style.left = "50%";
            card.style.top = 0;
            card.style.transform = "translateX(-50%)";

            gsap.set(card, {
                y: i === 0 ? 0 : i * (cardHeight + gap) + (i === 1 ? extraGap : 0)
            });
        });
    }

    function scrollEnd() {
        const total = cards.length;
        return (total * cardHeight) + ((total - 1) * gap) + extraGap - safeHeight();
    }

    ScrollTrigger.getAll().forEach(st => st.kill());
    setupPositions();

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: resumeSection,
            start: "top top",
            end: "+=" + scrollEnd(),
            scrub: 1,
            pin: true,
            pinType: isMobile ? "sticky" : "fixed",
            invalidateOnRefresh: true
        }
    });

    cards.forEach((card, i) => {
        if (i === 0) return;

        let prev = cards[i - 1];

        tl.to(prev, { scale: 0.9, borderRadius: "12px", duration: 0.6 });
        tl.to(card, { y: 0, duration: 0.8, ease: "power1.out" }, "<0.2");
    });

    ScrollTrigger.refresh();
}

function initResumeHandler() {
    initResume(window.innerWidth < 576);
}

initResumeHandler();
window.addEventListener("resize", () => setTimeout(initResumeHandler, 300));
