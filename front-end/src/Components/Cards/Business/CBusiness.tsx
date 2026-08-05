import { motion } from "framer-motion";
import CoverHeaderBusiness from "./CoverHeaderBusiness";
import BusinessCoreInfo from "./BusinessCoreInfo";
import type { Business } from "@/types/Index.types";


type CBusinessProps = {
  business: Business;
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
export default function CBusiness({ business }: CBusinessProps) {
  return (
    <>
      <motion.section variants={itemVariants} className="relative">
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden group">
          {/* Cover Header */}
          <CoverHeaderBusiness business={business} />

          {/* Business Core Info Bar */}
          <BusinessCoreInfo business={business} />
        </div>
      </motion.section>
    </>
  );
}
