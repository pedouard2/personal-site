/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"], // We will create this next
    globals: true, // Allows using describe/it/expect without importing
  },
});
