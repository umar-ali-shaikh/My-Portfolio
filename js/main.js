/* Main Application Entry Point */

import { initCursor } from './cursor.js';
import { initLoader } from './loader.js';
import { initMarquees } from './marquee.js';
import { initCarousel } from './carousel.js';
import { initSectionTracking, initScrollTop } from './scroll.js';
import { initResumeAnimation } from './resume.js';

document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initSectionTracking();
});

window.addEventListener("load", () => {
    initLoader();
});

initMarquees();
initCarousel();
initScrollTop();
initResumeAnimation();
