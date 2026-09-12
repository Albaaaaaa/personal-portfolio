/**
 * Vercel serverless entry point for /api/chat.
 * Vercel only auto-detects serverless functions inside /api at the project
 * root; the actual implementation lives in server/api/chat.ts and is shared
 * with the Vite dev middleware.
 */
export { default } from '../server/api/chat'
