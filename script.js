/**
 * MariquinA Restauración - Lógica ligera en JavaScript puro
 * Incluye:
 * 1. Selector de idioma Español (ES) / Inglés (EN).
 * 2. Tarjetas de reseñas destacadas en ambos idiomas.
 * 3. Estado de apertura en tiempo real según horario de España (Europe/Madrid).
 * 4. Botones de copiado rápido y menú móvil.
 */

let currentLang = localStorage.getItem("mariquina_lang") || "es";

const TRANSLATIONS = {
  es: {
    brand_sub: "Restauración",
    nav_contact: "Contacto y Horario",
    nav_location: "Ubicación",
    nav_reviews: "Reseñas",
    hero_title_prefix: "El sabor de la tradición en",
    hero_desc:
      "Cocina tradicional elaborada con mimo, producto de cercanía y el trato cercano de siempre en Badajoz. Un rincón luminoso y acogedor con terraza donde disfrutar de la buena mesa.",
    hero_cta_whatsapp: "Contactar por WhatsApp",
    hero_quick_hours: "Mar – Sáb: 11:30 a 0:00 · Dom noche y Lun cerrado",
    hero_floating_title: "Cocina de Raíz y Tradición",
    contact_eyebrow: "Atención Cercana",
    contact_title: "Contacto y Horario",
    contact_subtitle:
      "Llámanos por teléfono o escríbenos directamente por WhatsApp para cualquier consulta o reserva.",
    whatsapp_label: "WhatsApp Directo",
    whatsapp_note: "Respuesta rápida por mensaje de WhatsApp.",
    whatsapp_btn: "Abrir chat en WhatsApp",
    phone_label: "Teléfono del Restaurante",
    phone_note: "Atención telefónica durante nuestro horario de apertura.",
    phone_btn: "Llamar ahora",
    copy_phone_btn: "Copiar teléfono",
    schedule_label: "Horario Semanal",
    schedule_title: "Nuestras Horas de Apertura",
    day_tue: "Martes",
    day_wed: "Miércoles",
    day_thu: "Jueves",
    day_fri: "Viernes",
    day_sat: "Sábado",
    day_sun: "Domingo",
    day_mon: "Lunes",
    sunday_hours: "Mediodía abierto · <strong>Noche cerrado</strong>",
    monday_hours: "Cerrado por descanso",
    schedule_footer:
      "De martes a sábado horario continuo de 11:30 a 0:00. Domingo noche y lunes cerrado.",
    loc_eyebrow: "Dónde Estamos",
    loc_title: "Nuestra Ubicación en Badajoz",
    loc_subtitle:
      "Te esperamos en la Avenida de Elvas, en una zona cómoda y de fácil acceso en Badajoz.",
    loc_label: "Dirección Postal",
    loc_country: "España",
    loc_directions_btn: "Cómo llegar en Google Maps",
    loc_copy_btn: "Copiar dirección",
    rev_eyebrow: "Opiniones de Clientes",
    rev_title_prefix: "Lo que dicen de",
    rev_caption: "Reseñas en Google Maps",
    rev_google_btn: "Ver en Google",
    footer_tagline: "Restaurante de comida tradicional en Badajoz.",
    footer_addr_label: "Dirección:",
    footer_phone_label: "Teléfono:",
    copied_prefix: "Copiado",
    today_suffix: ' " (Hoy)"',
    status_open_week: "Abierto ahora · Hoy de 11:30 a 0:00",
    status_closed_week: "Cerrado ahora · Abrimos de 11:30 a 0:00",
    status_open_sun: "Abierto este mediodía · Domingo noche cerrado",
    status_closed_sun: "Domingo noche y lunes cerrado · Abrimos martes 11:30",
    status_closed_mon: "Hoy lunes cerrado · Abrimos martes de 11:30 a 0:00"
  },
  en: {
    brand_sub: "Restaurant",
    nav_contact: "Contact & Hours",
    nav_location: "Location",
    nav_reviews: "Reviews",
    hero_title_prefix: "The taste of tradition at",
    hero_desc:
      "Traditional Spanish cuisine crafted with care, local ingredients and warm hospitality in Badajoz. A bright, welcoming spot with an outdoor terrace to enjoy great food.",
    hero_cta_whatsapp: "Contact via WhatsApp",
    hero_quick_hours: "Tue – Sat: 11:30 to 0:00 · Sun night & Mon closed",
    hero_floating_title: "Traditional Local Cuisine",
    contact_eyebrow: "Get in Touch",
    contact_title: "Contact & Opening Hours",
    contact_subtitle:
      "Call us directly or send us a WhatsApp message for any inquiry or table reservation.",
    whatsapp_label: "Direct WhatsApp",
    whatsapp_note: "Fast reply via WhatsApp message.",
    whatsapp_btn: "Open WhatsApp chat",
    phone_label: "Restaurant Phone",
    phone_note: "Phone assistance available during our opening hours.",
    phone_btn: "Call now",
    copy_phone_btn: "Copy phone",
    schedule_label: "Weekly Schedule",
    schedule_title: "Our Opening Hours",
    day_tue: "Tuesday",
    day_wed: "Wednesday",
    day_thu: "Thursday",
    day_fri: "Friday",
    day_sat: "Saturday",
    day_sun: "Sunday",
    day_mon: "Monday",
    sunday_hours: "Open midday · <strong>Closed Sunday night</strong>",
    monday_hours: "Closed (Weekly rest)",
    schedule_footer:
      "Tuesday to Saturday open all day from 11:30 to midnight (0:00). Closed Sunday night and Monday.",
    loc_eyebrow: "Find Us",
    loc_title: "Our Location in Badajoz",
    loc_subtitle:
      "We look forward to welcoming you on Avenida de Elvas, an easy-to-reach area in Badajoz.",
    loc_label: "Postal Address",
    loc_country: "Spain",
    loc_directions_btn: "Get directions on Google Maps",
    loc_copy_btn: "Copy address",
    rev_eyebrow: "Customer Reviews",
    rev_title_prefix: "What guests say about",
    rev_caption: "Google Maps Reviews",
    rev_google_btn: "View on Google",
    footer_tagline: "Traditional cuisine restaurant in Badajoz, Spain.",
    footer_addr_label: "Address:",
    footer_phone_label: "Phone:",
    copied_prefix: "Copied",
    today_suffix: ' " (Today)"',
    status_open_week: "Open now · Today from 11:30 to 0:00",
    status_closed_week: "Closed now · Open 11:30 to 0:00",
    status_open_sun: "Open this midday · Closed Sunday night",
    status_closed_sun: "Closed Sunday night & Monday · Opens Tuesday 11:30",
    status_closed_mon: "Closed on Mondays · Opens Tuesday 11:30 to 0:00"
  }
};

