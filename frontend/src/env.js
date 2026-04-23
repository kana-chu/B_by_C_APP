export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;

export const runtime = import.meta.env.VITE_RUNTIME;
export const isElectron = runtime === 'electron';
export const isBrowser = runtime === 'browser';