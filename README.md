# Serena · App instalable (lanzador en GitHub Pages)

InfinityFree no permite que Serena se instale como app (PWA): su protección contra robots
interfiere con el *service worker* y el manifiesto. Este repositorio es un **lanzador**: una
página pequeña en GitHub Pages que **sí se puede instalar** y que, al abrirla desde el ícono,
lleva directo a Serena.

- **Desde el navegador:** muestra el botón **📲 Instalar Serena** (Android, Chrome y Edge) o los
  pasos para iPhone (Compartir → Agregar a inicio).
- **Desde el ícono instalado:** muestra «Abriendo Serena…» y entra a
  `https://serena.infinityfreeapp.com/public/`.
- **Sin internet:** muestra «Sin conexión» con el botón Reintentar.

## Publicarlo

1. En GitHub crea un repositorio **público** llamado `serena-app`.
2. Sube **todo el contenido** de esta carpeta (incluido `.nojekyll`).
3. Ve a **Settings → Pages** → *Build and deployment* → **Deploy from a branch** → rama `main`,
   carpeta `/ (root)` → **Save**.
4. En uno o dos minutos queda en: **https://dasanmos.github.io/serena-app/**
5. En el `.env` de Serena (InfinityFree) agrega
   `APP_INSTALAR_URL=https://dasanmos.github.io/serena-app/`: la portada y el inicio de sesión
   mostrarán **📲 Instalar la app**.

## Cambiar la dirección de Serena

Si Serena cambia de hosting o de dominio, edita **solo** la línea `var SERENA = '…'` de
`index.html`, y cambia `serena-lanzador-v1` por `serena-lanzador-v2` en `sw.js` para que los
celulares tomen la versión nueva.

## Enlaces directos

`https://dasanmos.github.io/serena-app/?ir=/public/estudiante/emociones.php` abre esa página de
Serena (solo se aceptan rutas que empiecen por `/public/`).
