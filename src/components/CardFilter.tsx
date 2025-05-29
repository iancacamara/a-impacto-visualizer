
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface CardFilterProps {
  placeholder: string;
  onFilter: (value: string) => void;
  className?: string;
}

const CardFilter = ({ placeholder, onFilter, className = "" }: CardFilterProps) => {
  const [filterValue, setFilterValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    onFilter(value);
    setIsActive(value.length > 0);
  };

  const clearFilter = () => {
    setFilterValue('');
    onFilter('');
    setIsActive(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={filterValue}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="pl-10 pr-10 bg-white/80 backdrop-blur-sm border-white/30 focus:border-purple-300 focus:ring-purple-200 transition-all duration-300"
        />
        <AnimatePresence>
          {isActive && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearFilter}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardFilter;
