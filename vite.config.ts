import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { resolve as pathResolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        preserve: ["ld+json"],
        scss: {
          includePaths: ["src/"],
          quietDeps: true,
        },
      }),
    }),
  ],
  optimizeDeps: {
    include: ["highlight.js", "highlight.js/lib/core"],
    exclude: ["svelte-navigator"],
  },
  resolve: {
    alias: {
      "~": pathResolve(__dirname, "src"),
    },
  },
});
