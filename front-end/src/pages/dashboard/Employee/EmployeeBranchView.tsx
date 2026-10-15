import BranchConfigAccessCard from "@/Components/Cards/Employee/BranchConfigAccessCard";
import EmployeeActiveBranch from "@/Components/Cards/Employee/EmployeeActiveBranch";
import GeneralInformationCard from "@/Components/Cards/Employee/GeneralInformationCard";
import ScheduleBranch from "@/Components/Cards/Employee/ScheduleBranch";
import TeamBranchCard from "@/Components/Cards/Employee/TeamBranchCard";
import EmployeeBranchHeader from "@/Components/Headers/EmployeeBranchHeader";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useEmployeeBranch } from "@/hooks/useEmployeeBranch";
import Loader from "@/pages/Loader";
import { Navigate } from "react-router-dom";

export default function EmployeeBranchView() {
  const { currentBranchId } = useBusinessContext();
  const {
    data: branch,
    isError,
    isLoading,
  } = useEmployeeBranch(currentBranchId);

  if (isError) return Navigate({ to: "/branches" });
  if (isLoading) return <Loader />;
  return (
    <>
      {/*Hero  */}
      <EmployeeBranchHeader Branch={branch} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-6">
          <GeneralInformationCard branch={branch} />

          <EmployeeActiveBranch isBranchActive={branch.isActive} />
        </div>

        <div className="lg:col-span-5 space-y-6">
            {/* Widget - 1 */}
            <ScheduleBranch />
            {/* Widget - 2 */}
            <TeamBranchCard />
            {/* Widget - 3 */}
            <BranchConfigAccessCard />
        </div>
      </div>
    </>
  );
}
