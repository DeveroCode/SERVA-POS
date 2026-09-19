import type { Branch } from "@/types/Branch.types";
import { LAST_BRANCH_KEY, LAST_BUSINESS_KEY, LAST_MEMBER_KEY } from "@/utils/key";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function useBusinessContext() {
    const navigate = useNavigate();
    const QC = useQueryClient();
    const { businessId, memberId, branchId } = useParams<{ businessId: string; memberId: string; branchId: Branch["_id"] }>();

    const currentMemberId =
        localStorage.getItem(LAST_MEMBER_KEY) || memberId;

    const currentBusinessId =
        localStorage.getItem(LAST_BUSINESS_KEY) || businessId;
    const currentBranchId =
        localStorage.getItem(LAST_BRANCH_KEY) || branchId;


    return { currentMemberId, currentBusinessId, currentBranchId, navigate, QC };
}
