"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUser, createPost, updateProfile, deleteItem } from "./apiClient";

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
  });
}

export function useDeleteItem() {
  return useMutation({
    mutationFn: deleteItem,
  });
}
