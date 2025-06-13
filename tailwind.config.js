/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./*.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'custom-blue': '#0101ec',
          'custom-purple': '#6b21a8',
          'custom-gray': {
            light: '#f3f4f6',
            DEFAULT: '#6b7280',
            dark: '#1f2937',
          }
        }
      },
    },
    plugins: [],
  }