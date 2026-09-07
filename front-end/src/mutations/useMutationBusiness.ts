import { queryKeys } from "@/lib/queryKeys";
import { BusinessService } from "@/services/BusinessService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useCreateBusiness() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: BusinessService.create,
    onSuccess: (data: string) => {
      toast.success(data);
      navigate('/dashboard/general');
      queryClient.invalidateQueries({ queryKey: queryKeys.bussiness.all });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}

export function useUpdateBusiness() {
  const navigate = useNavigate();
  const QC = useQueryClient();

  return useMutation({
    mutationFn: BusinessService.update,
    onSuccess: async (data, variables) => {
      toast.success(data);
      await Promise.all([
        QC.invalidateQueries({ queryKey: queryKeys.bussiness.all }),
        QC.invalidateQueries({ queryKey: queryKeys.bussiness.one(variables.businessId) }),
      ]);
      navigate('/dashboard/general');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}

export function useDeleteBusiness() {
  const QC = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: BusinessService.delete,
    onSuccess: (data) => {
      toast.success(data.message);
      QC.invalidateQueries({ queryKey: queryKeys.bussiness.all });
      navigate('/dashboard/general');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}

export function useUploadLogoBusiness() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: BusinessService.uploadLogo,
    onSuccess: async (data, variables) => {
      toast.success(data);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.bussiness.all,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.bussiness.one(variables._id),
        }),
      ]);

      navigate("/dashboard/general");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
export function useUploadCoverBusiness() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: BusinessService.uploadCover,
    onSuccess: async (data, variables) => {
      toast.success(data);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.bussiness.all,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.bussiness.one(variables._id),
        }),
      ]);

      navigate("/dashboard/general");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}