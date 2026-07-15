import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import PrimaryTitle from "../Texts/PrimaryTitle";
import { XCircle } from "lucide-react";

type ModalExampleProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: React.ReactNode;
};

export default function ModalExample({
  open,
  setOpen,
}: ModalExampleProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-125 max-w-[90%] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6"
          >
            <section className="">
              <PrimaryTitle
                title="Add Product"
                description="Create a new product for your store."
              />

              <button>
                <XCircle />
              </button>
            </section>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
