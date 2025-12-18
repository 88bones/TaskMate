// Get API base URL from environment or use default
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "production"
    ? window.location.origin + "/api"
    : "http://localhost:3001");

console.log("API Base URL:", API_BASE_URL);
