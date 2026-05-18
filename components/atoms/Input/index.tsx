import { Icon } from "@iconify/react";
import { useState } from "react";

interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  classname?: string;
  icon?: string;
  value: any;
  onChange: (v: any) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  classname,
  icon,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col items-start gap-1 ${classname}`}>
      {label && <label className="">{label}</label>}
      <div
        className={`w-full h-10 flex items-center gap-2 py-2 px-4 rounded-lg border border-slate-400 hover:border-black focus-within:border-slate-600 transition-all duration-300`}
      >
        {icon && <Icon icon={icon} width={20} />}
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-slate-600"
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
        />

        {type === "password" && (
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            width={20}
            className="text-slate-700"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
