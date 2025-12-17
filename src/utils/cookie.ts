interface SetCookieOptions {
  days?: number;
  path?: string;
}

export function getCookie(name: string) {
  const encodedName = encodeURIComponent(name) + "=";

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    if (cookie.startsWith(encodedName)) {
      return decodeURIComponent(cookie.slice(encodedName.length));
    }
  }

  return null;
}

export function setCookie(name: string, value: string, options: SetCookieOptions = {}) {
  const { days = 1, path = "/" } = options;

  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
}

export function deleteCookie(name: string, path = "/") {
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=${path}`;
}
