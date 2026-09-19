import path from "path"
import { execSync } from "child_process"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Short git commit SHA injected at build time for footer traceability.
let commitHash = "unknown"
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim()
} catch {
  commitHash = process.env.VITE_COMMIT_HASH || "unknown"
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
