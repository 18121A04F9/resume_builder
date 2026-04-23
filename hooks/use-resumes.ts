"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ResumeListItem {
  id: string;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchResumes(): Promise<{ resumes: ResumeListItem[] }> {
  const res = await fetch("/api/resumes");
  if (!res.ok) throw new Error("Failed to fetch resumes");
  return res.json();
}

async function deleteResumeReq(id: string): Promise<void> {
  const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete resume");
}

export function useResumes(_userId: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["resumes"],
    queryFn: fetchResumes,
  });

  const { mutateAsync: deleteResume } = useMutation({
    mutationFn: deleteResumeReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });

  return {
    resumes: data?.resumes ?? [],
    isLoading,
    error,
    deleteResume,
  };
}
