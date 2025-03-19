import { heroui } from "@heroui/theme";

module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    './src/app/**/*.tsx',
    './src/features/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      prefix: 'nextui', 
      addCommonColors: false, 
      defaultTheme: 'light', 
      defaultExtendTheme: 'light',
      themes: {
        light: {
          layout: {
            radius: {},
          }, 
          colors: {
            default: {
              DEFAULT: '#E7EAF3',
              500: '#71717A',
            },
            primary: {
              DEFAULT: '#0A2759',
              500: '#06C5951A',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#51596C',
              foreground: '#ffffff',
            },
            success: {
              DEFAULT: '#077C76',
              foreground: '#ffffff',
            },
            warning: {
              DEFAULT: '#F1B980',
              foreground: '#ffffff',
            },
            danger: {
              DEFAULT: '#ee6a5f',
              500: '#cc648f',
              foreground: '#ffffff',
            },
            overlay: {
              DEFAULT: '#000000',
            },
          }, 
        },
        dark: {
          layout: {}, 
          colors: {
            primary: {
              DEFAULT: '#0A2759',
              foreground: '#ffffff',
            },
            secondary: { DEFAULT: '#51596C', foreground: '#ffffff' },
            success: { DEFAULT: '#077C76', foreground: '#ffffff' },
            warning: { DEFAULT: '#F1B980', foreground: '#ffffff' },
            danger: { DEFAULT: '#692340', foreground: '#ffffff' },
          }, 
        },
      },
    }),
  ],
};

