import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/**/*.test.*", "!src/**/*.spec.*"],
});
