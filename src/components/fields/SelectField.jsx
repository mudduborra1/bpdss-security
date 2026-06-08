import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import DepartmentSearchModal from "./DepartmentSearchModal";
import JobSearchModal from "./JobSearchModal";
import ManagerSearchModal from "./ManagerSearchModal";

export default function SelectField({ label, name, value, options = [], onChange,className = ""}) {
  const [open, setOpen] = useState(false);
  const [openDeptModal, setOpenDeptModal] = useState(false);
  const [openJobModal, setOpenJobModal] = useState(false);
  const [openManagerModal, setOpenManagerModal] = useState(false);
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

  // ✅ Extract the primitive ID from either a flat number or an Odoo relational array [id, "name"]
  const currentId = Array.isArray(value) ? value[0] : value;

  // ✅ Match options against the unwrapped primitive ID
  const selectedOption = options.find((item) => Number(item.id) === Number(currentId));

  // Select option handler
  const handleSelect = (item) => {
    if (onChange && item) {
      onChange({
        target: { 
          name, 
          value: item.id // Passes down the clean integer ID
        },
      });
    }
    setOpen(false);
  };

  // Routes to the correct modal view depending on field category layout rules
  const handleOpenSearchModal = () => {
    setOpen(false);
    if (label === "Department") {
      setOpenDeptModal(true);
    } else if (label === "Job Position") {
      setOpenJobModal(true);
    } else if (label === "Manager") {
      setOpenManagerModal(true);
    } else {
      setOpenDeptModal(true);
    }
  };

  // Helper to resolve Odoo images (handles base64 data payloads alongside relative storage paths)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.startsWith("data:image") ? imagePath : `http://localhost:8069${imagePath}`;
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
          className={`relative hover:border-gray-400 focus-within:border-blue-500 transition-colors cursor-pointer flex items-center justify-between py-2 
            border-b ${className}`}
        >
        {/* <div
          onClick={() => setOpen(!open)}
          className = "relative border-b border-gray-300 hover:border-gray-400 focus-within:border-blue-500 transition-colors cursor-pointer flex items-center justify-between py-2"
          ${className}
        > */}
          {/* Visual Display Selection */}
          <div className="flex items-center gap-2">
            {label === "Manager" && selectedOption?.image && (
              <img
                src={getImageUrl(selectedOption.image)}
                alt={selectedOption.name || "Manager"}
                className="w-5 h-5 rounded-full object-cover"
                onError={(e) => { 
                  // ✅ FIXED: Correct avatar string interpolation format path
                  e.target.src = `https://ui-avatars.com{encodeURIComponent(selectedOption.name || "Manager")}`; 
                }}
              />
            )}
            <span className={`text-sm ${selectedOption ? "text-gray-700" : "text-gray-400"}`}>
              {selectedOption?.complete_name || selectedOption?.name || `Select ${label?.toLowerCase() || "an option"}...`}
            </span>
          </div>

          {/* Hidden input to hold value for standard form submissions */}
          <input type="hidden" name={name} value={currentId || ""} />

          {/* Dropdown Icon */}
          <button type="button" className="text-gray-500 pointer-events-none">
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Dropdown Wrapper Panel */}
        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg flex flex-col overflow-hidden">
            
            {/* Scrollable Records Container List */}
            <ul className="max-h-60 overflow-y-auto w-full divide-y divide-gray-50">
              {options.length > 0 ? (
                options.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(item);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2">
                        {label === "Manager" && item.image && (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-5 h-5 rounded-full object-cover"
                            onError={(e) => { 
                              // ✅ FIXED: Correct placeholder fallback path syntax parameters
                              e.target.src = `https://ui-avatars.com{encodeURIComponent(item.name || "User")}`; 
                            }}
                          />
                        )}
                        <span className="group-hover:text-gray-900 transition-colors">
                          {item.complete_name ? item.complete_name : item.name}
                        </span>
                      </span>
                      {Number(currentId) === Number(item.id) && (
                        <Check size={15} className="text-blue-500 shrink-0" />
                      )}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-3 py-3 text-sm text-gray-400 text-center italic">
                  No records found
                </li>
              )}
            </ul>

            {/* ✅ FIXED: "Search More" locked into a clean sticky bottom action bar layer */}
            <div className="border-t bg-gray-50 p-1 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenSearchModal();
                }}
                className="w-full text-center px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded transition-colors flex items-center justify-center gap-1"
              >
                Search More...
              </button>
            </div>

          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL INJECTIONS                                        */}
      {/* ======================================================== */}
      {openDeptModal && (
        <DepartmentSearchModal
          open={openDeptModal}
          onClose={() => setOpenDeptModal(false)}
          departments={options}
          onSelect={(dept) => {
            handleSelect(dept);
            setOpenDeptModal(false);
          }}
        />
      )}

      {openJobModal && (
        <JobSearchModal
          open={openJobModal}
          onClose={() => setOpenJobModal(false)}
          jobs={options}
          onSelect={(job) => {
            handleSelect(job);
            setOpenJobModal(false);
          }}
        />
      )}

      {openManagerModal && (
        <ManagerSearchModal
          open={openManagerModal}
          onClose={() => setOpenManagerModal(false)}
          managers={options}
          onSelect={(manager) => {
            handleSelect(manager);
            setOpenManagerModal(false);
          }}
        />
      )}
    </>
  );
}
