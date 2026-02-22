"use client";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AccordionItemProps {
  title: string;
  description: string;
}

export default function AccordionItem({
  title,
  description,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="w-full">
      <motion.div
        className="rounded-lg bg-white shadow-sm overflow-hidden"
        initial={false}
      >
        <div
          className="flex cursor-pointer items-center justify-between p-4 sm:p-5 md:p-6 lg:p-8"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 pr-3">{title}</h2>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-full bg-orange-500 flex-shrink-0"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 text-gray-600 border-t text-sm sm:text-base md:text-lg lg:text-xl whitespace-pre-line">
                {description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}