const REVIEWS_DATA = [
  {
    name: "Carlos M.",
    initials: "CM",
    date: {
      es: "Reseña de Google",
      en: "Google Review"
    },
    stars: 5,
    text: {
      es: "Un acierto total en la Avenida de Elvas. Comida tradicional con muchísimo sabor, raciones cuidadas y un trato cercano e impecable. Repetiremos seguro.",
      en: "A total gem on Avenida de Elvas. Traditional dishes full of flavor, generous portions and warm, impeccable service. We will definitely come back."
    }
  },
  {
    name: "Elena G.",
    initials: "EG",
    date: {
      es: "Reseña de Google",
      en: "Google Review"
    },
    stars: 5,
    text: {
      es: "Terraza y local muy agradables. Se nota la calidad del producto en cada plato y el servicio es rápido y muy atento. Muy recomendable en Badajoz.",
      en: "Very pleasant terrace and dining room. You can taste the quality of the ingredients in every dish, and service is fast and attentive. Highly recommended in Badajoz."
    }
  },
  {
    name: "Javier R.",
    initials: "JR",
    date: {
      es: "Reseña de Google",
      en: "Google Review"
    },
    stars: 5,
    text: {
      es: "Cocina de toda la vida bien hecha. Fácil para aparcar por la zona de Avenida de Elvas y un ambiente estupendo tanto para comer al mediodía como para cenar.",
      en: "Authentic traditional cooking done right. Easy parking around Avenida de Elvas and a great atmosphere both for lunch and dinner."
    }
  }
];

/**
 * Renderiza las tarjetas de reseñas en el idioma activo
 */
