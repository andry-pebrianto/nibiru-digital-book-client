import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.API_URL": JSON.stringify(env.API_URL),
      "process.env.MIDTRANS_CLIENT_KEY": JSON.stringify(env.MIDTRANS_CLIENT_KEY),
      "process.env.MIDTRANS_APP_URL": JSON.stringify(env.MIDTRANS_APP_URL),
      "process.env.GOOGLE_CLIENT_ID": JSON.stringify(env.GOOGLE_CLIENT_ID),
    },
    plugins: [react()],
  };
});
