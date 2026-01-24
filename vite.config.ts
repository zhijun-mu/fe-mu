import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    plugins: [
      react({
        babel: {
          plugins: isBuild ? [["babel-plugin-react-compiler"]] : [],
        },
      }),
      tailwindcss(),
    ],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    envPrefix: "MU_",
  };
});
