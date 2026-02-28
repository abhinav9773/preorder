const DEFAULT_BACKEND_URL = "https://myperro-website-backend.onrender.com";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getBackendBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    process.env.BACKEND_URL ??
    DEFAULT_BACKEND_URL;

  return trimTrailingSlash(raw);
}

