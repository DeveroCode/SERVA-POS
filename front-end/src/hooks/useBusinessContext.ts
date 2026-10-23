import type { Branch } from "@/types/Branch.types";
import type { Employee } from "@/types/Index.types";
import { LAST_BRANCH_KEY, LAST_BUSINESS_KEY, LAST_MEMBER_KEY, SET_EMPLOYEE_ID_KEY } from "@/utils/key";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function useBusinessContext() {
    const navigate = useNavigate();
    const QC = useQueryClient();
    const { businessId, memberId, branchId, employeeId } = useParams<{ businessId: string; memberId: string; branchId: Branch["_id"]; employeeId: Employee["_id"] }>();

    const currentMemberId =
        localStorage.getItem(LAST_MEMBER_KEY) || memberId;
    const currentEmployeeId =
        localStorage.getItem(SET_EMPLOYEE_ID_KEY) || employeeId;
    const currentBusinessId =
        localStorage.getItem(LAST_BUSINESS_KEY) || businessId;
    const currentBranchId =
        localStorage.getItem(LAST_BRANCH_KEY) || branchId;


    return { currentMemberId, currentBusinessId, currentBranchId, navigate, QC, currentEmployeeId };
}
