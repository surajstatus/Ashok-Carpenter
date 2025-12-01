// src/services/api.js
const host = window.location.hostname; 
export const BASE = `http://${host}:5000/api/gallery`;
export const BASE_FOLDER = `http://${host}:5000/api/folders`;
export const ADMIN_API = `http://${host}:5000/api/admin`;


export function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const authHeaderFile = () => ({
  "Authorization": "Bearer " + localStorage.getItem("token")
});


export async function fetcher(url) {
  const res = await fetch(url, { headers: authHeader() });
  if (!res.ok) {
    const err = await res.json().catch(()=>({message: res.statusText}));
    throw new Error(err.message || "Fetch error");
  }
  return res.json();
}
