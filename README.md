# 🧠 Memograma (Juego de Memoria)

Una aplicación interactiva, moderna y responsive de **Juego de Memoria (Memorama)** construida con **Ionic Framework**, **Angular** y **Capacitor**, lista para navegadores web y dispositivos móviles **Android**.

> ✍️ **Desarrollado por:** Nicolas Nieto Daza

---

## ✨ Características Principales

* 🎨 **7 Temáticas Seleccionables:** Animales, Deportes & Fútbol, Películas & Cine, Comida & Snacks, Vehículos & Viajes, Videojuegos & Geek, y Naturaleza & Flores. Cada una con su reverso y emojis característicos.
* 🤍 **Diseño y Paleta Clara:** Estética cuidada en tonos blancos, crema y beige con animaciones 3D fluidas de volteo de cartas.
* 🎯 **Límite de Intentos Configurable:** Ingreso de intentos máximos directos desde la interfaz o desde el menú de ajustes.
* 💔 **Mecánica de Continuación:** Posibilidad de añadir +5 intentos extra al perder para no perder el progreso de la partida.
* ⏱️ **Temporizador y Modo Contrarreloj:** Cronómetro con conteo de tiempo y opción de tiempo límite con cuenta atrás.
* 🏆 **Sistema de Puntuación & Combos:** Puntos por aciertos consecutivos (combos 🔥), penalización por fallos y bonus por eficiencia y tiempo.
* 🧩 **3 Niveles de Dificultad:** Fácil (3x4 - 12 cartas), Medio (4x4 - 16 cartas) y Difícil (4x6 - 24 cartas).
* 📱 **Mobile-First & Android Ready:** Integración con `@capacitor/haptics` para retroalimentación táctil y vibración en dispositivos móviles.
* 📦 **APK de Android Generado:** Listo para instalar directamente en smartphones.

---

## 🚀 Tecnologías Utilizadas

* **Framework:** Ionic + Angular Standalone Components
* **Móvil:** Capacitor (Android)
* **Estilos:** SCSS con CSS Grid y diseño responsive
* **Librerías:** `@capacitor/haptics`, `ionicons`

---

## 💻 Cómo Ejecutar el Proyecto en Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Nicomszws12/memorama.git
   cd memorama
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm start -- --port 4202
   ```
   Abre tu navegador en: [http://localhost:4202](http://localhost:4202)

---

## 📱 Compilación para Android

* **Sincronizar cambios a Android:**
  ```bash
  npm run build
  npx cap sync android
  ```
* **Generar APK:**
  ```bash
  cd android
  ./gradlew assembleDebug
  ```
  El archivo `.apk` se genera en `android/app/build/outputs/apk/debug/app-debug.apk`.

---

Hecho con ❤️ por **Nicolas Nieto Daza**