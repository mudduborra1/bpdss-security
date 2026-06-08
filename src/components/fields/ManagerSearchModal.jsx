import { useState, useMemo } from "react";
import { X, Search } from "lucide-react";
import {MAX_VISIBLE} from "../departments/DepartmentColors"

export default function ManagerSearchModal({ managers = [], onSelect, onClose }) {
  const [search, setSearch] = useState("");

  // ✅ FIXED: Compute search filtering over managers rather than mixing up naming schemas
  const filteredManagers = useMemo(() => {
    return managers.filter((manager) =>
      manager.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [managers, search]);

  // Helper to resolve Odoo images (handles base64 data payloads alongside relative storage paths)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://ui-avatars.com";
    return imagePath.startsWith("data:image") ? imagePath : `http://localhost:8069${imagePath}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Search: Managers</h2> {/* ✅ FIXED: Updated Label text */}
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search Managers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table Content Container */}
        {/* ✅ FIXED: Stripped nested return component block, added safe scroll wrappers */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3 font-semibold text-gray-700">Manager Name</th>
                  <th className="p-3 font-semibold text-gray-700">Job Position</th>
                  <th className="p-3 font-semibold text-gray-700">Email</th>
                  <th className="p-3 font-semibold text-gray-700">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredManagers.length > 0 ? (
                  filteredManagers.map((mgr) => (
                    <tr
                      key={mgr.id}
                      className="border-b last:border-none hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        // ✅ FIXED: Fire selection callback handler to update parent state without triggering page redirection
                        if (onSelect) onSelect(mgr); 
                      }}
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={getImageUrl(mgr.image || mgr.image_1920)}
                            alt={mgr.name}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com{encodeURIComponent(mgr.name || "Manager")}`;
                            }}
                          />
                          <span className="font-medium text-gray-900">{mgr.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">
                        {/* ✅ FIXED: Safe read checks mapping either nested Odoo strings or primitive fields */}
                        {Array.isArray(mgr.job_id) ? mgr.job_id[1] : mgr.job_title || mgr.job_id || "N/A"}
                      </td>
                      <td className="p-3 text-gray-600">{mgr.work_email || "N/A"}</td>
                      <td className="p-3 text-gray-600">{mgr.work_phone || mgr.mobile_phone || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-400 italic">
                      No managers found matching your search string.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer actions block */}
        <div className="flex justify-end gap-2 border-t px-4 py-3 bg-gray-50 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border text-gray-700 bg-white rounded-md hover:bg-gray-50 transition font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
