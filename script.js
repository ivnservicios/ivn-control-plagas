document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav__menu").forEach((menu) => {
    const isAboutPage = new URL(window.location.href).pathname === "/nosotros.html";
    const aboutLink = Array.from(menu.querySelectorAll("a")).find(
      (link) => new URL(link.href, window.location.origin).pathname === "/nosotros.html"
    );

    if (aboutLink) {
      if (isAboutPage) aboutLink.setAttribute("aria-current", "page");
      return;
    }

    const link = document.createElement("a");
    link.href = "/nosotros.html";
    link.textContent = "Nosotros";
    if (isAboutPage) link.setAttribute("aria-current", "page");
    menu.insertBefore(link, menu.querySelector("a.btn"));
  });

  document.querySelectorAll(".footer__inner").forEach((footer) => {
    if (footer.querySelector(".footer__directory")) return;

    const links = [
      ["Control de plagas", "/control-de-plagas/"],
      ["Desratizaci&oacute;n", "/desratizacion-santiago.html"],
      ["Sanitizaci&oacute;n", "/sanitizacion-santiago.html"]
    ];
    const navigation = document.createElement("nav");
    navigation.className = "footer__directory";
    navigation.setAttribute("aria-label", "Servicios principales");
    navigation.innerHTML = `<span class="footer__label">Servicios</span>${links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}`;
    footer.insertBefore(navigation, footer.querySelector(".footer__links"));
  });

  const toggle = document.querySelector(".nav__toggle, .menu-btn");
  const menu = document.querySelector(".nav__menu, #menu");

  if (toggle && menu) {
    const closeMenu = (restoreFocus = false) => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("open")) closeMenu(true);
    });
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    document.addEventListener("focusin", (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
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

  // Persist an explicit opt-out on this browser so production QA stays out of GA4.
  const analyticsPreference = new URLSearchParams(window.location.search).get("ivn_analytics");
  let analyticsExcluded = analyticsPreference === "off";
  try {
    if (analyticsPreference === "off") window.localStorage.setItem("ivn_analytics_disabled", "1");
    if (analyticsPreference === "on") window.localStorage.removeItem("ivn_analytics_disabled");
    analyticsExcluded = analyticsExcluded || window.localStorage.getItem("ivn_analytics_disabled") === "1";
  } catch {
    // The URL opt-out still works when storage is unavailable.
  }
  const analyticsEnabled = !analyticsExcluded && ["ivnservicios.cl", "www.ivnservicios.cl"].includes(window.location.hostname);
  const serviceForPage = () => {
    const path = window.location.pathname;
    if (path.includes("limpieza-oficinas")) return "limpieza_oficinas";
    if (path.includes("aguas-servidas")) return "aguas_servidas";
    if (path.includes("sanitizacion")) return "sanitizacion";
    if (path.includes("desratizacion") || path.includes("control-de-ratones")) return "desratizacion";
    if (path.includes("desinsectacion") || /control-de-(aranas|chinches|cucarachas|hormigas|pulgas)/.test(path)) return "desinsectacion";
    if (path.includes("fumigacion")) return "fumigacion";
    if (path.includes("control-de-plagas")) return "control_plagas";
    return "general";
  };
  const planForForm = () => ({
    "1 vez por semana": "esencial",
    "2 veces por semana": "frecuente",
    "3 veces por semana": "intensivo",
    "No estoy seguro": "por_definir"
  })[document.querySelector('select[name="frequency"]')?.value] || "no_aplica";
  const referrerOrigin = () => {
    try { return new URL(document.referrer).origin; } catch { return ""; }
  };
  // Analytics receives document metadata, never query strings or form text.
  const analyticsLocation = document.querySelector('link[rel="canonical"]')?.href || window.location.origin + window.location.pathname;
  const analyticsContext = () => ({
    page_title: document.title,
    page_location: analyticsLocation,
    page_referrer: referrerOrigin(),
    service: serviceForPage(),
    plan: planForForm()
  });

  const analyticsId = document.querySelector('meta[name="google-analytics-id"]')?.content?.trim() || "G-GFX96N4X42";
  if (analyticsEnabled && analyticsId && /^G-[A-Z0-9]+$/i.test(analyticsId)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", analyticsId, analyticsContext());

    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${analyticsId}"]`)) {
      const analyticsScript = document.createElement("script");
      analyticsScript.async = true;
      analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
      document.head.appendChild(analyticsScript);
    }
  }

  const trackEvent = (eventName, params = {}) => {
    if (analyticsEnabled && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        ...analyticsContext(),
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

  document.querySelectorAll("[data-frequency]").forEach((link) => {
    link.addEventListener("click", () => {
      const frequency = document.querySelector('form[data-service="limpieza-oficinas"] select[name="frequency"]');
      if (!frequency) return;
      frequency.value = link.dataset.frequency;
      frequency.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  document.querySelectorAll("[data-event]").forEach((link) => {
    // Contact links use only the dedicated listener below.
    if (link.href.startsWith("https://wa.me/") || link.href.startsWith("mailto:")) return;
    link.addEventListener("click", () => {
      trackEvent(link.dataset.event);
    });
  });

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
        contact_channel: "whatsapp",
        placement: link.classList.contains("wa-float") ? "floating" : link.closest("#contacto") ? "contact" : "page"
      });
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("click_email", { contact_channel: "email" });
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
    const pauseButton = reviewCarousel.querySelector("[data-review-pause]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let userPaused = false;
    let currentIndex = 0;
    let autoPlayId = null;
    let dots = [];

    const updateReviewDots = () => {
      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentIndex);
        dot.setAttribute("aria-current", String(index === currentIndex));
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
      stopAutoPlay();
      if (cards.length <= 1 || userPaused || reducedMotion.matches || document.hidden || reviewCarousel.matches(":hover") || reviewCarousel.contains(document.activeElement)) return;
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

    pauseButton?.addEventListener("click", () => {
      userPaused = !userPaused;
      pauseButton.textContent = userPaused ? "Reanudar" : "Pausar";
      pauseButton.setAttribute("aria-pressed", String(userPaused));
      startAutoPlay();
    });
    const updateMotionPreference = () => {
      if (pauseButton) pauseButton.hidden = reducedMotion.matches;
      startAutoPlay();
    };
    reducedMotion.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", startAutoPlay);
    updateMotionPreference();
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

  const form = document.querySelector("form.form");
  if (!form) return;
  updateLeadContext(form);

  const feedback = document.getElementById("formFeedback");
  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = submitButton?.innerHTML;
  let isSubmitting = false;

  const setSubmitting = (pending) => {
    isSubmitting = pending;
    form.setAttribute("aria-busy", String(pending));
    if (submitButton) {
      submitButton.disabled = pending;
      if (pending) {
        submitButton.textContent = "Enviando…";
      } else {
        submitButton.innerHTML = submitLabel;
      }
    }
  };
  const requiredFields = Array.from(form.querySelectorAll("input[required], textarea[required]"));

  const setFieldState = (field) => {
    const value = field.value.trim();
    const label = field.closest("label");
    const isEmpty = value === "";

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
    if (isSubmitting) return;

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
    setSubmitting(true);
    let accepted = false;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        // Formspree uses the origin to validate domain restrictions.
        referrerPolicy: "strict-origin-when-cross-origin",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        // Keep the form locked until navigation, including the analytics delay.
        accepted = true;
        if (submitButton) submitButton.textContent = "Solicitud enviada";
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
        showFeedback(response.status === 429
          ? "El servicio de cotizaciones no está disponible temporalmente. Espera unos minutos o escríbenos por WhatsApp. Tus datos siguen en el formulario."
          : "No se pudo enviar la solicitud. Tus datos siguen en el formulario: intenta nuevamente o escríbenos por WhatsApp.");
      }
    } catch (error) {
      trackEvent("form_submit_error", {
        method: "formspree",
        status: "network"
      });
      showFeedback("No pudimos confirmar el envío por un problema de conexión. Tus datos siguen en el formulario. Revisa tu conexión o escríbenos por WhatsApp antes de repetir la solicitud.");
    } finally {
      if (!accepted) setSubmitting(false);
    }
  });
});
