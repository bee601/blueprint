import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'node:path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx',
                'resources/js/admin.tsx',
                'resources/js/auth.tsx',
            ],
            refresh: ['resources/views/**'],
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
    build: {
        outDir: 'public/build',
        emptyOutDir: true,
        sourcemap: true,
        target: 'es2020',
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui-vendor': [
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-dropdown-menu',
                        '@radix-ui/react-popover',
                        '@radix-ui/react-toast',
                        '@radix-ui/react-tooltip',
                    ],
                    'charts': ['recharts'],
                    'motion': ['framer-motion'],
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: false,
        hmr: {
            host: 'localhost',
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
    },
});
