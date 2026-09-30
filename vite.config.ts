import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({ server: { entry: "server" } }),
    nitro({ preset: "vercel" }),
    viteReact(),
    tailwindcss(),
  ],
});
