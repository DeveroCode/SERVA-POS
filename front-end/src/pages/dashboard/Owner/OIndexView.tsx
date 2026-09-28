import CAddBusiness from "@/Components/Cards/Business/CAddBusiness";
import { useBusinesses } from "@/hooks/useBusinesses";
import { motion } from "framer-motion";
import Loader from "./../../Loader";
import BusinessCard from "@/Components/Cards/Business/BusinessCard";
import usePagination from "@/hooks/usePagination";

export default function OIndexView() {
  // Pagination
  const { page } = usePagination();
  // Business
  const { data: business, isPending } = useBusinesses(page);
  const businesses = business?.data ?? [];

  if (isPending) return <Loader />;

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50/60 p-4 sm:p-6 lg:p-8 space-y-8 font-sans text-gray-900 max-w-[1600px] mx-auto pb-24"
    >
      {businesses ? <BusinessCard /> : <CAddBusiness />}
    </motion.div>
  );
}
