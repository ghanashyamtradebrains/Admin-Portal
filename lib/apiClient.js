// lib/apiClient.js

import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://portal.tradebrains.in/api/";

export const apiClient = async (endpoint, options = {}) => {
  const { method = "GET", data, headers = {} } = options;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      "User-Agent": "Next.js Frontend",
      ...headers,
    },
    body: method !== "GET" ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "API error");
  }

  return response.json();
};

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient("/user"),
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: (newPost) =>
      apiClient("/posts", { method: "POST", data: newPost }),
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (profileData) =>
      apiClient("/user/profile", { method: "PUT", data: profileData }),
  });
}

export function useDeleteItem() {
  return useMutation({
    mutationFn: (id) => apiClient(`/items/${id}`, { method: "DELETE" }),
  });
}
