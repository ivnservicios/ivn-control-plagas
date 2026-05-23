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

  const pageContext = () => ({
    page_title: document.title,
    page_path: window.location.pathname,
    page_url: window.location.href,
    page_h1: document.querySelector("h1")?.textContent?.trim() || "",
    referrer: document.referrer || "directo"
  });

  const analyticsId = document.querySelector('meta[name="google-analytics-id"]')?.content?.trim() || "G-GFX96N4X42";
  if (analyticsId && /^G-[A-Z0-9]+$/i.test(analyticsId)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", analyticsId);

    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${analyticsId}"]`)) {
      const analyticsScript = document.createElement("script");
      analyticsScript.async = true;
      analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
      document.head.appendChild(analyticsScript);
    }
  }

  const trackEvent = (eventName, params = {}) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        ...pageContext(),
        ...params
      });
      return true;
    }

    return false;
  };

  const setHiddenField = (formElement, name, value) => {
    let field = formElement.querySelector(`input[name="${name}"]`);
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      formElement.appendChild(field);
    }

    field.value = value || "";
  };

  const updateLeadContext = (formElement) => {
    const context = pageContext();
    Object.entries(context).forEach(([name, value]) => setHiddenField(formElement, name, value));
    setHiddenField(formElement, "lead_source", "sitio_web");
  };

  if (!document.querySelector(".wa-float")) {
    const whatsappFloat = document.createElement("a");
    whatsappFloat.className = "wa-float";
    whatsappFloat.href = "https://wa.me/56958829194";
    whatsappFloat.target = "_blank";
    whatsappFloat.rel = "noopener noreferrer";
    whatsappFloat.setAttribute("aria-label", "Escribir por WhatsApp");
    whatsappFloat.innerHTML = `
      <span class="wa-float__icon" aria-hidden="true">
        <i class="fa-brands fa-whatsapp"></i>
      </span>
      <span class="wa-float__text">WhatsApp</span>
    `;
    document.body.appendChild(whatsappFloat);
  }

  document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("click_whatsapp", {
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("click_email", {
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    });
  });

  const reviewCarousel = document.querySelector("[data-review-carousel]");
  if (reviewCarousel) {
    const viewport = reviewCarousel.querySelector(".review-carousel__viewport");
    const track = reviewCarousel.querySelector("[data-review-track]");
    const cards = track ? Array.from(track.querySelectorAll(".review-card")) : [];
    const prevButton = reviewCarousel.querySelector("[data-review-prev]");
    const nextButton = reviewCarousel.querySelector("[data-review-next]");
    const dotsContainer = reviewCarousel.querySelector("[data-review-dots]");
    let currentIndex = 0;
    let autoPlayId = null;
    let dots = [];

    const updateReviewDots = () => {
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex);
      });
    };

    const updateReviewPosition = () => {
      if (!track || cards.length === 0) return;
      const offset = cards[currentIndex]?.offsetLeft || 0;
      track.style.transform = `translateX(-${offset}px)`;
      updateReviewDots();
    };

    const goToReview = (index) => {
      if (!track || cards.length === 0) return;

      if (index < 0) {
        currentIndex = cards.length - 1;
      } else if (index >= cards.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      updateReviewPosition();
    };

    const stopAutoPlay = () => {
      if (autoPlayId) {
        window.clearInterval(autoPlayId);
        autoPlayId = null;
      }
    };

    const startAutoPlay = () => {
      if (cards.length <= 1) return;
      stopAutoPlay();
      autoPlayId = window.setInterval(() => {
        goToReview(currentIndex + 1);
      }, 5000);
    };

    const resetAutoPlay = () => {
      stopAutoPlay();
      startAutoPlay();
    };

    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      dots = cards.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "review-carousel__dot";
        dot.setAttribute("aria-label", `Ir a resena ${index + 1}`);
        dot.addEventListener("click", () => {
          goToReview(index);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
        return dot;
      });
    }

    prevButton?.addEventListener("click", () => {
      goToReview(currentIndex - 1);
      resetAutoPlay();
    });

    nextButton?.addEventListener("click", () => {
      goToReview(currentIndex + 1);
      resetAutoPlay();
    });

    reviewCarousel.addEventListener("mouseenter", stopAutoPlay);
    reviewCarousel.addEventListener("mouseleave", startAutoPlay);
    reviewCarousel.addEventListener("focusin", stopAutoPlay);
    reviewCarousel.addEventListener("focusout", () => {
      if (!reviewCarousel.contains(document.activeElement)) {
        startAutoPlay();
      }
    });

    let touchStartX = 0;

    track?.addEventListener("touchstart", (event) => {
      touchStartX = event.touches[0]?.clientX || 0;
      stopAutoPlay();
    }, { passive: true });

    track?.addEventListener("touchend", (event) => {
      const touchEndX = event.changedTouches[0]?.clientX || 0;
      const delta = touchEndX - touchStartX;

      if (Math.abs(delta) > 40) {
        goToReview(currentIndex + (delta < 0 ? 1 : -1));
      }

      startAutoPlay();
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (viewport?.offsetParent !== null) {
        updateReviewPosition();
      }
    });

    updateReviewPosition();
    startAutoPlay();
  }

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
      trackEvent("click_whatsapp_form_helper", {
        contact_place: place,
        contact_problem: msg
      });
      window.open(url, "_blank", "noopener");
    });
  }

  const form = document.querySelector("form.form");
  if (!form) return;
  updateLeadContext(form);

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
      trackEvent("form_validation_error", {
        missing_fields: invalidFields.map((field) => field.name).join(",")
      });
      invalidFields[0].focus();
      return;
    }

    clearFeedback();
    updateLeadContext(form);

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        const redirectToThanks = () => {
          window.location.href = "/gracias.html";
        };
        const wasTracked = trackEvent("generate_lead", {
          method: "formspree"
        });

        if (wasTracked) {
          window.setTimeout(redirectToThanks, 500);
        } else {
          redirectToThanks();
        }
      } else {
        trackEvent("form_submit_error", {
          method: "formspree",
          status: response.status
        });
        alert("No se pudo enviar el formulario. Intenta nuevamente.");
      }
    } catch (error) {
      trackEvent("form_submit_error", {
        method: "formspree",
        status: "network"
      });
      alert("Error de conexion. Intenta nuevamente.");
    }
  });
});
