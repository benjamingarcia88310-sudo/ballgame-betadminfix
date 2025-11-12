const PROD_API_BASE = "https://api.superball-race.com";
const API_PATH = "/api";

const ensureTrailingSlash = (url = "") =>
  url.endsWith("/") ? url : `${url}/`;

const trimTrailingSlash = (url = "") =>
  url.endsWith("/") ? url.replace(/\/+$/, "") : url;

const resolveApiBaseURL = (envValue) => {
  if (envValue) {
    return ensureTrailingSlash(envValue);
  }
  return ensureTrailingSlash(`${trimTrailingSlash(PROD_API_BASE)}${API_PATH}`);
};

const resolveSocketURL = (envValue) => {
  if (envValue) {
    return trimTrailingSlash(envValue);
  }
  return trimTrailingSlash(PROD_API_BASE);
};

export const config = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? resolveApiBaseURL(process.env.VUE_APP_BASE_URL_DEV || "http://localhost:5000/api/")
      : resolveApiBaseURL(process.env.VUE_APP_BASE_URL_PROD),
  socketServerURL:
    process.env.NODE_ENV === "development"
      ? resolveSocketURL(process.env.SOCKET_SERVER_URL_DEV || "http://localhost:5000")
      : resolveSocketURL(process.env.SOCKET_SERVER_URL_PROD),
};
