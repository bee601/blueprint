/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        './resources/**/*.{php,js,ts,jsx,tsx,html,blade.php}',
        './src/**/*.{ts,tsx,js,jsx,html}',
        './theme/**/*.{json}',
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '2rem',
                xl: '2.5rem',
                '2xl': '3rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
                '3xl': '1600px',
            },
        },
        extend: {
            colors: {
                border: 'rgb(var(--border) / <alpha-value>)',
                input: 'rgb(var(--input) / <alpha-value>)',
                ring: 'rgb(var(--ring) / <alpha-value>)',
                background: 'rgb(var(--background) / <alpha-value>)',
                foreground: 'rgb(var(--foreground) / <alpha-value>)',
                primary: {
                    DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
                    foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
                    50: '#F4F2FF',
                    100: '#E9E5FF',
                    200: '#D2CAFF',
                    300: '#B3A4FF',
                    400: '#9177FF',
                    500: '#7557F0',
                    600: '#6C5CE7',
                    700: '#5A48C9',
                    800: '#4838A0',
                    900: '#382A7A',
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
                    foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
                    foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
                    foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
                },
                success: {
                    DEFAULT: 'rgb(var(--success) / <alpha-value>)',
                    foreground: 'rgb(var(--success-foreground) / <alpha-value>)',
                },
                warning: {
                    DEFAULT: 'rgb(var(--warning) / <alpha-value>)',
                    foreground: 'rgb(var(--warning-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
                    foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
                    foreground: 'rgb(var(--popover-foreground) / <alpha-value>)',
                },
                card: {
                    DEFAULT: 'rgb(var(--card) / <alpha-value>)',
                    foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
                },
                sidebar: {
                    DEFAULT: 'rgb(var(--sidebar) / <alpha-value>)',
                    foreground: 'rgb(var(--sidebar-foreground) / <alpha-value>)',
                    border: 'rgb(var(--sidebar-border) / <alpha-value>)',
                    accent: 'rgb(var(--sidebar-accent) / <alpha-value>)',
                },
                navbar: {
                    DEFAULT: 'rgb(var(--navbar) / <alpha-value>)',
                    foreground: 'rgb(var(--navbar-foreground) / <alpha-value>)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 4px)',
                sm: 'calc(var(--radius) - 8px)',
                xl: 'calc(var(--radius) + 4px)',
                '2xl': 'calc(var(--radius) + 8px)',
                '3xl': 'calc(var(--radius) + 12px)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
                mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
                display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                '2xs': ['0.6875rem', { lineHeight: '1rem' }],
                xs: ['0.75rem', { lineHeight: '1.125rem' }],
                sm: ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['0.9375rem', { lineHeight: '1.5rem' }],
                lg: ['1.0625rem', { lineHeight: '1.625rem' }],
                xl: ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1.15' }],
                '6xl': ['3.75rem', { lineHeight: '1.1' }],
            },
            boxShadow: {
                'glow-sm': '0 0 12px -2px rgb(var(--primary) / 0.35)',
                'glow': '0 0 24px -4px rgb(var(--primary) / 0.45)',
                'glow-lg': '0 0 40px -6px rgb(var(--primary) / 0.55)',
                'card': '0 1px 0 0 rgb(255 255 255 / 0.03) inset, 0 0 0 1px rgb(255 255 255 / 0.04), 0 8px 24px -8px rgb(0 0 0 / 0.4)',
                'card-hover': '0 1px 0 0 rgb(255 255 255 / 0.05) inset, 0 0 0 1px rgb(255 255 255 / 0.06), 0 12px 32px -8px rgb(0 0 0 / 0.5)',
                'pop': '0 1px 0 0 rgb(255 255 255 / 0.05) inset, 0 0 0 1px rgb(255 255 255 / 0.05), 0 16px 40px -8px rgb(0 0 0 / 0.5)',
                'inner-glow': 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
            },
            backdropBlur: {
                xs: '2px',
                '4xl': '72px',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'fade-out': {
                    from: { opacity: '1' },
                    to: { opacity: '0' },
                },
                'slide-in-from-top': {
                    from: { transform: 'translateY(-12px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-from-bottom': {
                    from: { transform: 'translateY(12px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-from-left': {
                    from: { transform: 'translateX(-12px)', opacity: '0' },
                    to: { transform: 'translateX(0)', opacity: '1' },
                },
                'slide-in-from-right': {
                    from: { transform: 'translateX(12px)', opacity: '0' },
                    to: { transform: 'translateX(0)', opacity: '1' },
                },
                'scale-in': {
                    from: { transform: 'scale(0.95)', opacity: '0' },
                    to: { transform: 'scale(1)', opacity: '1' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                },
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgb(var(--primary) / 0.4)' },
                    '50%': { boxShadow: '0 0 0 8px rgb(var(--primary) / 0)' },
                },
                'ping-slow': {
                    '75%, 100%': { transform: 'scale(1.6)', opacity: '0' },
                },
                'gradient-shift': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                'caret-blink': {
                    '0%, 70%, 100%': { opacity: '1' },
                    '20%, 50%': { opacity: '0' },
                },
                'progress-stripes': {
                    from: { 'background-position': '1rem 0' },
                    to: { 'background-position': '0 0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-out': 'fade-out 0.2s ease-out',
                'slide-in-from-top': 'slide-in-from-top 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-from-bottom': 'slide-in-from-bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-from-left': 'slide-in-from-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-in-from-right': 'slide-in-from-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                shimmer: 'shimmer 1.6s linear infinite',
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-glow': 'pulse-glow 2s ease-out infinite',
                'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                'gradient-shift': 'gradient-shift 6s ease infinite',
                'caret-blink': 'caret-blink 1.1s steps(2) infinite',
                'progress-stripes': 'progress-stripes 1s linear infinite',
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
                'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'mesh-1': 'radial-gradient(at 27% 37%, rgb(var(--primary) / 0.18) 0px, transparent 50%), radial-gradient(at 97% 21%, rgb(var(--accent) / 0.18) 0px, transparent 50%), radial-gradient(at 52% 99%, rgb(var(--primary) / 0.12) 0px, transparent 50%), radial-gradient(at 10% 29%, rgb(var(--accent) / 0.12) 0px, transparent 50%)',
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            },
        },
    },
    plugins: [
        // Add custom plugin registrations here when needed.
    ],
};
