/**
 * MariquinA Restauración - Lógica ligera en JavaScript puro
 * Incluye:
 * 1. Selector de idioma Español (ES) / Inglés (EN).
 * 2. Filtro interactivo de la carta de platos.
 * 3. Tarjetas de reseñas destacadas en ambos idiomas.
 * 4. Estado de apertura en tiempo real según horario de España (Europe/Madrid).
 * 5. Botones de copiado rápido y menú móvil.
 */

let currentLang = localStorage.getItem("mariquina_lang") || "es";

const TRANSLATIONS = {
  es: {
    brand_sub: "Restauración",
    nav_menu: "Carta",
    nav_contact: "Contacto y Horario",
    nav_location: "Ubicación",
    nav_faq: "Preguntas Frecuentes",
    nav_reviews: "Reseñas",
    btn_book_table_short: "Reservar",
    hero_title_prefix: "El sabor de la tradición en",
    hero_desc:
      "Cocina tradicional con producto de primera calidad en Badajoz: ibéricos de bellota Maldonado, carnes seleccionadas, pescados frescos y arroces por encargo. Situado en la Avenida de Elvas, junto al Hospital Universitario y el campus de la UEx, con terraza exterior y fácil aparcamiento.",
    hero_cta_whatsapp: "Reservar mesa por WhatsApp",
    hero_cta_menu: "Ver Carta y Platos",
    hero_quick_addr: "Avda. De Elvas 6, Local 22 (Junto a UEx y Hospital) · 06006 Badajoz",
    hero_quick_hours: "Mar – Sáb: 11:30 a 0:00 · Dom y Lun cerrado",
    hero_floating_title: "Cocina de Raíz y Tradición",
    
    // Carta y Especialidades
    menu_eyebrow: "Nuestra Cocina",
    menu_title: "Carta y Especialidades",
    menu_subtitle:
      "Producto selecto, ibéricos de bellota Maldonado, pescados frescos, carnes a la plancha y arroces cocinados al momento en Badajoz.",
    filter_all: "Todos los Platos",
    filter_ibericos: "Ibéricos Maldonado",
    filter_carnes: "Carnes",
    filter_pescados: "Pescados y Mariscos",
    filter_entrantes: "Revueltos y Entrantes",
    filter_huerta: "De la Huerta",
    filter_arroces: "Arroces",
    cat_ibericos: "Ibéricos de Bellota",
    cat_carnes: "Carnes Seleccionadas",
    cat_pescados: "Pescados y Mariscos",
    cat_revueltos: "Revueltos y Entrantes",
    cat_huerta: "De la Huerta",
    cat_arroces: "Arroces al Momento",
    subcat_plancha: "A la Plancha y en Salsa",
    subcat_fritura: "Fritura Andaluza",
    tag_specialty: "Especialidad",
    tag_recommended: "Recomendado",
    tag_traditional: "Tradición",
    tag_fresh: "Producto Fresco",
    tag_popular: "Imprescindibles",
    tag_star: "Plato Estrella",
    tag_healthy: "Frescura",
    tag_preorder: "Por Encargo (Mín. 2 pers.)",
    tag_grill: "Brasa / Plancha",

    // Platos
    dish_jamon: "Jamón Ibérico de Bellota (Maldonado)",
    dish_lomo: "Lomo Ibérico de Bellota (Maldonado)",
    dish_surtido: "Surtido de Ibéricos de Bellota (Maldonado)",
    dish_queso: "Queso de Oveja Curado",
    dish_solomillo: "Solomillo ibérico a la plancha",
    dish_pluma: "Pluma ibérica a la plancha",
    dish_entrecot: "Entrecot de ternera a la plancha",
    dish_cachopo: "Cachopo de ternera",
    dish_carrilleras: "Carrilleras ibéricas en salsa",
    dish_torreznos: "Torreznos de Soria",
    dish_pollo: "Filete de pollo (plancha o empanado)",
    dish_bacalao_arriero: "Bacalao al arriero",
    dish_atun: "Atún a la plancha",
    dish_lubina: "Lubina a la plancha",
    dish_sepia: "Sepia y Calamaritos a la plancha",
    dish_gambones: "Gambones a la plancha / al ajillo",
    dish_almejas: "Almejas marineras",
    dish_pulpo: "Pulpo a la gallega",
    dish_fritura: "Fritura variada de pescado",
    dish_calamares_fritos: "Calamares, Puntillitas y Boquerones fritos",
    dish_bacalao_dorado: "Bacalao Dorado",
    dish_revuelto_trigueros: "Revuelto de trigueros con jamón ibérico y gambas",
    dish_revuelto_espinacas: "Revuelto de espinacas con almejas y gambas al queso",
    dish_bolsitas: "Bolsitas crujientes con queso y gambas",
    dish_croquetas: "Surtido de croquetas caseras",
    dish_champinones: "Champiñones naturales a la plancha con queso cremoso y jamón",
    dish_tartar: "Tartar de atún",
    dish_gambas_blancas: "Gambas blancas cocidas",
    dish_cuchara: "Gazpacho, Salmorejo con jamón o Sopa casera",
    dish_ensalada_pimientos: "Ensalada de pimientos asados con bacalao",
    dish_ensalada_cogollos: "Cogollos a la plancha con queso azul y cebolla crujiente",
    dish_ensalada_mixta: "Ensalada Mixta tradicional",
    dish_arroz_marisco: "Arroz de marisco caldoso / meloso",
    dish_arroz_negro: "Arroz negro con sepia y alioli",
    dish_paella_marisco: "Paella tradicional de marisco",
    rice_note: "Cocinado al momento. Aconsejamos reservar tu arroz con antelación vía WhatsApp o teléfono.",
    btn_order_rice: "Encargar arroz por WhatsApp",

    // Menú Diario
    menu_daily_tag: "Martes a Viernes (Mediodía)",
    menu_daily_title: "Menú Diario Casero",
    menu_daily_desc:
      "De martes a viernes a mediodía (excepto festivos) disponemos de nuestro menú del día con variedad de primeros y segundos platos tradicionales, pan, bebida y postre. Cocina de mercado recién hecha.",
    btn_ask_menu: "Consultar menú de hoy",

    // Contacto y Horario
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
    vcard_title: "Ficha de Contacto Digital (vCard)",
    vcard_desc: "Guarda nuestros teléfonos, ubicación y enlaces directamente en tu agenda con un toque.",
    btn_save_contact: "Guardar en Contactos",
    schedule_label: "Horario Semanal",
    schedule_title: "Nuestras Horas de Apertura",
    day_tue: "Martes",
    day_wed: "Miércoles",
    day_thu: "Jueves",
    day_fri: "Viernes",
    day_sat: "Sábado",
    day_sun: "Domingo",
    day_mon: "Lunes",
    sunday_hours: "Cerrado por descanso",
    monday_hours: "Cerrado por descanso",
    schedule_footer:
      "De martes a sábado horario continuo de 11:30 a 0:00. Domingo y lunes cerrado.",
    
    // Ubicación
    loc_eyebrow: "Dónde Estamos",
    loc_title: "Nuestra Ubicación en Badajoz",
    loc_subtitle:
      "Te esperamos en la Avenida de Elvas 6, Local 22 (Badajoz), en una zona amplia con fácil aparcamiento, a pocos minutos de la Universidad de Extremadura (UEx) y el Hospital Universitario.",
    loc_label: "Dirección Postal",
    loc_landmark: "(Junto a la Universidad y Hospital Universitario)",
    loc_country: "España",
    loc_directions_btn: "Cómo llegar en Google Maps",
    loc_gps_btn: "Iniciar navegación GPS",
    loc_copy_btn: "Copiar dirección",
    loc_review_invite_title: "¿Has comido con nosotros?",
    loc_review_invite_desc: "Tu valoración en Google nos ayuda muchísimo a seguir mejorando y a que más clientes nos conozcan.",
    loc_review_btn: "Dejar reseña en Google",

    // FAQ
    faq_eyebrow: "Resolvemos tus dudas",
    faq_title: "Preguntas Frecuentes",
    faq_subtitle: "Información práctica sobre reservas, terraza, aparcamiento y nuestra cocina en Badajoz.",
    faq_q1: "¿Es necesario reservar mesa en Restaurante MariquinA?",
    faq_a1: "Es muy recomendable reservar con antelación, especialmente para comidas y cenas en fin de semana, grupos o si deseas degustar nuestros arroces por encargo. Puedes reservar en segundos por WhatsApp (+34 667 60 73 06) o por teléfono (+34 924 27 60 84).",
    faq_q2: "¿Dispone el restaurante de terraza exterior en la Avenida de Elvas?",
    faq_a2: "Sí, contamos con una amplia terraza exterior acondicionada, ideal para disfrutar del clima de Badajoz tanto para el aperitivo y almuerzo como para cenas al aire libre.",
    faq_q3: "¿Cómo funciona el servicio de arroces y paellas por encargo?",
    faq_a3: "Elaboramos arroz de marisco (caldoso o meloso), arroz negro con sepia y paella de marisco con producto fresco y cocinado al momento. Se preparan exclusivamente por encargo para un mínimo de 2 personas con reserva previa.",
    faq_q4: "¿Tenéis menú del día entre semana?",
    faq_a4: "Sí, de martes a viernes a mediodía (no festivos) ofrecemos nuestro menú diario casero con primeros y segundos a elegir, pan, bebida y postre, elaborado con producto de mercado.",
    faq_q5: "¿Es fácil aparcar cerca de MariquinA en Badajoz?",
    faq_a5: "Sí, la zona de la Avenida de Elvas 6 cuenta con amplias avenidas y zonas de aparcamiento público cómodo y gratuito en las inmediaciones del restaurante.",
    faq_q6: "¿Dónde está ubicado exactamente el restaurante?",
    faq_a6: "Estamos en la Avenida De Elvas 6, Local 22 (06006 Badajoz). Una ubicación privilegiada a pocos minutos del Hospital Universitario de Badajoz y el campus de la Universidad de Extremadura (UEx).",

    // Reseñas & Footer
    rev_eyebrow: "Opiniones de Clientes",
    rev_title_prefix: "Lo que dicen de",
    rev_caption: "Reseñas en Google Maps",
    rev_google_btn: "Ver en Google",
    rev_leave_btn: "Escribir reseña",
    footer_tagline: "Restaurante de comida tradicional en Badajoz.",
    footer_addr_label: "Dirección:",
    footer_phone_label: "Teléfono:",
    copied_prefix: "Copiado",
    today_suffix: ' " (Hoy)"',
    status_open_week: "Abierto ahora · Hoy de 11:30 a 0:00",
    status_closed_week: "Cerrado ahora · Abrimos de 11:30 a 0:00",
    status_closed_sun: "Hoy domingo cerrado · Abrimos martes de 11:30 a 0:00",
    status_closed_mon: "Hoy lunes cerrado · Abrimos martes de 11:30 a 0:00"
  },
  en: {
    brand_sub: "Restaurant",
    nav_menu: "Menu",
    nav_contact: "Contact & Hours",
    nav_location: "Location",
    nav_faq: "FAQ",
    nav_reviews: "Reviews",
    btn_book_table_short: "Book Table",
    hero_title_prefix: "The taste of tradition at",
    hero_desc:
      "Traditional Spanish cuisine crafted with the finest ingredients in Badajoz: Maldonado acorn-fed Iberian ham, premium meats, fresh seafood and pre-ordered paellas. Located on Avenida de Elvas, next to the University Hospital and the UEx campus, with outdoor terrace and easy parking.",
    hero_cta_whatsapp: "Book Table via WhatsApp",
    hero_cta_menu: "View Menu & Dishes",
    hero_quick_addr: "Avda. De Elvas 6, Local 22 (Next to UEx & Hospital) · 06006 Badajoz",
    hero_quick_hours: "Tue – Sat: 11:30 to 0:00 · Sun & Mon closed",
    hero_floating_title: "Traditional Local Cuisine",

    // Menu & Specialties
    menu_eyebrow: "Our Kitchen",
    menu_title: "Menu & Specialties",
    menu_subtitle:
      "Finest ingredients, Maldonado 100% acorn-fed Iberian ham, fresh seafood, grilled meats and freshly made paellas & rice in Badajoz.",
    filter_all: "All Dishes",
    filter_ibericos: "Maldonado Iberians",
    filter_carnes: "Meats",
    filter_pescados: "Fish & Seafood",
    filter_entrantes: "Scrambled Eggs & Starters",
    filter_huerta: "Garden Salads",
    filter_arroces: "Rice & Paellas",
    cat_ibericos: "Acorn-fed Iberian Cured Meats",
    cat_carnes: "Selected Meats",
    cat_pescados: "Fish & Seafood",
    cat_revueltos: "Scrambled Eggs & Starters",
    cat_huerta: "From the Garden",
    cat_arroces: "Freshly Made Rice & Paella",
    subcat_plancha: "Grilled & in Sauce",
    subcat_fritura: "Crispy Fried Seafood",
    tag_specialty: "Specialty",
    tag_recommended: "Chef's Choice",
    tag_traditional: "Traditional",
    tag_fresh: "Fresh Daily",
    tag_popular: "Favorites",
    tag_star: "Signature Dish",
    tag_healthy: "Fresh",
    tag_preorder: "Pre-order (Min. 2 pers.)",
    tag_grill: "Grilled",

    // Dishes
    dish_jamon: "Maldonado 100% Acorn-fed Iberian Ham",
    dish_lomo: "Maldonado Acorn-fed Cured Iberian Pork Loin",
    dish_surtido: "Maldonado Acorn-fed Iberian Charcuterie Board",
    dish_queso: "Aged Cured Sheep's Milk Cheese",
    dish_solomillo: "Grilled Iberian Pork Tenderloin",
    dish_pluma: "Grilled Iberian Pork 'Pluma' Cut",
    dish_entrecot: "Grilled Veal Ribeye Steak",
    dish_cachopo: "Traditional Veal 'Cachopo' (Ham & Cheese)",
    dish_carrilleras: "Braised Iberian Pork Cheeks in Red Wine Sauce",
    dish_torreznos: "Crispy Soria Pork Belly Cracklings",
    dish_pollo: "Chicken Fillet (Grilled or Breaded)",
    dish_bacalao_arriero: "Traditional Cod 'al Arriero' (Garlic & Paprika)",
    dish_atun: "Grilled Tuna Steak",
    dish_lubina: "Grilled Sea Bass Fillet",
    dish_sepia: "Grilled Cuttlefish & Baby Squid",
    dish_gambones: "Grilled or Sizzling Garlic King Prawns",
    dish_almejas: "Clams in Traditional 'Marinera' Sauce",
    dish_pulpo: "Galician-style Octopus (Olive Oil & Paprika)",
    dish_fritura: "Mixed Fried Seafood Platter",
    dish_calamares_fritos: "Crispy Fried Squid, Baby Squid & Fresh Anchovies",
    dish_bacalao_dorado: "Golden Cod 'Bacalhau à Brás' (Cod, Eggs & Potatoes)",
    dish_revuelto_trigueros: "Wild Asparagus Scramble with Iberian Ham & Prawns",
    dish_revuelto_espinacas: "Spinach Scramble with Clams, Prawns & Melted Cheese",
    dish_bolsitas: "Crispy Pastry Parcels with Cheese & Prawns",
    dish_croquetas: "Assorted Artisan Homemade Croquettes",
    dish_champinones: "Grilled Fresh Mushrooms with Creamy Cheese & Iberian Ham",
    dish_tartar: "Fresh Red Tuna Tartare",
    dish_gambas_blancas: "Boiled White Huelva Prawns",
    dish_cuchara: "Gazpacho, Salmorejo with Iberian Ham or Homemade Soup",
    dish_ensalada_pimientos: "Roasted Red Pepper Salad with Cod Flakes",
    dish_ensalada_cogollos: "Grilled Baby Gem Lettuce with Blue Cheese & Crispy Onion",
    dish_ensalada_mixta: "Traditional Garden Mixed Salad",
    dish_arroz_marisco: "Seafood Soupy Rice (Pre-order, min. 2 pers)",
    dish_arroz_negro: "Black Rice with Cuttlefish & Alioli (Pre-order, min. 2 pers)",
    dish_paella_marisco: "Traditional Seafood Paella (Pre-order, min. 2 pers)",
    rice_note: "Cooked fresh to order. We recommend pre-ordering your rice dish in advance via WhatsApp or phone.",
    btn_order_rice: "Pre-order Rice via WhatsApp",

    // Daily Menu
    menu_daily_tag: "Tuesday to Friday (Lunch)",
    menu_daily_title: "Daily Homemade Lunch Menu",
    menu_daily_desc:
      "From Tuesday to Friday at lunchtime (excluding public holidays) we offer our daily set menu featuring traditional starters and main courses, bread, drink and dessert. Fresh market cuisine.",
    btn_ask_menu: "Check today's menu on WhatsApp",

    // Contact & Hours
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
    vcard_title: "Digital Contact Card (vCard)",
    vcard_desc: "Save our phone numbers, address, and links directly to your mobile phonebook.",
    btn_save_contact: "Save to Contacts",
    schedule_label: "Weekly Schedule",
    schedule_title: "Our Opening Hours",
    day_tue: "Tuesday",
    day_wed: "Wednesday",
    day_thu: "Thursday",
    day_fri: "Friday",
    day_sat: "Saturday",
    day_sun: "Sunday",
    day_mon: "Monday",
    sunday_hours: "Closed (Weekly rest)",
    monday_hours: "Closed (Weekly rest)",
    schedule_footer:
      "Tuesday to Saturday open all day from 11:30 to midnight (0:00). Closed Sunday and Monday.",
    
    // Location
    loc_eyebrow: "Find Us",
    loc_title: "Our Location in Badajoz",
    loc_subtitle:
      "We look forward to welcoming you on Avenida de Elvas 6, Local 22 (Badajoz), an easily accessible area with ample free parking, minutes from the University Hospital and UEx Campus.",
    loc_label: "Postal Address",
    loc_landmark: "(Next to the University and University Hospital)",
    loc_country: "Spain",
    loc_directions_btn: "Get directions on Google Maps",
    loc_gps_btn: "Start GPS Navigation",
    loc_copy_btn: "Copy address",
    loc_review_invite_title: "Dined with us recently?",
    loc_review_invite_desc: "Your Google review helps us continue improving and lets other guests discover MariquinA.",
    loc_review_btn: "Leave a Google Review",

    // FAQ
    faq_eyebrow: "Helpful Information",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Useful details about table reservations, our outdoor terrace, parking and menu in Badajoz.",
    faq_q1: "Is it necessary to book a table at Restaurante MariquinA?",
    faq_a1: "We strongly recommend booking in advance, particularly for weekend lunch and dinner, large groups, or when ordering our rice dishes. You can book in seconds via WhatsApp (+34 667 60 73 06) or phone (+34 924 27 60 84).",
    faq_q2: "Does the restaurant have an outdoor terrace on Avenida de Elvas?",
    faq_a2: "Yes, we have a spacious, fully equipped outdoor terrace on Avenida de Elvas, ideal for enjoying Badajoz's weather both for daytime lunch and outdoor dinners.",
    faq_q3: "How does the pre-order rice and paella service work?",
    faq_a3: "We prepare seafood rice, black cuttlefish rice, and seafood paella fresh from scratch. They are prepared exclusively upon advance order for a minimum of 2 people.",
    faq_q4: "Do you offer a daily lunch set menu on weekdays?",
    faq_a4: "Yes, from Tuesday to Friday at lunch (non-holidays) we serve our homemade daily menu with a choice of starters and mains, bread, drink, and dessert.",
    faq_q5: "Is parking easily accessible near MariquinA in Badajoz?",
    faq_a5: "Yes, Avenida de Elvas has wide streets with plenty of free, easy street parking right around the restaurant.",
    faq_q6: "Where is the restaurant located in Badajoz?",
    faq_a6: "We are located at Avenida De Elvas 6, Local 22 (06006 Badajoz), just minutes away from the Badajoz University Hospital and the University of Extremadura (UEx) campus.",

    // Reviews & Footer
    rev_eyebrow: "Customer Reviews",
    rev_title_prefix: "What guests say about",
    rev_caption: "Google Maps Reviews",
    rev_google_btn: "View on Google",
    rev_leave_btn: "Write a review",
    footer_tagline: "Traditional cuisine restaurant in Badajoz, Spain.",
    footer_addr_label: "Address:",
    footer_phone_label: "Phone:",
    copied_prefix: "Copied",
    today_suffix: ' " (Today)"',
    status_open_week: "Open now · Today from 11:30 to 0:00",
    status_closed_week: "Closed now · Open 11:30 to 0:00",
    status_closed_sun: "Closed on Sundays · Opens Tuesday 11:30 to 0:00",
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
    isOpen = false;
    statusText = t.status_closed_sun;
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
 * Filtros de categoría de la carta
 */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll(".menu-filter-btn");
  const categoryCards = document.querySelectorAll(".menu-category-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      categoryCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
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

/**
 * Seguimiento de conversiones y clics en Google Analytics (GA4)
 * Diseñado con eventos pasivos para garantizar que jamás interfiera
 * en el funcionamiento natural ni en la apertura de los enlaces.
 */
function initAnalyticsTracking() {
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target.closest("[data-ga-event]");
      if (!target) return;

      const eventName = target.getAttribute("data-ga-event");
      const eventLocation = target.getAttribute("data-ga-location") || "general";
      const buttonText = (target.textContent || "").trim().replace(/\s+/g, " ").substring(0, 50);
      const destinationUrl = target.getAttribute("href") || "";

      if (typeof window.gtag === "function") {
        try {
          window.gtag("event", eventName, {
            ubicacion: eventLocation,
            texto_boton: buttonText,
            destino: destinationUrl,
            transport_type: "beacon"
          });
        } catch {
          // Seguro: no bloquea la navegación bajo ninguna circunstancia
        }
      }
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  applyLanguage(currentLang);
  initMenuFilters();
  initCopyButtons();
  initMobileMenu();
  initAnalyticsTracking();

  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
