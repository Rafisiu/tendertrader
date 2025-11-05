import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 4500,
    strictPort: true,
    // Add allowed hosts to avoid the error
    allowedHosts: [
      'localhost',
      '.mpurwadi.site', // Allow all subdomains of mpurwadi.site
      'vendors.mpurwadi.site', // Specific domain
      'vendor1.mpurwadi.site'  // Also allow the other domain
    ]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
