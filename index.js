/* ==========================================
   TOOLORA AI — PREMIUM INTERACTIONS
   Existing functionality preserved
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       Mobile Menu
    -------------------------- */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");

            const isOpen = mobileMenu.classList.contains("active");

            menuBtn.setAttribute("aria-expanded", String(isOpen));

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });

        });

    }


    /* -------------------------
       Search Filter
    -------------------------- */

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const value = this.value.toLowerCase().trim();

            document.querySelectorAll(".searchable .tool-card").forEach(card => {

                const text = card.textContent.toLowerCase();

                card.style.display = text.includes(value) ? "flex" : "none";

            });

        });

    }


    /* -------------------------
       Animated Statistics
    -------------------------- */

    const counters = document.querySelectorAll("[data-count]");

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = parseInt(counter.dataset.count, 10);

                if (Number.isNaN(target)) {
                    observer.unobserve(counter);
                    return;
                }

                let current = 0;

                const duration = 1200;
                const interval = 25;
                const steps = duration / interval;
                const increment = target / steps;

                const timer = setInterval(() => {

                    current += increment;

                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }

                    counter.textContent = Math.floor(current);

                }, interval);

                observer.unobserve(counter);

            });

        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(counter => {
            counter.textContent = counter.dataset.count;
        });

    }


    /* -------------------------
       Scroll To Top
    -------------------------- */

    const scrollTopBtn = document.getElementById("scrollTop");

    function updateScrollButton() {

        if (!scrollTopBtn) return;

        scrollTopBtn.style.display =
            window.scrollY > 500 ? "flex" : "none";

    }

    window.addEventListener("scroll", updateScrollButton, {
        passive: true
    });

    updateScrollButton();

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
    -------------------------- */

    const glowCards = document.querySelectorAll(
        ".tool-card, .feature-card, .stat-card, .why-card, .mini-card"
    );

    glowCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

        });

        card.addEventListener("mouseleave", () => {

            card.style.removeProperty("--mouse-x");
            card.style.removeProperty("--mouse-y");

        });

    });


    /* -------------------------
       Reveal Animation
    -------------------------- */

    const revealItems = document.querySelectorAll(
        ".tool-card, .feature-card, .stat-card, .why-card, .faq details"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.animate(
                    [
                        {
                            opacity: 0,
                            filter: "blur(4px)"
                        },
                        {
                            opacity: 1,
                            filter: "blur(0px)"
                        }
                    ],
                    {
                        duration: 550,
                        easing: "ease-out",
                        fill: "both"
                    }
                );

                observer.unobserve(entry.target);

            });

        }, {
            threshold: 0.12
        });

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

    }


    /* -------------------------
       Active Navbar Link
    -------------------------- */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const top = section.getBoundingClientRect().top;

            if (top <= 140) {
                current = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNav, {
        passive: true
    });

    updateActiveNav();


    /* -------------------------
       Close Mobile Menu on Outside Click
    -------------------------- */

    document.addEventListener("click", event => {

        if (!menuBtn || !mobileMenu) return;

        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedMenuButton = menuBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            mobileMenu.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });

});
