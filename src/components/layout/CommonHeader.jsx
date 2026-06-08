import { Save, X, Plus, MoreHorizontal, Settings, Zap, ChevronLeft, ChevronRight, LayoutGrid, List, Search } from "lucide-react"; 
import { Link, useNavigate } from "react-router-dom"; 

export default function CommonHeader({ 
  mode, 
  view = "kanban", 
  onViewChange, 
  onCreate, 
  onSave, 
  onDiscard, 
  prevId, 
  nextId, 
  disablePrevious, 
  disableNext, 
  currentIndex, 
  total = 0, 
  onSearch, 
}) { 
  const navigate = useNavigate(); 

  // Unified conditional boolean flags extracted directly from props
  const isList = view === "list"; 
  const isKanban = view === "kanban"; 
  const isDetails = mode === "details"; 
  const isCreate = mode === "create"; 
  const isUpdate = mode === "update"; 
  const isDept = mode === "departments"; 

  const title = { 
    update: "Edit Employee", 
    create: "Create Employee", 
    details: "Employees", 
    list: "Employees", 
    kanban: "Employees", 
    departments: "Departments", 
  }[mode] || "Employees"; 

   

  return ( 
    <div className="sticky top-0 z-30 bg-white border-b shadow-xs"> 
      <div className="px-4 py-3"> 
        <div className="flex justify-between items-center"> 
          
          {/* --- LEFT SECTION: ACTIONS & BREADCRUMB --- */} 
          <div className="flex items-center gap-2 flex-wrap"> 
            {/* Show Odoo-style compound 'New' action dropdown button inside view pages */} 
            {/* ✅ FIXED: Added explicit grouping parentheses to fix JavaScript conditional evaluation precedence */}
            {(isDetails || isDept ) && ( 
              <div className="flex items-center"> 
                <button 
                  type="button" 
                  onClick={onCreate || (() => navigate(isDept ? "/departments/new" : "/employees/new"))} 
                  className="h-9 px-4 rounded-l-md bg-[#714B67] hover:bg-[#5d3d56] text-white text-sm font-medium transition" 
                > 
                  <div className="flex items-center gap-2"> 
                    <Plus size={15} /> New </div> 
                </button> 
                <button 
                  type="button" 
                  className="h-9 px-2 rounded-r-md border-l border-white/20 bg-[#714B67] hover:bg-[#5d3d56] text-white transition" 
                > 
                  <MoreHorizontal size={15} /> 
                </button> 
              </div> 
            )} 

            {/* Dynamic Title */} 
            <h1 className="text-2xl font-semibold text-gray-800 ml-2"> 
              {title} 
            </h1> 

            {/* Editing Utility Icons */} 
            {isUpdate && ( 
              <div className="flex items-center gap-1 ml-3"> 
                <button type="button" className="h-9 w-9 rounded-md border bg-white hover:bg-gray-50 flex items-center justify-center transition"> 
                  <Settings size={16} /> 
                </button> 
                <button type="button" className="h-9 w-9 rounded-md border bg-white hover:bg-gray-50 flex items-center justify-center transition"> 
                  <Zap size={16} /> 
                </button> 
              </div> 
            )} 
          </div> 

          {/* --- CENTER SECTION: EDITING ACTION OVERRIDES --- */} 
          {(isCreate || isUpdate) && ( 
            <div className="flex items-center gap-2"> 
              <button 
                type="button" 
                onClick={onSave} 
                className="h-9 px-4 flex items-center gap-1.5 rounded-md bg-[#714B67] hover:bg-[#5d3d56] text-white text-xs font-semibold transition" 
              > 
                <Save size={15} /> Save 
              </button> 
              <button 
                type="button" 
                onClick={onDiscard} 
                className="h-9 px-4 flex items-center gap-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition" 
              > 
                <X size={15} /> Discard 
              </button> 
            </div> 
          )} 

          {/* --- RIGHT SECTION: VIEW CONTROL & PAGINATION --- */} 
          <div className="flex items-center gap-2"> 
            {/* View Switcher Layout Controls */} 
            {/* ✅ FIXED: Wrapped parameters inside safety precedence container bounds */}
            {(isDetails || isDept) && ( 
              <div className="flex border rounded-md overflow-hidden bg-white"> 
                <button 
                  onClick={() => onViewChange?.("kanban")} 
                  className={`px-3 py-2 transition-colors ${ isKanban ? "bg-[#714B67] text-white" : "hover:bg-gray-50 text-gray-600" }`} 
                > 
                  <LayoutGrid size={16} /> 
                </button> 
                <button 
                  onClick={() => onViewChange?.("list")} 
                  className={`px-3 py-2 transition-colors ${ isList ? "bg-[#714B67] text-white" : "hover:bg-gray-50 text-gray-600" }`} 
                > 
                  <List size={16} /> 
                </button> 
              </div> 
            )} 

           {isUpdate && (
  <div className="flex items-center gap-2">
    {/* Counter */}
    <div className="px-4 h-9 flex items-center justify-center rounded-md border bg-white text-sm font-semibold text-gray-700 shadow-sm">
      {currentIndex >= 0 ? currentIndex + 1 : 0} / {total || 0}
    </div>

    {/* Prev button */}
    <Link
      to={prevId ? `/employees/${prevId}` : "#"}
      className={`h-9 w-9 flex items-center justify-center rounded-md border bg-white text-gray-600 shadow-sm transition hover:bg-gray-100 hover:text-gray-800 ${
        disablePrevious ? "pointer-events-none opacity-40" : ""
      }`}
    >
      <ChevronLeft size={18} />
    </Link>

    {/* Next button */}
    <Link
      to={nextId ? `/employees/${nextId}` : "#"}
      className={`h-9 w-9 flex items-center justify-center rounded-md border bg-white text-gray-600 shadow-sm transition hover:bg-gray-100 hover:text-gray-800 ${
        disableNext ? "pointer-events-none opacity-40" : ""
      }`}
    >
      <ChevronRight size={18} />
    </Link>
  </div>
)}

          </div> 

        </div> 
      </div> 
    </div> 
  ); 
}
