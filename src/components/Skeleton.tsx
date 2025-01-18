import { motion } from "framer-motion";

export default function CardSkeleton() {
  return (
    <motion.div
      className="w-full max-w-xs p-4 mx-auto rounded-md shadow-md bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-48 w-full bg-gray-300 animate-pulse rounded-md"></div>
      <div className="mt-4 space-y-2">
        <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>
    </motion.div>
  );
}
