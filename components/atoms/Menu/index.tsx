import type { TMenuItem } from "@/types/components.types";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";

interface MenuProps {
  type: "vertical" | "horizontal";
  items: TMenuItem[];
  selectedItemValue: any;
  onItemSelect?: (item: TMenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({
  type,
  items,
  selectedItemValue,
  onItemSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item: TMenuItem) => {
    onItemSelect?.(item);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    const selectedItem = items.find((item) => item.value === selectedItemValue);
    return selectedItem?.label;
  };

  return (
    <div className="w-full relative" ref={menuRef}>
      {/* Selected Item Value Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          flex flex-row items-center justify-between gap-2 text-sm w-full px-3 cursor-pointer 
          rounded-lg transition-all duration-200 ease-in-out
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{getSelectedLabel()}</span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu options (Dropdown) */}
      {isOpen && (
        <ul
          className={`
            absolute flex flex-col items-start mt-3 py-2 z-50 border rounded-lg shadow-lg
            overflow-y-auto bg-white border-gray-300 ${type === "horizontal" ? "flex flex-row" : "flex flex-col"}
          `}
          role="listbox"
        >
          {items.map((item, index) => (
            <li
              key={item.value || index}
              role="option"
              className={`hover:bg-gray-100 w-full cursor-pointer`}
            >
              <button
                onClick={() => handleItemClick(item)}
                className={`
                  w-full flex items-start gap-2 p-3 text-left transition-colors duration-150 cursor-pointer
                  ${selectedItemValue === item.value ? "bg-blue-50" : ""}
                  focus:outline-none focus:bg-opacity-75
                `}
              >
                {item.icon && (
                  <Icon
                    icon={item.icon}
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                  />
                )}
                <div className="flex flex-col items-start gap-1 min-w-0 flex-1">
                  <h4 className={`font-medium text-sm `}>{item.label}</h4>
                  {item.description && (
                    <p className={`text-xs truncate w-full text-gray-600`}>
                      {item.description}
                    </p>
                  )}
                </div>
                {selectedItemValue === item.value && (
                  <Icon
                    icon="solar:check-circle-bold"
                    className="w-4 h-4 ml-auto flex-shrink-0"
                    color="#3b82f6"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
