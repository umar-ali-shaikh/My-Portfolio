/* Page Loader & Wave Animation */

export function initLoader() {
    const wave = document.querySelector('.wave-svg');
    const loader = document.getElementById('portfolioLoader');

    if (wave) {
        wave.style.transform = 'translateY(-150vh)';
    }

    setTimeout(() => {
        loader?.classList.add('fade-out');
    }, 2500);
}
