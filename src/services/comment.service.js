const { comment } = require("postcss");
import { fetchWithAuth } from "./lib/fetchWithAuth";

const API_URL = import.meta.env.PUBLIC_API_URL;

// POST METHOD
async function addComment(user_id, blog_id, comment_content) {
  const res = await fetch(`${API_URL}/add-comment-blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, blog_id, comment_content }),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

async function removeComment(comment_id) {
  const res = await fetch(`${API_URL}/delete-comment-blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment_id }),
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

// GET METHOD
async function getAllComment() {
  const res = await fetch(`${API_URL}/comments`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

export const commentService = {
  addComment,
  removeComment,
  getAllComment,
};
