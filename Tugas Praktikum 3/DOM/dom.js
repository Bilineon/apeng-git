// ============================================
// DOM.JS — Interactive Enhancements
// Asmaratungga Profile Website
// ============================================

// ============================================
// 1. FORM VALIDATION RULES
// ============================================
const RULES = {
  name:  { test: (v) => v.length >= 3,                       msg: "Nama minimal 3 karakter" },
  email: { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Format email tidak valid" },
  phone: { test: (v) => /^08\d{7,12}$/.test(v),              msg: "Gunakan format 08xxxxxxxxx" },
  pesan: { test: (v) => v.length >= 10,                      msg: "Pesan terlalu pendek (min. 10 karakter)" }
};

// ============================================
// 2. VALIDATE FIELD FUNCTION
// ============================================
function validate(field) {
  const rule = RULES[field.name];
  const errorSpan = document.getElementById(`${field.id}-error`) || createErrorSpan(field);

  const isValid = rule ? rule.test(field.value.trim()) : true;
  errorSpan.textContent = isValid ? "" : rule.msg;
  field.classList.toggle("is-invalid", !isValid);
  if (isValid) field.style.borderColor = "";

  return isValid;
}

function createErrorSpan(field) {
  const span = document.createElement("span");
  span.id = `${field.id}-error`;
  span.className = "error-msg";
  field.after(span);
  return span;
}

// ============================================
// 3. SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ============================================
// 4. SKILL BAR ANIMATIONS
// ============================================
function initSkillBars() {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".skill-bar-fill");
        fills.forEach((fill) => {
          const targetWidth = fill.dataset.width;
          fill.style.transform = `scaleX(${targetWidth})`;
          fill.classList.add("animated");
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillSection = document.getElementById("skill");
  if (skillSection) barObserver.observe(skillSection);
}

// ============================================
// 5. STICKY NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
  const header = document.getElementById("mainHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

// ============================================
// 6. ACTIVE NAV LINK HIGHLIGHT
// ============================================
function initActiveNav() {
  const sections = document.querySelectorAll("section[id], .hero");
  const navLinks = document.querySelectorAll("nav ul li a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.style.color = "";
          if (link.getAttribute("href") === `#${id}`) {
            link.style.color = "#a78bfa";
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((s) => observer.observe(s));
}

// ============================================
// 7. HAMBURGER MENU (MOBILE)
// ============================================
function initHamburger() {
  const btn = document.getElementById("hamburgerBtn");
  const navList = document.getElementById("navList");
  if (!btn || !navList) return;

  btn.addEventListener("click", () => {
    navList.classList.toggle("open");
    btn.setAttribute("aria-expanded", navList.classList.contains("open"));
  });

  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") btn.click();
  });

  // Close on nav link click
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navList.classList.remove("open"));
  });
}

// ============================================
// 8. CURSOR GLOW EFFECT
// ============================================
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;
  if (window.matchMedia("(pointer: coarse)").matches) {
    glow.style.display = "none"; // Hide on touch devices
    return;
  }

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }, { passive: true });
}

// ============================================
// 9. FLOATING PARTICLES
// ============================================
function initParticles() {
  const colors = ["#7c3aed", "#6366f1", "#06b6d4", "#ec4899"];
  const count = 12;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 12;
    const delay = Math.random() * 15;
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -${size}px;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.4 + 0.1};
    `;

    document.body.appendChild(p);
  }
}

// ============================================
// 10. SMOOTH COUNTER ANIMATION (Hero Stats)
// ============================================
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const increment = target / (duration / 16);
  const isDecimal = target.toString().includes(".");

  const step = () => {
    start += increment;
    if (start < target) {
      el.textContent = isDecimal ? start.toFixed(1) : Math.floor(start) + "+";
      requestAnimationFrame(step);
    } else {
      el.textContent = isDecimal ? target.toFixed(1) : target + "+";
    }
  };

  requestAnimationFrame(step);
}

function initCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const observed = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseFloat(text);
        if (!isNaN(num)) animateCounter(el, num);
        observed.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => observed.observe(el));
}

// ============================================
// 11. FORM SUBMISSION
// ============================================
function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((el) => {
    el.addEventListener("blur", () => validate(el));
    el.addEventListener("input", () => {
      if (el.classList.contains("is-invalid")) validate(el);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;

    inputs.forEach((el) => {
      if (!validate(el)) allValid = false;
    });

    if (allValid) {
      const btn = document.getElementById("submitBtn");
      btn.innerHTML = "<span>✅ Terkirim!</span>";
      btn.style.background = "linear-gradient(135deg, #10b981, #059669)";
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        inputs.forEach((el) => el.classList.remove("is-invalid"));
        btn.innerHTML = "<span>Kirim Pesan</span><span>✦</span>";
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    } else {
      form.querySelector(".is-invalid")?.focus();
    }
  });
}

// ============================================
// 12. INIT ALL
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  initSkillBars();
  initNavbarScroll();
  initActiveNav();
  initHamburger();
  initCursorGlow();
  initParticles();
  initCounters();
  initForm();
});