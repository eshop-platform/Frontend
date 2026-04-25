import { apiFetch, parseApiResponse } from "./apiConfig";
import { deleteProduct, fetchProducts } from "./productApi";

const byId = (items) => Array.from(new Map(items.map((item) => [String(item.id), item])).values());

export const fetchDashboardStats = async () => {
  const payload = await parseApiResponse(await apiFetch("/api/dashboard/stats"));
  return payload.data;
};

export const fetchAllAdminProducts = async () => {
  const [approved, pending, rejected] = await Promise.all([
    fetchProducts({ status: "approved" }).catch(() => []),
    fetchProducts({ status: "pending" }).catch(() => []),
    fetchProducts({ status: "rejected" }).catch(() => []),
  ]);

  return byId([...approved, ...pending, ...rejected]);
};

export const removeProduct = deleteProduct;

export const fetchUsers = async () => {
  const payload = await parseApiResponse(await apiFetch("/api/users"));
  return payload.data ?? [];
};

export const banUser = async (id) => {
  const payload = await parseApiResponse(await apiFetch(`/api/users/${id}/ban`, { method: "PATCH" }));
  return payload.data;
};

export const unbanUser = async (id) => {
  const payload = await parseApiResponse(await apiFetch(`/api/users/${id}/unban`, { method: "PATCH" }));
  return payload.data;
};

export const removeUser = async (id) => {
  await parseApiResponse(await apiFetch(`/api/users/${id}`, { method: "DELETE" }));
};

export const fetchCategories = async () => {
  const payload = await parseApiResponse(await apiFetch("/api/categories"));
  return payload.data ?? [];
};

export const createCategory = async (input) => {
  const payload = await parseApiResponse(await apiFetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  }));
  return payload.data;
};

export const updateCategory = async (id, input) => {
  const payload = await parseApiResponse(await apiFetch(`/api/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  }));
  return payload.data;
};

export const removeCategory = async (id) => {
  await parseApiResponse(await apiFetch(`/api/categories/${id}`, { method: "DELETE" }));
};

export const fetchPurchases = async (status) => {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  const payload = await parseApiResponse(await apiFetch(`/api/purchases${query}`));
  return payload.data ?? [];
};

export const approvePurchase = async (id) => {
  const payload = await parseApiResponse(await apiFetch(`/api/purchases/${id}/approve`, { method: "PATCH" }));
  return payload.data;
};

export const rejectPurchase = async (id) => {
  const payload = await parseApiResponse(await apiFetch(`/api/purchases/${id}/reject`, { method: "PATCH" }));
  return payload.data;
};
