/* ════════════════════════════════════════════
   ANGEL DARLA PORTFOLIO  |  script.js
   ════════════════════════════════════════════ */

/* ── Scroll-reveal for sections ───────────────
   Fades + slides each <section class="section"> into view the
   first time it crosses into the viewport, then stops watching it. */
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


/* ── Active nav link on scroll ─────────────────
   Highlights the nav link matching whichever section is
   currently centred in the viewport. */
const navLinks = document.querySelectorAll(".nav__links a[href^='#']");
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


/* ── Subtle nav background on scroll ──────────
   Adds a translucent, blurred background to the fixed nav
   once the page has scrolled a bit, so text stays readable. */
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


/* ── Project filtering ─────────────────────────
   Each .project-card carries a space-separated data-category
   attribute (e.g. data-category="ml healthcare"). Clicking a
   filter button shows only the cards whose category list
   includes the button's data-filter value ("all" shows every card). */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const emptyMessage = document.querySelector(".projects__empty");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        // Toggle the active state on the buttons
        filterButtons.forEach((b) => b.classList.remove("is-active"));
        button.classList.add("is-active");

        let visibleCount = 0;

        projectCards.forEach((card) => {
            const categories = (card.dataset.category || "").split(" ");
            const matches = filter === "all" || categories.includes(filter);
            card.classList.toggle("is-hidden", !matches);
            if (matches) visibleCount += 1;
        });

        // Let the visitor know if a filter genuinely has nothing (yet)
        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    });
});


/* ── Copy email to clipboard ───────────────────
   Clicking the Email contact link copies the address instead of
   (only) opening a mail client, since many visitors are on desktop
   without a mail app configured. Falls back to the normal mailto:
   behaviour if the Clipboard API isn't available. */
const emailLink = document.getElementById("email-link");
const toast = document.getElementById("toast");
let toastTimeout;

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

if (emailLink && navigator.clipboard) {
    emailLink.addEventListener("click", (event) => {
        event.preventDefault(); // stop the mailto: navigation
        const email = emailLink.dataset.email;
        navigator.clipboard
            .writeText(email)
            .then(() => showToast("Email copied to clipboard ✓"))
            .catch(() => {
                // Clipboard write failed (e.g. permissions) — fall back to mailto:
                window.location.href = `mailto:${email}`;
            });
    });
}


/* ── Back-to-top button ────────────────────────
   Appears after scrolling past one viewport height and
   smooth-scrolls back to the hero when clicked. */
const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
    window.addEventListener(
        "scroll",
        () => {
            backToTopButton.classList.toggle("is-visible", window.scrollY > window.innerHeight);
        },
        { passive: true }
    );

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* ── Footer year ────────────────────────────────
   Keeps the copyright-style line in the footer accurate
   without needing to hand-edit it every year. */
const footerYear = document.getElementById("footer-year");
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}
