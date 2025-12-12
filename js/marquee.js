/* Marquee/Ticker Animations */

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

export function initMarquees() {
    createMarquee(
        ".animated-skills-hlp .animated-skills",
        ".animated-skills-wrapper",
        100
    );

    createMarquee(
        ".animated-contactslide .animated-skills-hlp-cross1 .animated-skills",
        ".animated-skills-hlp-cross1 .animated-skills-wrapper",
        50
    );

    createMarquee(
        ".animated-contactslide .animated-skills-hlp-cross2 .animated-skills",
        ".animated-skills-hlp-cross2 .animated-skills-wrapper",
        50,
        true
    );
}
