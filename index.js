/* ========================= */
/* index.js — Part 3 (Complete) */
/* ========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       Mobile Menu
    --------------------------*/

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
            });
        });

    }

    /* -------------------------
       Search Filter
    --------------------------*/

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const value = this.value.toLowerCase().trim();

            document.querySelectorAll(".searchable .tool-card").forEach(card => {

                const text = card.textContent.toLowerCase();

                if (text.includes(value)) {

                    card.style.display = "flex";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

    /* -------------------------
       Animated Statistics
    --------------------------*/

    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.count);

            let current = 0;

            const step = Math.max(1, Math.ceil(target / 50));

            const timer = setInterval(() => {

                current += step;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent = current;

            }, 25);

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));

    /* -------------------------
       Scroll To Top
    --------------------------*/

    const scrollTopBtn = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        if (!scrollTopBtn) return;

        if (window.scrollY > 500) {

            scrollTopBtn.style.display = "flex";

        } else {

            scrollTopBtn.style.display = "none";

        }

    });

    if (scrollTopBtn) {

        scrollTopBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    /* -------------------------
       Card Hover Glow
    --------------------------*/

    document.querySelectorAll(".tool-card,.feature-card,.stat-card,.why-card,.mini-card")
        .forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.background =
                    `radial-gradient(circle at ${x}px ${y}px,
                    rgba(79,124,255,.16),
                    rgba(255,255,255,.05) 55%)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.background = "";

            });

        });

    /* -------------------------
       Reveal Animation
    --------------------------*/

    const revealItems = document.querySelectorAll(
        ".tool-card,.feature-card,.stat-card,.why-card,.faq details"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.animate([
                    {
                        opacity: 0,
                        transform: "translateY(40px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ], {
                    duration: 600,
                    easing: "ease-out",
                    fill: "forwards"
                });

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealItems.forEach(item => revealObserver.observe(item));

    /* -------------------------
       Active Navbar Link
    --------------------------*/

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            if (window.scrollY >= top) {
                current = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

});

