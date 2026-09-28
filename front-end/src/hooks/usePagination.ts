import { useState } from "react";

export default function usePagination(initalPage: number = 1) {
    const [page, setPage] = useState(initalPage);

    const resetPage = () => {
        setPage(1);
    };

    return { page, setPage, resetPage };
}
