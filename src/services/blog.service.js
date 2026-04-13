import { fetchWithAuth } from "./lib/fetchWithAuth";
const API_URL = import.meta.env.PUBLIC_API_URL;

// POST METHOD
async function addBLog(blog_title, author, blog_content, user_id) {
  const res = await fetchWithAuth(`${API_URL}/add-blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blog_title, author, blog_content, user_id }),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function updateBLog(blog_id, blog_title, blog_content) {
  const payload = {};
  if (blog_id) {
    payload.blog_id = blog_id;
    if (blog_title) payload.blog_title = blog_title;
    if (blog_content) payload.blog_content = blog_content;
  }

  const res = await fetchWithAuth(`${API_URL}/update-blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function removeBLog(blog_id) {
  const res = await fetchWithAuth(`${API_URL}/delete-blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blog_id }),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

// GET METHOD
async function getAllBlog() {
  const res = await fetchWithAuth(`${API_URL}/blogs`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function getBlogById(blog_id) {
  const res = await fetchWithAuth(`${API_URL}/blog/${blog_id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

export const blogService = {
  addBLog,
  updateBLog,
  removeBLog,
  getAllBlog,
  getBlogById,
};
