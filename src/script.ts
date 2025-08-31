import './style.css';

import Application from './Application/Application';

// Suppress extension-origin errors (e.g., SubtleCrypto from injected wallets)
try {
    window.addEventListener('error', (e) => {
        const msg = e?.message || '';
        const src = (e as any)?.filename || '';
        if (
            (typeof msg === 'string' && msg.includes('SubtleCrypto not available')) ||
            (typeof src === 'string' && src.startsWith('chrome-extension://'))
        ) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    }, true);

    window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
        const reason: any = e?.reason;
        const str = typeof reason === 'string' ? reason : reason?.message || '';
        const stack = reason?.stack || '';
        if (
            (typeof str === 'string' && str.includes('SubtleCrypto not available')) ||
            (typeof stack === 'string' && stack.includes('chrome-extension://'))
        ) {
            e.preventDefault();
            e.stopImmediatePropagation?.();
        }
    });
} catch {}

const app: Application = new Application();
