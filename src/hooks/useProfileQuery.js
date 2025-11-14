import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/accountApi";

export function useProfile() {
  const hasToken = !!localStorage.getItem("accessToken");
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: hasToken,
  });
}
