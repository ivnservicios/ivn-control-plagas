const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

toggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

menu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => menu.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

// Enviar WhatsApp con mensaje armado
document.getElementById("sendWA").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const place = document.getElementById("place").value.trim();
  const msg = document.getElementById("msg").value.trim();

  const text =
`Hola, soy ${name || "___"}.
Quiero cotizar control de plagas.

📍 Comuna/Dirección: ${place || "___"}
🐛 Problema: ${msg || "___"}

¿Me pueden indicar disponibilidad y valor?`;

  const url = "https://wa.me/56958829194?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener");
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        // ✅ Redirección a tu propia página
        window.location.href = "/gracias.html";
      } else {
        // ❌ Algo falló (Formspree rechazó)
        alert("No se pudo enviar el formulario. Intenta nuevamente.");
      }
    } catch (err) {
      alert("Error de conexión. Intenta nuevamente.");
    }
  });
});
