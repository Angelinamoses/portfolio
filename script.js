/* ════════════════════════════════════════════
   ANGELINA PORTFOLIO  |  script.js
   ════════════════════════════════════════════ */

// ── Scroll-reveal for sections ───────────────
const sections = document.querySelectorAll(".section");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target); // fire once
            }
        });
    },
    { threshold: 0.12 }
);

sections.forEach((section) => revealObserver.observe(section));


// ── Active nav link on scroll ─────────────────
const navLinks = document.querySelectorAll(".nav__links a");
const sectionTargets = document.querySelectorAll("main section[id], header[id]");

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            }
        });
    },
    { threshold: 0.4, rootMargin: "-60px 0px -60px 0px" }
);

sectionTargets.forEach((sec) => navObserver.observe(sec));


// ── Subtle nav background on scroll ──────────
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.style.background = "rgba(8,11,15,0.9)";
        nav.style.backdropFilter = "blur(16px)";
        nav.style.borderBottom = "1px solid rgba(0,247,255,0.08)";
    } else {
        nav.style.background = "";
        nav.style.backdropFilter = "";
        nav.style.borderBottom = "";
    }
}, { passive: true });
