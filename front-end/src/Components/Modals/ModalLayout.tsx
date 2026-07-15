import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type ModalLayoutProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export default function ModalLayout({
  open,
  setOpen,
  children,
}: ModalLayoutProps) {
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
            className="relative z-10 w-125 max-w-[90%] bg-gray-200 rounded-2xl shadow-2xl p-6"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
