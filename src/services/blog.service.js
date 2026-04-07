const API_URL = import.meta.env.PUBLIC_API_URL;

// POST METHOD
async function addBLog(token, blog_title, author, blog_content, user_id) {
  const res = await fetch(`${API_URL}/add-blog`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blog_title, author, blog_content, user_id }),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function updateBLog(token, blog_id, blog_title, blog_content) {
  const payload = {};
  if (blog_id) {
    payload.blog_id = blog_id;
    if (blog_title) payload.blog_title = blog_title;
    if (blog_content) payload.blog_content = blog_content;
  }

  const res = await fetch(`${API_URL}/update-blog`, {
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

async function removeBLog(token, blog_id) {
  const res = await fetch(`${API_URL}/delete-blog`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ blog_id }),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

// GET METHOD
async function getAllBlog(token) {
  const res = await fetch(`${API_URL}/blogs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function getBlogById(token, blog_id) {
  const res = await fetch(`${API_URL}/blog/${blog_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
