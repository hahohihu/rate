import { defineConfig } from "cypress";
import './data/drizzle/envConfig';

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000"
  },
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.AUTH_GOOGLE_ID,
    googleClientSecret: process.env.AUTH_GOOGLE_SECRET,
  },
});
