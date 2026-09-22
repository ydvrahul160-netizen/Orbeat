import { fetchJson } from "./fetchClient";

export function register(data) {
  return fetchJson("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function login({ identifier, password }) {
  return fetchJson("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: identifier,
      email: identifier,
      password,
    }),
  });
}

export function logout() {
  return fetchJson("/auth/logout", {
    method: "POST",
  });
}