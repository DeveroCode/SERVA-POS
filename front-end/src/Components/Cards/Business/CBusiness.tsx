import { motion } from "framer-motion";
import CoverHeaderBusiness from "./CoverHeaderBusiness";
import BusinessCoreInfo from "./BusinessCoreInfo";
import {
  type FoundBranch,
  type Business,
  type SearchMemberParams,
} from "@/types/Index.types";
import BusinessToolbar from "@/Components/Headers/BusinessToolbar";
import BranchesPreviewView from "@/pages/dashboard/Owner/Branch/BranchesPreviewView";
import BusinessPAAdmon from "@/Components/BusinessPAAdmon";
import BusinessInformation from "@/Components/BusinessInformation";
import { useState } from "react";
import BusinessShorcurts from "@/Components/BusinessShorcurts";
import BusinessDangerZone from "@/Components/BusinessDangerZone";
import { useSearchBranch } from "@/mutations/useMutationBusinessMember";
import useBusinessContext from "@/hooks/useBusinessContext";
import Loader from "@/pages/Loader";
import { useBranches } from "@/hooks/useBranches";
import NotFoundData from "@/Components/NoData/NotFoundData";

type CBusinessProps = {
  business: Business;
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
export default function CBusiness({ business }: CBusinessProps) {
  // Open Modal
  const [open, setOpen] = useState(false);

  // Search Branches
  const [foundBranch, setFoundBranch] = useState<
    FoundBranch["foundBranch"] | null
  >(null);
  const [searchValue, setSearchValue] =
    useState<SearchMemberParams["search"]>("");
  const { mutate, isPending } = useSearchBranch();

  // Branches Context
  const { currentBusinessId } = useBusinessContext();
  const { data: branch, isLoading } = useBranches(currentBusinessId);
  const branches = branch?.data ?? [];

  // Search handlers
  const handleSearchBranchFound = (branch: FoundBranch) => {
    setFoundBranch(branch.foundBranch);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    mutate(
      { search: searchValue.trim() },
      {
        onSuccess: (branch) => {
          handleSearchBranchFound(branch);
        },
      },
    );
  };

  if (isLoading) return <Loader />;
  if (isPending) return <Loader />;
  return (
    <>
      <motion.section variants={itemVariants} className="relative space-y-10">
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden group">
          {/* Cover Header */}
          <CoverHeaderBusiness business={business} />

          {/* Business Core Info Bar */}
          <BusinessCoreInfo
            openEdit={open}
            setOpenEdit={setOpen}
            business={business}
          />
        </div>

        {/* Business Toolbar */}
        <BusinessToolbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setFoundBranch={setFoundBranch}
          handleSearch={handleSearch}
        />
        {/* Preview Branches */}
        {!foundBranch && !branches.length ? (
          <NotFoundData
            message="No se encontraron sucursales"
            subMessage="Puedes crear una nueva sucursal"
          />
        ) : (
          <BranchesPreviewView branches={branches} foundBranch={foundBranch} />
        )}
        {/* Personnel and Administrator */}
        <BusinessPAAdmon />
        {/* Information */}
        <BusinessInformation open={open} setOpen={setOpen} />
        {/* Shorcurts */}
        <BusinessShorcurts />
        {/* Danger Zone */}
        <BusinessDangerZone />
      </motion.section>
    </>
  );
}
