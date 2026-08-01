/**
 * Master configuration object. Read at boot from a JSON manifest baked at
 * build time so that the entire UI can be re-themed without touching code.
 *
 * Pulled by `useConfig` and by the Laravel-side SettingsEngine.
 */
export interface BlueprintConfig {
    app: {
        name: string;
        version: string;
        description: string;
        supportUrl: string;
        documentationUrl: string;
    };
    api: {
        baseUrl: string;
        csrfHeader: string;
        timeoutMs: number;
        retries: number;
    };
    websocket: {
        url: string;
        heartbeatMs: number;
        reconnectMs: number;
    };
    features: Record<string, boolean>;
    routes: Record<string, string>;
    brand: {
        name: string;
        tagline: string;
        primaryLogoPath: string;
        invertedLogoPath: string;
        faviconPath: string;
    };
    defaults: {
        theme: string;
        accent: string;
        sidebar: 'expanded' | 'collapsed' | 'floating';
        density: 'comfortable' | 'compact' | 'spacious';
        pageTransitions: boolean;
    };
    links: Array<{ label: string; href: string; external?: boolean }>;
    socials: Array<{ label: string; href: string; icon: string }>;
}

declare global {
    interface Window {
        BlueprintConfig?: BlueprintConfig;
        PTERO?: { csrfToken: string; baseUrl: string };
    }
}

export const config: BlueprintConfig =
    typeof window !== 'undefined' && window.BlueprintConfig
        ? window.BlueprintConfig
        : {
              app: {
                  name: 'Blueprint',
                  version: '1.0.0',
                  description: 'A premium replacement UI for the Pterodactyl Panel.',
                  supportUrl: 'https://pterodactyl.io/support',
                  documentationUrl: 'https://pterodactyl.io',
              },
              api: {
                  baseUrl: '/api',
                  csrfHeader: 'X-CSRF-Token',
                  timeoutMs: 15000,
                  retries: 2,
              },
              websocket: {
                  url: '/api/ws',
                  heartbeatMs: 20000,
                  reconnectMs: 3000,
              },
              features: {
                  commandPalette: true,
                  notifications: true,
                  auditLogs: true,
                  securityCenter: true,
                  widgetSystem: true,
                  themeManager: true,
                  maintenanceCenter: true,
              },
              routes: {
                  dashboard: '/',
                  account: '/account',
                  servers: '/servers',
                  admin: '/admin',
              },
              brand: {
                  name: 'Blueprint',
                  tagline: 'Premium Pterodactyl UI',
                  primaryLogoPath: '/images/logo.svg',
                  invertedLogoPath: '/images/logo-inverted.svg',
                  faviconPath: '/favicon.svg',
              },
              defaults: {
                  theme: 'blueprint-dark',
                  accent: 'violet',
                  sidebar: 'expanded',
                  density: 'comfortable',
                  pageTransitions: true,
              },
              links: [
                  { label: 'Documentation', href: 'https://pterodactyl.io' },
                  { label: 'Support', href: 'https://discord.gg/pterodactyl' },
              ],
              socials: [
                  { label: 'GitHub', href: 'https://github.com/pterodactyl/panel', icon: 'github' },
                  { label: 'Discord', href: 'https://discord.gg/pterodactyl', icon: 'discord' },
              ],
          };
