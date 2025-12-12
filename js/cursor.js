/* Custom Mouse Cursor */

export function initCursor() {
    const portfolioDot = document.querySelector(".portfolio-dot");

    if (!portfolioDot) return;

    document.addEventListener("mousemove", e => {
        portfolioDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}
