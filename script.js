document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle, .menu-btn");
  const menu = document.querySelector(".nav__menu, #menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const sendWA = document.getElementById("sendWA");
  if (sendWA) {
    sendWA.addEventListener("click", () => {
      const name = document.querySelector('input[name="name"]')?.value?.trim() || "";
      const phone = document.querySelector('input[name="phone"]')?.value?.trim() || "";
      const place = document.querySelector('input[name="place"]')?.value?.trim() || "";
      const msg = document.querySelector('textarea[name="message"]')?.value?.trim() || "";

      const text =
`Hola, quiero cotizar control de plagas.
Nombre: ${name || "-"}
Telefono/WhatsApp: ${phone || "-"}
Comuna/Direccion: ${place || "-"}
Problema: ${msg || "-"}

Me pueden indicar disponibilidad y valor?`;

      const url = "https://wa.me/56958829194?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener");
    });
  }

  const form = document.querySelector("form.form");
  if (!form) return;
  const feedback = document.getElementById("formFeedback");
  const requiredFields = Array.from(form.querySelectorAll("input[required], textarea[required]"));

  const setFieldState = (field) => {
    const value = field.value.trim();
    const label = field.closest("label");
    const isEmpty = value === "";

    if (!isEmpty) field.value = value;

    field.classList.toggle("is-invalid", isEmpty);
    field.setAttribute("aria-invalid", String(isEmpty));
    if (label) label.classList.toggle("has-error", isEmpty);

    return !isEmpty;
  };

  const showFeedback = (message) => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.hidden = false;
  };

  const clearFeedback = () => {
    if (!feedback) return;
    feedback.textContent = "";
    feedback.hidden = true;
  };

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.value.trim() !== "") {
        setFieldState(field);
      }

      if (requiredFields.every((item) => item.value.trim() !== "")) {
        clearFeedback();
      }
    });

    field.addEventListener("blur", () => {
      setFieldState(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const invalidFields = requiredFields.filter((field) => !setFieldState(field));

    if (invalidFields.length > 0) {
      showFeedback("Completa todos los campos antes de enviar la cotizacion.");
      invalidFields[0].focus();
      return;
    }

    clearFeedback();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        window.location.href = "/gracias.html";
      } else {
        alert("No se pudo enviar el formulario. Intenta nuevamente.");
      }
    } catch (error) {
      alert("Error de conexion. Intenta nuevamente.");
    }
  });
});
