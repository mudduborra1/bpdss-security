import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import DepartmentSearchModal from "./DepartmentSearchModal";

export default function SelectField({
  label,
  name,
  value,
  options = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Find selected option based on ID
  const selectedOption = options.find((item) => item.id == value);

  // Select option handler
  const handleSelect = (item) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: item.id,
        },
      });
    }
    setOpen(false);
  };

  return (
    <>
      <div className="w-full relative" ref={wrapperRef}>
        {/* Label */}
        {label && (
          <label className="block text-sm text-gray-600 mb-1">
            {label}
          </label>
        )}

        {/* Input Field Trigger */}
        <div 
          onClick={() => setOpen(!open)}
          className="relative border-b border-gray-300 hover:border-gray-400 focus-within:border-blue-500 transition-colors cursor-pointer flex items-center justify-between py-2"
        >
          {/* Visual Display Selection */}
          <span className={`text-sm ${selectedOption ? "text-gray-700" : "text-gray-400"}`}>
            {selectedOption?.complete_name || "Select an option..."}
          </span>
          
          {/* Hidden input to hold value for standard form submissions */}
          <input type="hidden" name={name} value={value || ""} />

          {/* Dropdown Icon */}
          <button
            type="button"
            className="text-gray-500 pointer-events-none"
          >
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Dropdown */}
        {open && (
          <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto">
            {options.length > 0 ? (
              options.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop click from bubbling up
                      handleSelect(item);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between"
                  >
                    <span>{item.complete_name}</span>
                    {value == item.id && (
                      <Check size={15} className="text-blue-500" />
                    )}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No records found
              </li>
            )}

            {/* Search More */}
            <li className="border-t">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  setOpenModal(true);
                }}
                className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-gray-50"
              >
                Search More...
              </button>
            </li>
          </ul>
        )}
      </div>

      {/* Modal Selection */}
      <DepartmentSearchModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        departments={options}
        onSelect={(dept) => {
          handleSelect(dept);
          setOpenModal(false);
        }}
      />
    </>
  );
}
