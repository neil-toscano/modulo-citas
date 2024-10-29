import removeConsole from 'vite-plugin-remove-console';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de incluir todos los archivos relevantes
  ],
  theme: {
    extend: {},
  },
  plugins: [removeConsole() ],
};
