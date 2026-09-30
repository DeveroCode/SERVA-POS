import { motion } from "framer-motion";
import CoverHeaderBusiness from "./CoverHeaderBusiness";
import BusinessCoreInfo from "./BusinessCoreInfo";
import type { Business } from "@/types/Index.types";
import BusinessToolbar from "@/Components/Headers/BusinessToolbar";
import BranchesPreviewView from "@/pages/dashboard/Owner/Branch/BranchesPreviewView";
import BusinessPAAdmon from "@/Components/BusinessPAAdmon";
import BusinessInformation from "@/Components/BusinessInformation";
import { useState } from "react";
import BusinessShorcurts from "@/Components/BusinessShorcurts";
import BusinessDangerZone from "@/Components/BusinessDangerZone";

type CBusinessProps = {
  business: Business;
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
export default function CBusiness({ business }: CBusinessProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.section variants={itemVariants} className="relative space-y-10">
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden group">
          {/* Cover Header */}
          <CoverHeaderBusiness business={business} />

          {/* Business Core Info Bar */}
          <BusinessCoreInfo openEdit={open} setOpenEdit={setOpen} business={business} />
        </div>

        {/* Business Toolbar */}
        <BusinessToolbar />
        {/* Preview Branches */}
        <BranchesPreviewView />
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
