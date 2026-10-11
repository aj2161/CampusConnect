// Keep the frontend on 5173 so API requests on 8080 reach Spring Boot.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: { port: 5173, strictPort: true },
  },
});
