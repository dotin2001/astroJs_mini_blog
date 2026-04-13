// src/lib/fetchWithAuth.js
import { tokenStore } from "../token.service";

const API_URL = import.meta.env.PUBLIC_API_URL;

let refreshPromise = null;

async function handleRefresh() {
  if (!refreshPromise) {
    const refreshToken = tokenStore.getRefresh();

    refreshPromise = fetch(`${API_URL}/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Refresh failed");
        return res.json();
      })
      .then((data) => {
        tokenStore.setAccess(data.access_token);

        // 🔥 nếu BE trả refresh mới thì update luôn
        if (data.refresh_token) {
          tokenStore.setRefresh(data.refresh_token);
        }

        return data.access_token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export async function fetchWithAuth(url, options = {}) {
  let accessToken = tokenStore.getAccess();

  let res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 🔥 expired
  if (res.status === 401) {
    const newToken = await handleRefresh();

    res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res;
}
