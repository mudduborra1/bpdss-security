import {
  Save,
  X,
  Plus,
  MoreHorizontal,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


export default function FormHeader({
  title = "Employees",
  mode = "details",
  onSave,
  onDiscard,
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
  currentIndex,
  total,
}) {
  const navigate = useNavigate();

  useEffect(() => {
  console.log(currentIndex, total);
}, [currentIndex, total]);

  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDetails = mode === "details";

  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 pt-2 pb-3">

        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-3">

          {/* LEFT */}
          <div className="flex items-center gap-2 flex-wrap">

            {isDetails && (
              <div className="flex items-center">

                <button
                  type="button"
                  onClick={() => navigate("/employees/new")}
                  className="h-9 px-4 rounded-l-md bg-[#714B67] hover:bg-[#5d3d56] text-white text-sm font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Plus size={15} />
                    New
                  </div>
                </button>

                <button
                  type="button"
                  className="h-9 px-2 rounded-r-md border-l border-white/20 bg-[#714B67] hover:bg-[#5d3d56] text-white"
                >
                  <MoreHorizontal size={15} />
                </button>

              </div>
            )}

            <h1 className="text-2xl font-semibold text-gray-800 ml-2">
              {title}
            </h1>

            <div className="flex items-center gap-1 ml-3">

              <button type="button" className="h-9 w-9 rounded-md border bg-white hover:bg-gray-50 flex items-center justify-center">
                <Settings size={16} />
              </button>

              <button type="button" className="h-9 w-9 rounded-md border bg-white hover:bg-gray-50 flex items-center justify-center">
                <Zap size={16} />
              </button>

            </div>

          </div>

          {/* CENTER */}
          {!isDetails && (
            <div className="flex items-center self-end me-auto">

              <button
                type="button"
                onClick={onSave}
                className="h-8 w-8 flex items-center justify-center rounded-md bg-white hover:bg-gray-100 text-gray-600"
              >
                <Save size={16} />
              </button>

              <button
                type="button"
                onClick={onDiscard}
                className="h-8 w-8 flex items-center justify-center rounded-md bg-white hover:bg-gray-100 text-gray-600"
              >
                <X size={16} />
              </button>

            </div>
          )}

          {/* RIGHT */}
          {isUpdate && (
            <div className="flex items-center gap-3 min-w-[220px]">

              {/* COUNT */}
              <div className="text-sm px-3 py-1.5 border rounded-md bg-white min-w-[80px] text-center">
                {currentIndex >= 0 ? currentIndex + 1 : 0} / {total || 0}
              </div>
              

              {/* PREVIOUS */}
              <button
                type="button"
                onClick={onPrevious}
                disabled={disablePrevious}
                className="h-9 w-9 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>

              {/* NEXT */}
              <button
                type="button"
                onClick={onNext}
                disabled={disableNext}
                className="h-9 w-9 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}