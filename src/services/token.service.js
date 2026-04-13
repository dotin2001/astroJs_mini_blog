export const tokenStore = {
  getAccess() {
    return localStorage.getItem("access_token");
  },
  setAccess(token) {
    localStorage.setItem("access_token", token);
  },

  getRefresh() {
    return localStorage.getItem("refresh_token");
  },
  setRefresh(token) {
    localStorage.setItem("refresh_token", token);
  },

  clear() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};
