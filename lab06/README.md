# Lab 6 — ReactJS

SPA with a login page and a 5-day weather dashboard, built with React, Vite and react-router.

- **Login**: username `arsenii3`, password `validpassword` (see `src/config.js`)
- **Weather data**: [Open-Meteo](https://open-meteo.com/) (no API key); uses geolocation, falls back to Kyiv
- **Auth**: login state is stored in a cookie; `/dashboard` redirects to `/login` when not logged in

```bash
pnpm install
pnpm dev
```
