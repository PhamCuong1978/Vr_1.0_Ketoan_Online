
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Fix: Cast process to any to avoid "Property cwd does not exist on type Process" TS error in some environments
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env for use in the app (specifically for API_KEY)
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
