import { motion } from "motion/react";
import { Icon } from "@iconify/react";

interface CheckboxProps {
  checked: boolean;
  onCheck: (v: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheck }) => {
  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheck(!checked)}
      whileTap={{ scale: 0.9 }}
      className={`w-6 h-6 p-1 rounded-sm flex items-center justify-center border transition-colors duration-200
        ${checked ? "border-blue-600 bg-blue-50" : "border-slate-400 hover:border-black"}
      `}
    >
      <Icon
        icon="mdi:check"
        width={24}
        className="text-blue-600"
        style={{
          transform: checked ? "scale(1)" : "scale(0)",
          opacity: checked ? 1 : 0,
          transition: "all 150ms ease",
        }}
      />
    </motion.button>
  );
};

export default Checkbox;
