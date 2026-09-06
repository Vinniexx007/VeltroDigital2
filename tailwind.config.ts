import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F1F3D',
          dark: '#080F1E',
          light: '#1A3260',
        },
        blue: {
          DEFAULT: '#378ADD',
          light: '#5EA3E8',
          dark: '#2565AD',
        },
        grey: {
          DEFAULT: '#F5F7FA',
          dark: '#E2E6ED',
        },
        amber: {
          DEFAULT: '#EF9F27',
          light: '#F4B84A',
          dark: '#C97D0E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Arial', 'Helvetica', 'sans-serif'],
        display: ['var(--font-inter)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'body': ['1rem', { lineHeight: '1.75' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
        'h3': ['1.5rem', { lineHeight: '1.35' }],
        'h2': ['2rem', { lineHeight: '1.25' }],
        'h1-mobile': ['2.25rem', { lineHeight: '1.2' }],
        'h1': ['3rem', { lineHeight: '1.15' }],
        'hero': ['3.5rem', { lineHeight: '1.1' }],
      },
      spacing: {
        'section': '5rem',
        'section-sm': '3rem',
      },
      maxWidth: {
        'content': '1200px',
        'prose': '680px',
      },
      borderRadius: {
        'card': '0.75rem',
        'btn': '0.5rem',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(15, 31, 61, 0.08)',
        'card-hover': '0 8px 32px rgba(15, 31, 61, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
