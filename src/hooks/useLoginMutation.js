import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/accountApi";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
