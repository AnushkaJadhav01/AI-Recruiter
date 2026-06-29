/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFBFC',
        card: '#FFFFFF',
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#3B82F6',
        },
        secondary: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        border: '#E5E7EB',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        textMuted: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 4px 20px -2px rgba(17, 24, 39, 0.04), 0 2px 6px -1px rgba(17, 24, 39, 0.02)',
        cardHover: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
