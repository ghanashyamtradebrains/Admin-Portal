// services/userClient.js

import { apiClient } from "@/lib/apiClient";

export const getUser = () => apiClient("/user");

export const createPost = (newPost) =>
  apiClient("/posts", { method: "POST", data: newPost });

export const updateProfile = (profileData) =>
  apiClient("/user/profile", { method: "PUT", data: profileData });

export const deleteItem = (id) =>
  apiClient(`/items/${id}`, { method: "DELETE" });
