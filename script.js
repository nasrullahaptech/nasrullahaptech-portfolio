/* ================= TYPING EFFECT ================= */

const typingElement = document.getElementById("typing");

const words = [
    "Full-Stack Developer",
    "Web Developer",
    "BS Computer Science",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;

            setTimeout(typeEffect, 1600);
            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 90
    );
}

typeEffect();


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
    });

});


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ================= COUNTERS ================= */

const counters =
    document.querySelectorAll(".counter");

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    Number(counter.dataset.target);

                let current = 0;

                const increment =
                    Math.max(1, Math.ceil(target / 40));

                const updateCounter = () => {

                    current += increment;

                    if (current >= target) {
                        counter.textContent = target;
                        return;
                    }

                    counter.textContent = current;

                    requestAnimationFrame(updateCounter);
                };

                updateCounter();

                counterObserver.unobserve(counter);
            });

        },
        {
            threshold: 1
        }
    );

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* ================= MOUSE GLOW ================= */

const glowOne =
    document.querySelector(".glow-one");

const glowTwo =
    document.querySelector(".glow-two");

document.addEventListener("mousemove", event => {

    const x = event.clientX;
    const y = event.clientY;

    glowOne.style.transform =
        `translate(${x * 0.03}px, ${y * 0.03}px)`;

    glowTwo.style.transform =
        `translate(${x * -0.02}px, ${y * -0.02}px)`;

});


/* ================= PROJECT CARD TILT ================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-7px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ================= YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();