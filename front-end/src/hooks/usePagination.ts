import { useState, useCallback } from "react";

export default function usePagination(initalPage: number = 1) {
    const [page, setPage] = useState(initalPage);

    const resetPage = useCallback(() => {
        setPage(1)
    }, []);

    return { page, setPage, resetPage };
}
