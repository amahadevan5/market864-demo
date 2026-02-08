/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },

      // Design System: Typography Scale
      fontSize: {
        'page-title': ['1.375rem', { lineHeight: '1.3', fontWeight: '700' }],  // 22px
        'kpi': ['1.75rem', { lineHeight: '1.2', fontWeight: '700' }],          // 28px
        'kpi-lg': ['2rem', { lineHeight: '1.1', fontWeight: '700' }],          // 32px
        'body': ['0.875rem', { lineHeight: '1.5' }],                           // 14px
        'body-sm': ['0.8125rem', { lineHeight: '1.5' }],                       // 13px
        'meta': ['0.75rem', { lineHeight: '1.4' }],                            // 12px
      },

      // Design System: Colors
      colors: {
        // Surfaces (2-layer system)
        surface: {
          base: 'hsl(var(--surface-base))',
          elevated: 'hsl(var(--surface-elevated))',
        },
        // Borders
        border: {
          DEFAULT: 'hsl(var(--border))',
          subtle: 'hsl(var(--border-subtle))',
          strong: 'hsl(var(--border-strong))',
        },
        // Text
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          muted: 'hsl(var(--foreground-muted))',
          subtle: 'hsl(var(--foreground-subtle))',
        },
        // Primary accent (emerald)
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          muted: 'hsl(var(--accent-muted))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        // Semantic states only
        state: {
          success: 'hsl(var(--state-success))',
          warning: 'hsl(var(--state-warning))',
          danger: 'hsl(var(--state-danger))',
        },
        // Legacy aliases
        background: 'hsl(var(--surface-base))',
        card: 'hsl(var(--surface-elevated))',
        primary: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--surface-elevated))',
          foreground: 'hsl(var(--foreground-muted))',
        },
      },

      // Design System: Spacing
      spacing: {
        'panel': '1.25rem',  // 20px - standard panel padding
        'section': '2.5rem', // 40px - section gaps
      },

      // Design System: Animation
      animation: {
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'slide-up': 'slide-up 0.2s ease-out forwards',
        'pulse-critical': 'pulse-critical 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
      },
      keyframes: {
        skeleton: {
          '0%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0.4' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-critical': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 hsl(var(--state-danger) / 0.7)',
          },
          '50%': {
            opacity: '0.85',
            boxShadow: '0 0 8px 2px hsl(var(--state-danger) / 0.4)',
          },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },

      // Design System: Transitions
      transitionDuration: {
        hover: '150ms',
      },
    },
  },
  plugins: [],
};
