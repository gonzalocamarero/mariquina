# MariquinA Restauración — Página Web Oficial

Sitio web estático (HTML5, CSS3 y JavaScript puro) para el restaurante de comida tradicional **MariquinA** en Badajoz (`www.mariquinarestauracion.es`).

## Estructura del Proyecto

- `index.html` — Estructura principal de la web, datos SEO locales (`Schema.org`), mapa de Google Maps embebido y bloque preparado para Google Analytics.
- `styles.css` — Diseño **Mediterráneo Luminoso** (blanco limpio, verde oliva y acentos tierra), 100% adaptable a móviles y ordenadores.
- `script.js` — Tarjetas de reseñas de Google fáciles de editar, indicador en tiempo real del horario de apertura en España y botones de copiado rápido.
- `CNAME` — Archivo de configuración automática de dominio personalizado (`www.mariquinarestauracion.es`) para GitHub Pages.
- `assets/hero.jpg` — Fotografía principal del restaurante.

---

## Cómo alojarla gratis en GitHub Pages con tu dominio `.es`

1. **Subir los archivos a GitHub:**
   - Crea una cuenta en [github.com](https://github.com) y un nuevo repositorio público (por ejemplo, `mariquina-web`).
   - Sube todos los archivos de esta carpeta (`index.html`, `styles.css`, `script.js`, `CNAME` y la carpeta `assets/`).

2. **Activar GitHub Pages:**
   - Entra en tu repositorio en GitHub → **Settings** → **Pages** (en el menú lateral izquierdo).
   - En **Build and deployment** → **Branch**, selecciona `main` (o `master`) y carpeta `/ (root)`, y pulsa **Save**.
   - Al estar incluido el archivo `CNAME`, GitHub detectará automáticamente el dominio `www.mariquinarestauracion.es`.

3. **Configurar los DNS donde compres el dominio `mariquinarestauracion.es`:**
   En el panel DNS de tu proveedor de dominio (DonDominio, Arsys, Nominalia, OVH, Cloudflare, etc.), añade estos registros:
   - **Registro `CNAME`**:
     - Host / Nombre: `www`
     - Destino / Valor: `gonzalocamarero.github.io`
   - **Registros `A`** (para que `mariquinarestauracion.es` sin `www` también redirija):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Una vez propagados los DNS (suele tardar entre 15 minutos y unas horas), marca la casilla **Enforce HTTPS** en `Settings -> Pages` de GitHub para tener el certificado SSL gratuito activado.

---

## Cómo activar Google Analytics más adelante

Abre `index.html` y busca en la parte superior (líneas 28–37) el bloque comentado:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Simplemente quita `<!--` y `-->` y cambia `G-XXXXXXXXXX` por tu identificador real de Google Analytics 4.

## Cómo editar las reseñas destacadas

Abre `script.js` y edita la lista `REVIEWS_DATA` al principio del archivo para añadir o cambiar los textos y nombres de las reseñas cuando quieras.
