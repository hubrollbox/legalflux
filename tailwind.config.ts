
import type { Config } from "tailwindcss";

interface ExtendedConfig extends Config {
  safelist?: string[];
}

const config: ExtendedConfig = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      // Removido o bloco colors personalizado para restaurar as cores padrão do Tailwind
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // 'border-gray-200' removido pois não existe no Tailwind 4.x
  ],

};

export default config;
