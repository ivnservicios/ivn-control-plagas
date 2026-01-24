// ========= MENU (seguro, no se rompe si no existe) =========
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle, .menu-btn"); // soporta ambas clases
  const menu = document.querySelector(".nav__menu, #menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    // Cierra al hacer click en un link del menú
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => menu.classList.remove("open"));
    });
  }

  // ========= AÑO FOOTER (si existe) =========
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ========= BOTÓN WHATSAPP (si existe) =========
  const sendWA = document.getElementById("sendWA");
  if (sendWA) {
    sendWA.addEventListener("click", () => {
      const name = document.querySelector('input[name="name"]')?.value?.trim() || "";
      const phone = document.querySelector('input[name="phone"]')?.value?.trim() || "";
      const place = document.querySelector('input[name="place"]')?.value?.trim() || "";
      const msg = document.querySelector('textarea[name="message"]')?.value?.trim() || "";

      const text =
`Hola, quiero cotizar control de plagas.
👤 Nombre: ${name || "-"}
📞 Teléfono/WhatsApp: ${phone || "-"}
📍 Comuna/Dirección: ${place || "-"}
🐞 Problema: ${msg || "-"}

¿Me pueden indicar disponibilidad y valor?`;

      const url = "https://wa.me/56958829194?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener");
    });
  }

  // ========= FORMULARIO (captura submit y redirige a TU gracias.html) =========
  const form = document.querySelector("form.form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      if (res.ok) {
        // ✅ Redirección a tu página (sin pasar por thank-you de Formspree)
        window.location.href = "/gracias.html";
      } else {
        alert("No se pudo enviar el formulario. Intenta nuevamente.");
      }
    } catch (err) {
      alert("Error de conexión. Intenta nuevamente.");
    }
  });
});
