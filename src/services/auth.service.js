import { tokenStore } from "./token.service";
import { fetchWithAuth } from "./lib/fetchWithAuth";
const API_URL = import.meta.env.PUBLIC_API_URL;

// POST METHOD
async function register(email, user_name, password, confirm_password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, user_name, password, confirm_password }),
  });

  if (!res.ok) throw new Error("Register failed");

  return res.json();
}

async function login(email, password) {
  console.log(email);
  console.log(password);

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();

  // 🔥 lưu cả 2 token
  tokenStore.setAccess(data.access_token);
  tokenStore.setRefresh(data.refresh_token);

  return data; // thường trả token + user
}

// async function refresh(token) {
//   const res = await fetch(`${API_URL}/refresh`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) throw new Error("Unauthorized");

//   return res.json();
// }

async function updateUser(user_name, avt_img, role, description) {
  const payload = {};

  if (user_name) payload.user_name = user_name;
  if (avt_img) payload.avt_img = avt_img;
  if (role) payload.role = role;
  if (description) payload.description = description;

  const res = await fetchWithAuth(`${API_URL}/update-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function logout() {
  const res = await fetchWithAuth(`/logout`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

// GET METHOD
async function getProfile() {
  const res = await fetchWithAuth(`/profile`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function getAllUser() {
  const res = await fetchWithAuth(`/users`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function getUserById(id) {
  const res = await fetchWithAuth(`/user/${id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

export const authService = {
  login,
  register,
  updateUser,
  logout,
  getProfile,
  getAllUser,
  getUserById,
};
