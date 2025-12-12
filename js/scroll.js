/* Scroll Utilities */

export function initSectionTracking() {
    const sections = document.querySelectorAll(".sectionaddactive");

    function checkSection() {
        const winH = window.innerHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            section.classList.toggle("active", rect.top < winH - 150 && rect.bottom > 0);
        });
    }

    window.addEventListener("scroll", checkSection, { passive: true });
    checkSection();
}

export function initScrollTop() {
    window.addEventListener("beforeunload", () => scrollTo(0, 0));

    document.querySelector('.footer-top-arrow .footer-top-arrow-hlp')
        ?.addEventListener('click', () => scrollTo({ top: 0, behavior: "smooth" }));
}
