// Custom cursor dot
let portfolioDot = document.querySelector(".portfolio-dot");

window.addEventListener("mousemove", (event) => {
    const portfolioDotX = event.clientX;
    const portfolioDotY = event.clientY;
    MoveDot(portfolioDotX, portfolioDotY);
});

function MoveDot(portfolioDotX, portfolioDotY) {
    if (portfolioDot) {
        portfolioDot.style.position = "fixed";
        portfolioDot.style.top = portfolioDotY + "px";
        portfolioDot.style.left = portfolioDotX + "px";
    }
}


// active for all section
document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll(".sectionaddactive");

    function checkSection() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top < window.innerHeight - 150 && rect.bottom > 0) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", checkSection);
    checkSection();
});



// -----------------------------
// ⏳ LOADER + WAVE ANIMATION
// -----------------------------

window.addEventListener('load', () => {
    const wave = document.querySelector('.wave-svg');
    const loader = document.getElementById('portfolioLoader');

    // Move wave upward
    setTimeout(() => {
        wave.style.transform = 'translateY(-150vh)';
    }, 100);

    // Fade out loader after wave
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 2500);
});



// -----------------------------
// skill shower
// -----------------------------

gsap.registerPlugin(ScrollTrigger);

// TRACK (the moving container)
const track = document.querySelector(".animated-skills-hlp .animated-skills");

// ITEMS inside track
const itemss = gsap.utils.toArray(".animated-skills-hlp .animated-skills-wrapper");

// Calculate full width of ONE loop
let totalWidth = 0;
itemss.forEach(i => {
    totalWidth += i.offsetWidth + 50;
});

// Move TRACK for seamless loop
gsap.to(track, {
    x: -(totalWidth / 2),  // move half (original content)
    duration: 100,
    ease: "linear",
    repeat: -1
});


// footer slide
const footerTrack1 = document.querySelector(".animated-contactslide .animated-skills-hlp-cross1 .animated-skills");

// FOOTER ITEMS
const footerItems1 = gsap.utils.toArray(".animated-contactslide .animated-skills-hlp-cross1 .animated-skills-wrapper");

// Width of loop
let footerWidth1 = 0;
footerItems1.forEach(i => {
    footerWidth1 += i.offsetWidth + 50;
});

// Animate footer track EXACT like hero
gsap.to(footerTrack1, {
    x: -(footerWidth1 / 2),
    duration: 50,
    ease: "linear",
    repeat: -1
});




const cross1Track = document.querySelector(".animated-contactslide .animated-skills-hlp-cross2 .animated-skills");
const cross1Items = gsap.utils.toArray(".animated-contactslide .animated-skills-hlp-cross2 .animated-skills-wrapper");

// Calculate total width
let cross1Width = 0;
cross1Items.forEach(item => {
    cross1Width += item.offsetWidth + 20;
});

// END se START direction me animate
gsap.fromTo(cross1Track,
    { x: -(cross1Width / 2) },  // ❌ Start at LAST position
    {
        x: 0,                   // ➡️ Move back to START
        duration: 50,
        ease: "linear",
        repeat: -1
    }
);






// -----------------------------
// 🎠 CAROUSEL FUNCTIONALITY
// -----------------------------

// Carousel elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.list');
let thumbnailBorderDom = carouselDom.querySelector('.thumbnail');

let timeRunning = 3000;   // animation duration (ms)
let timeAutoNext = 7000;  // auto next interval (ms)

// Initialize thumbnails in correct order
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Auto next timer
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

// Click events
nextDom.onclick = () => showSlider('next');
prevDom.onclick = () => showSlider('prev');

