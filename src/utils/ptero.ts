import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { backoff } from './async';

export interface PteroConfig {
    baseURL: string;
    apiKey?: string;
    timeout?: number;
    retries?: number;
    csrfToken?: string;
}

export interface PteroResponse<T = unknown> {
    data: T;
    status: number;
    headers: Record<string, string>;
    raw: AxiosResponse<T>;
}

/**
 * Thin wrapper around axios tailored to Pterodactyl's REST API.
 * Handles auth headers, CSRF token, automatic retries with exponential
 * backoff, and structured error responses.
 */
class Ptero {
    private client: AxiosInstance;
    private retries: number;

    constructor(config: PteroConfig) {
        this.retries = config.retries ?? 2;
        this.client = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout ?? 15000,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
                ...(config.csrfToken ? { 'X-CSRF-Token': config.csrfToken } : {}),
            },
        });
    }

    setApiKey(key: string): void {
        this.client.defaults.headers.common.Authorization = `Bearer ${key}`;
    }

    setCsrfToken(token: string): void {
        this.client.defaults.headers.common['X-CSRF-Token'] = token;
    }

    async request<T = unknown>(config: AxiosRequestConfig): Promise<PteroResponse<T>> {
        const attempt = async (): Promise<PteroResponse<T>> => {
            try {
                const raw = await this.client.request<T>(config);
                return {
                    data: raw.data,
                    status: raw.status,
                    headers: this.headersToObject(raw.headers),
                    raw,
                };
            } catch (err) {
                if (axios.isAxiosError(err) && err.response) {
                    const status = err.response.status;
                    const message =
                        (err.response.data as { detail?: string; message?: string } | undefined)?.detail ??
                        (err.response.data as { detail?: string; message?: string } | undefined)?.message ??
                        err.message;
                    const error = new Error(message) as Error & { status?: number; data?: unknown };
                    error.status = status;
                    error.data = err.response.data;
                    throw error;
                }
                throw err;
            }
        };

        let lastError: unknown;
        for (let i = 0; i <= this.retries; i++) {
            try {
                return await attempt();
            } catch (err) {
                lastError = err;
                const status = (err as { status?: number }).status;
                if (status && status >= 400 && status < 500) break; // do not retry client errors
                if (i < this.retries) await sleep(backoff(i));
            }
        }
        throw lastError;
    }

    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<PteroResponse<T>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }
    post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<PteroResponse<T>> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }
    put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<PteroResponse<T>> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }
    patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<PteroResponse<T>> {
        return this.request<T>({ ...config, method: 'PATCH', url, data });
    }
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<PteroResponse<T>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }

    private headersToObject(headers: AxiosResponse['headers']): Record<string, string> {
        const out: Record<string, string> = {};
        for (const [k, v] of Object.entries(headers)) {
            out[k] = String(v);
        }
        return out;
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let singleton: Ptero | null = null;

export default function ptero(config?: PteroConfig): Ptero {
    if (!singleton) {
        if (!config) {
            throw new Error('ptero() called without config before initialization');
        }
        singleton = new Ptero(config);
    }
    return singleton;
}

export function configurePtero(config: PteroConfig): Ptero {
    singleton = new Ptero(config);
    return singleton;
}

export { Ptero };
