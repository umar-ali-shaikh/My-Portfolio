/* Resume Scroll Animation */

function initResume() {
    const resumeSection = document.querySelector(".my-resume-section .scroll-section");
    if (!resumeSection) return;

    const wrapper = resumeSection.querySelector(".list");
    const cards = [...wrapper.querySelectorAll(".item")];

    const isMobile = window.innerWidth <= 576;

    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.set(cards, { clearProps: "all" });

    if (isMobile) {
        cards.forEach((card, i) => {
            gsap.set(card, {
                position: "relative",
                left: "auto",
                top: "auto",
                transform: "none",
                y: 0,
                scale: 1,
                marginBottom: i < cards.length - 1 ? "30px" : "0"
            });
        });
        return;
    }

    const cardHeight = 600;
    const gap = 50;
    const extraGap = 100;
    const safeHeight = window.innerHeight;

    cards.forEach((card, i) => {
        gsap.set(card, {
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
            y: i === 0 ? 0 : i * (cardHeight + gap) + (i === 1 ? extraGap : 0)
        });
    });

    const endValue =
        (cards.length * cardHeight) +
        ((cards.length - 1) * gap) +
        extraGap - safeHeight;

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: resumeSection,
            start: "top top",
            end: "+=" + endValue,
            scrub: 1,
            pin: true,
            pinType: "transform",
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });

    cards.forEach((card, i) => {
        if (i === 0) return;

        tl.to(cards[i - 1], {
            scale: 0.9,
            borderRadius: "12px",
            duration: 0.6
        });

        tl.to(card, {
            y: 0,
            duration: 0.8,
            ease: "power1.out"
        }, "<0.2");
    });

    ScrollTrigger.refresh();
}

export function initResumeAnimation() {
    initResume();
    window.addEventListener("resize", () => setTimeout(initResume, 100));
}