function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  container.innerHTML = REVIEWS_DATA.map((review) => {
    const starsStr = "★".repeat(review.stars) + "☆".repeat(5 - review.stars);
    const reviewDate = review.date[currentLang] || review.date.es;
    const reviewText = review.text[currentLang] || review.text.es;

    return `
      <article class="review-card">
        <div>
          <div class="review-header">
            <div class="reviewer-meta">
              <div class="reviewer-avatar" aria-hidden="true">${review.initials}</div>
              <div>
                <div class="reviewer-name">${review.name}</div>
                <span class="review-time">${reviewDate}</span>
              </div>
            </div>
            <div class="review-stars" aria-label="${review.stars} / 5">${starsStr}</div>
          </div>
        </div>
        <p class="review-text">“${reviewText}”</p>
      </article>
    `;
  }).join("");
}

/**
 * Calcula si MariquinA está abierto ahora mismo según la hora de Madrid/España
 */
function updateScheduleAndLiveStatus() {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.es;
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("es-ES", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  });

  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);

  const madridDateStr = now.toLocaleString("en-US", { timeZone: "Europe/Madrid" });
  const madridDate = new Date(madridDateStr);
  const dayIndex = madridDate.getDay();

  const rows = document.querySelectorAll(".schedule-row");
  rows.forEach((row) => {
    const rowDay = parseInt(row.getAttribute("data-day"), 10);
    if (rowDay === dayIndex) {
      row.classList.add("is-today");
    } else {
      row.classList.remove("is-today");
    }
  });

  const currentMinutes = hour * 60 + minute;
  const openTime = 11 * 60 + 30;
  const closeTimeWeek = 24 * 60;
  const closeTimeSunday = 17 * 60;

  let isOpen = false;
  let statusText = "";

  if (dayIndex >= 2 && dayIndex <= 6) {
    if (currentMinutes >= openTime && currentMinutes < closeTimeWeek) {
      isOpen = true;
      statusText = t.status_open_week;
    } else {
      isOpen = false;
      statusText = t.status_closed_week;
    }
  } else if (dayIndex === 0) {
    if (currentMinutes >= openTime && currentMinutes < closeTimeSunday) {
      isOpen = true;
      statusText = t.status_open_sun;
    } else {
      isOpen = false;
      statusText = t.status_closed_sun;
    }
  } else {
    isOpen = false;
    statusText = t.status_closed_mon;
  }

  const dotEl = document.getElementById("liveStatusDot");
  const textEl = document.getElementById("liveStatusText");
  if (dotEl && textEl) {
    dotEl.classList.toggle("is-open", isOpen);
    dotEl.classList.toggle("is-closed", !isOpen);
    textEl.textContent = statusText;
  }
}

/**
 * Aplica el idioma seleccionado (es / en) a toda la página
 */
function applyLanguage(lang) {
  currentLang = TRANSLATIONS[lang] ? lang : "es";
  localStorage.setItem("mariquina_lang", currentLang);
  document.documentElement.lang = currentLang;

  const t = TRANSLATIONS[currentLang];
  document.documentElement.style.setProperty("--today-label", t.today_suffix);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const isSelected = btn.getAttribute("data-lang") === currentLang;
    btn.classList.toggle("active", isSelected);
    btn.setAttribute("aria-pressed", String(isSelected));
  });

  renderReviews();
  updateScheduleAndLiveStatus();
}

/**
 * Inicializa el selector de idioma ES / EN
 */
function initLanguageSwitcher() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      if (selectedLang) {
        applyLanguage(selectedLang);
      }
    });
  });
}

/**
 * Inicializa botones de copiar al portapapeles (teléfono y dirección)
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-btn");
  const toast = document.getElementById("copyToast");
  let toastTimeout = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const valueToCopy = btn.getAttribute("data-copy");
      if (!valueToCopy) return;
      const t = TRANSLATIONS[currentLang] || TRANSLATIONS.es;
      try {
        await navigator.clipboard.writeText(valueToCopy);
        showToast(`${t.copied_prefix}: ${valueToCopy}`);
      } catch {
        showToast(valueToCopy);
      }
    });
  });
}

/**
 * Menú desplegable en móviles
 */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mainNav");
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  applyLanguage(currentLang);
  initCopyButtons();
  initMobileMenu();

  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