let runTimeOut;
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.item');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    // Disable navigation temporarily
    nextDom.style.pointerEvents = 'none';
    prevDom.style.pointerEvents = 'none';

    if (type === 'next') {
        carouselDom.classList.add('next');
        SliderDom.appendChild(SliderItemsDom[0]); // Move first slide to end
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]); // Move first thumb to end
    }
    else if (type === 'prev') {
        carouselDom.classList.add('prev');
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]); // Move last slide to start
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]); // Move last thumb to start
    }

    // Reset animation state
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next', 'prev');
        nextDom.style.pointerEvents = 'auto';
        prevDom.style.pointerEvents = 'auto';
    }, timeRunning);

    // Reset auto timer
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => nextDom.click(), timeAutoNext);
}






// -----------------------------
// Scroll to top on refresh if user is scrolled
// -----------------------------
// Force scroll to top on page load
// window.addEventListener("beforeunload", function () {
//     window.scrollTo(0, 0);
// });

// // OR for some browsers, also on DOMContentLoaded
// window.addEventListener("DOMContentLoaded", () => {
//     window.scrollTo(0, 0);
// });


gsap.registerPlugin(ScrollTrigger);

const resumeSection = document.querySelector(".my-resume-section .scroll-section");
const wrapper = resumeSection.querySelector(".list");
let items = wrapper.querySelectorAll(".item");

const cardHeight = 600;
const gap = 50;
const extraGap = 100;

/* -----------------------------------------
   MOBILE HEIGHT FIX (VERY IMPORTANT)
----------------------------------------- */
function getSafeHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
}

function updateVH() {
    let vh = getSafeHeight() * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}
updateVH();

/* Recalculate on resize/orientation */
window.addEventListener("resize", updateVH);
window.addEventListener("orientationchange", () => {
    setTimeout(() => {
        updateVH();
        ScrollTrigger.refresh(true);
    }, 500);
});

/* -----------------------------------------
   POSITION CARDS
----------------------------------------- */
function setupPositions() {
    items.forEach((item, index) => {
        item.style.position = "absolute";
        item.style.top = "0";
        item.style.left = "50%";
        item.style.transform = "translateX(-50%)";

        if (index === 0) {
            gsap.set(item, { y: 0 });
            item.classList.add("active");
        } else {
            const extra = index === 1 ? extraGap : 0;
            gsap.set(item, {
                y: index * (cardHeight + gap) + extra
            });
        }
    });
}

/* -----------------------------------------
   CALCULATE SCROLL END (MOBILE SAFE)
----------------------------------------- */
function calcScrollEnd() {
    const totalCards = items.length;

    const totalHeight =
        (totalCards * cardHeight) +
        ((totalCards - 1) * gap) +
        extraGap;

    const safeH = getSafeHeight(); // 👈 mobile fix

    return totalHeight - safeH;
}

let tl;

/* -----------------------------------------
   CREATE TIMELINE
----------------------------------------- */
function createTimeline() {
    if (tl) tl.kill();

    tl = gsap.timeline({
        scrollTrigger: {
            trigger: resumeSection,
            start: "top top",
            end: () => "+=" + calcScrollEnd(),
            scrub: 1,
            pin: true,
            pinType: resumeSection.style.transform ? "transform" : "fixed",   // 👈 MOBILE PIN FIX
            invalidateOnRefresh: true,
        },
    });

    items.forEach((item, index) => {
        if (index === 0) return;

        const prev = items[index - 1];

        tl.to(prev, {
            scale: 0.9,
            borderRadius: "12px",
            duration: 0.8
        }, "+=0");

        tl.to(item, {
            y: 0,
            duration: 1,
            ease: "power1.out",
            onStart: () => {
                items.forEach(i => i.classList.remove("active"));
                item.classList.add("active");

                const video = item.querySelector("video");
                if (video) video.play();
            },
        }, "<0.2");
    });
}

/* -----------------------------------------
   INITIAL RUN
----------------------------------------- */
setupPositions();
createTimeline();

/* -----------------------------------------
   RESPONSIVE FIX
----------------------------------------- */
window.addEventListener("resize", () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
    setupPositions();
    createTimeline();
    ScrollTrigger.refresh();
});




// back to top

document.querySelector('.footer-top-arrow .footer-top-arrow-hlp')
    .addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
