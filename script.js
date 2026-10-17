/**
 * MariquinA Restauración - Lógica ligera en JavaScript puro
 * Incluye:
 * 1. Tarjetas de reseñas destacadas (fáciles de editar aquí mismo).
 * 2. Estado de apertura en tiempo real según horario de España (Europe/Madrid).
 * 3. Botones de copiado rápido y menú móvil.
 */

const REVIEWS_DATA = [
  {
    name: "Carlos M.",
    initials: "CM",
    date: "Reseña de Google",
    stars: 5,
    text: "Un acierto total en la Avenida de Elvas. Comida tradicional con muchísimo sabor, raciones cuidadas y un trato cercano e impecable. Repetiremos seguro."
  },
  {
    name: "Elena G.",
    initials: "EG",
    date: "Reseña de Google",
    stars: 5,
    text: "Local muy luminoso, limpio y agradable. Se nota la calidad del producto en cada plato y el servicio es rápido y muy atento. Muy recomendable en Badajoz."
  },
  {
    name: "Javier R.",
    initials: "JR",
    date: "Reseña de Google",
    stars: 5,
    text: "Cocina de toda la vida bien hecha. Fácil para aparcar por la zona de Avenida de Elvas y un ambiente estupendo tanto para comer al mediodía como para cenar."
  }
];

/**
 * Renderiza las tarjetas de reseñas en el contenedor #reviewsContainer
 */
function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  container.innerHTML = REVIEWS_DATA.map((review) => {
    const starsStr = "★".repeat(review.stars) + "☆".repeat(5 - review.stars);
    return `
      <article class="review-card">
        <div>
          <div class="review-header">
            <div class="reviewer-meta">
              <div class="reviewer-avatar" aria-hidden="true">${review.initials}</div>
              <div>
                <div class="reviewer-name">${review.name}</div>
                <span class="review-time">${review.date}</span>
              </div>
            </div>
            <div class="review-stars" aria-label="${review.stars} de 5 estrellas">${starsStr}</div>
          </div>
        </div>
        <p class="review-text">“${review.text}”</p>
      </article>
    `;
  }).join("");
}

/**
 * Calcula si MariquinA está abierto ahora mismo según la hora de Madrid/España
 * Horario:
 * - Lunes (1): Cerrado
 * - Martes a Sábado (2..6): 11:30 a 0:00 (24:00)
 * - Domingo (0): Mediodía abierto (11:30 a 17:00 aprox.), Domingo noche cerrado
 */
function updateScheduleAndLiveStatus() {
  const now = new Date();

  // Obtener hora y día en zona horaria de España
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

  // Obtener índice del día (0 = Domingo, 1 = Lunes, ..., 6 = Sábado) en Madrid
  const madridDateStr = now.toLocaleString("en-US", { timeZone: "Europe/Madrid" });
  const madridDate = new Date(madridDateStr);
  const dayIndex = madridDate.getDay();

  // Resaltar fila del día actual en la tabla de horarios
  const rows = document.querySelectorAll(".schedule-row");
  rows.forEach((row) => {
    const rowDay = parseInt(row.getAttribute("data-day"), 10);
    if (rowDay === dayIndex) {
      row.classList.add("is-today");
    } else {
      row.classList.remove("is-today");
    }
  });

  // Calcular estado en vivo
  const currentMinutes = hour * 60 + minute;
  const openTime = 11 * 60 + 30; // 11:30 -> 690 min
  const closeTimeWeek = 24 * 60; // 0:00 -> 1440 min
  const closeTimeSunday = 17 * 60; // 17:00 orientativo mediodía domingo

  let isOpen = false;
  let statusText = "";

  if (dayIndex >= 2 && dayIndex <= 6) {
    // Martes a Sábado: 11:30 a 0:00
    if (currentMinutes >= openTime && currentMinutes < closeTimeWeek) {
      isOpen = true;
      statusText = "Abierto ahora · Hoy de 11:30 a 0:00";
    } else {
      isOpen = false;
      statusText = "Cerrado ahora · Abrimos de 11:30 a 0:00";
    }
  } else if (dayIndex === 0) {
    // Domingo: Mediodía abierto, noche cerrado
    if (currentMinutes >= openTime && currentMinutes < closeTimeSunday) {
      isOpen = true;
      statusText = "Abierto este mediodía · Domingo noche cerrado";
    } else {
      isOpen = false;
      statusText = "Domingo noche y lunes cerrado · Abrimos martes 11:30";
    }
  } else {
    // Lunes: Cerrado
    isOpen = false;
    statusText = "Hoy lunes cerrado · Abrimos martes de 11:30 a 0:00";
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
      try {
        await navigator.clipboard.writeText(valueToCopy);
        showToast(`Copiado: ${valueToCopy}`);
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
  renderReviews();
  updateScheduleAndLiveStatus();
  initCopyButtons();
  initMobileMenu();

  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
