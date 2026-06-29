/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#DBEAFE',
        },
        secondary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#EFF6FF',
        },
        accent: {
          DEFAULT: '#06B6D4',
          dark: '#0891B2',
          light: '#E0F2FE',
        },
        customBg: '#F8FAFC',
        customCard: '#FFFFFF',
        textPrimary: '#0F172A',
        textSecondary: '#475569',
        customBorder: '#E2E8F0',
        customSuccess: '#22C55E',
        customWarning: '#F59E0B',
        customError: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 8px -1px rgba(15, 23, 42, 0.03)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        sidebar: '1px 0 0 0 #E2E8F0',
      },
      borderRadius: {
        'premium': '14px',
      }
    },
  },
  plugins: [],
}
