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
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json(); // thường trả token + user
}

async function refresh(token) {
  const res = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function updateUser(token, user_name, avt_img, role, description) {
  const payload = {};

  if (user_name) payload.user_name = user_name;
  if (avt_img) payload.avt_img = avt_img;
  if (role) payload.role = role;
  if (description) payload.description = description;

  const res = await fetch(`${API_URL}/update-user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function logout(token) {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

// GET METHOD
async function getProfile(token) {
  const res = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function getAllUser(token) {
  const res = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function getUserById(token, id) {
  const res = await fetch(`${API_URL}/user/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

export const authService = {
  login,
  register,
  refresh,
  updateUser,
  logout,
  getProfile,
  getAllUser,
  getUserById,
};
