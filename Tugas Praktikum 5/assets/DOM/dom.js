// 1. Konfigurasi Aturan Validasi
const RULES = {
  name:  { test: (v) => v.length >= 3, msg: "Minimal 3 karakter" },
  email: { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Email tidak valid" },
  phone: { test: (v) => /^08\d{7,12}$/.test(v), msg: "Gunakan format 08xx" },
  pesan: { test: (v) => v.length >= 10, msg: "Pesan terlalu pendek" }
};

// 2. Fungsi Validasi & Error
function validate(field) {
  const rule = RULES[field.name];
  const errorSpan = document.getElementById(`${field.id}-error`) || createErrorSpan(field);
  
  const isValid = rule ? rule.test(field.value.trim()) : true;
  errorSpan.textContent = isValid ? "" : rule.msg;
  field.classList.toggle("is-invalid", !isValid);
  
  return isValid;
}

function createErrorSpan(field) {
  const span = document.createElement("span");
  span.id = `${field.id}-error`;
  span.className = "error-msg"; 
  field.after(span);
  return span;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input, textarea");


  inputs.forEach(el => {
    el.addEventListener("blur", () => validate(el));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;

    inputs.forEach(el => {
      if (!validate(el)) allValid = false;
    });

    if (allValid) {
      alert("Pesan Terkirim! 🎉");
      form.reset();
      inputs.forEach(el => el.classList.remove("is-invalid"));
    } else {
      form.querySelector(".is-invalid")?.focus();
    }
  });
});