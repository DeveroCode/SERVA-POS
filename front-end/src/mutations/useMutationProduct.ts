import useBusinessContext from "@/hooks/useBusinessContext";
import { queryKeys } from "@/lib/queryKeys";
import { ProductService } from "@/services/ProductService";
import type { getOne, ProductForm, setDisccountForm, uploadProductImage } from "@/types/Product.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
export function useCreateProduct() {
    const { navigate } = useBusinessContext();

    return useMutation({
        mutationFn: ProductService.create,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate('/branch/products');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}

export function useUpdateProduct(formData: ProductForm, _id: getOne) {
    const { navigate, QC, currentBranchId } = useBusinessContext();

    return useMutation({
        mutationFn: () => ProductService.update(formData, _id),
        onSuccess: (data) => {
            toast.success(data.message);
            QC.invalidateQueries({ queryKey: queryKeys.products.all(currentBranchId) });
            navigate('/branch/products');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}

export function useDeleteProduct(_id: getOne) {
    const { navigate, QC, currentBranchId } = useBusinessContext();

    return useMutation({
        mutationFn: () => ProductService.delete(_id),
        onSuccess: (data) => {
            toast.success(data.message);
            QC.invalidateQueries({ queryKey: queryKeys.products.all(currentBranchId) });
            navigate('/branch/products');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    })
}

export function useSetDiscountProduct() {
    const { navigate, QC, currentBranchId } = useBusinessContext();

    return useMutation({
        mutationFn: (formData: setDisccountForm) => ProductService.setDiscount(formData),
        onSuccess: (data) => {
            toast.success(data.message);
            QC.invalidateQueries({ queryKey: queryKeys.products.all(currentBranchId) });
            navigate('/branch/products');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}

export function useUploadImageProduct(){
    const { navigate, QC, currentBranchId } = useBusinessContext();

    return useMutation({
        mutationFn: (formData: uploadProductImage) => ProductService.uploadImage(formData),
        onSuccess: (data) => {
            toast.success(data.message);
            QC.invalidateQueries({ queryKey: queryKeys.products.all(currentBranchId) });
            navigate('/branch/products');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}