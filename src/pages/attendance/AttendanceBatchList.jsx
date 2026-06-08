import React, { useEffect, useState } from "react";
import { Search, Filter, Group, X, ChevronDown, ChevronRight } from "lucide-react";
import { fetchAttendanceBatchesList } from "../../api/axiosClient";
import Layout from "../../components/layout/Layout";

export default function AttendanceBatchList() {
  const [attendanceLines, setAttendanceLines] = useState([]);
  const [search, setSearch] = useState("");
  
  // Odoo-Style: Using arrays to allow compound multi-selection conditions
  const [activeFilters, setActiveFilters] = useState([]); // e.g., ['present', 'absent']
  const [activeGroups, setActiveGroups] = useState(["year", "month"]); // Default additive pipeline
  
  // Popover controls
  const [showFilter, setShowFilter] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  
  // Tracks state visibility of tree segments locally
  const [collapsedGroups, setCollapsedGroups] = useState({});

 

  useEffect(() => {
    loadBatchLines();
  }, []);

  const loadBatchLines = async () => {
    try {
      const response = await fetchAttendanceBatchesList();
      const allLines = (response.data || []).flatMap(
        (batch) => batch.lines ? batch.lines : batch || []
      );
      // console.log(allLines)
      setAttendanceLines(allLines);
    } catch (error) {
      console.error("API error loading records:", error);
    }
  };

  // Toggle dynamic compound filters
  const toggleFilter = (filterKey) => {
    setActiveFilters(prev => 
      prev.includes(filterKey) ? prev.filter(f => f !== filterKey) : [...prev, filterKey]
    );
  };

  // Toggle structural pipeline grouping sequences
  const toggleGroupBy = (groupKey) => {
    setActiveGroups(prev => 
      prev.includes(groupKey) ? prev.filter(g => g !== groupKey) : [...prev, groupKey]
    );
  };

  const toggleCollapse = (groupPath) => {
    setCollapsedGroups(prev => ({ ...prev, [groupPath]: !prev[groupPath] }));
  };

  // ==========================================
  // COMPREHENSIVE FILTER ENGINE
  // ==========================================
  const filteredData = attendanceLines.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch = !search || 
      item.employee_name?.toLowerCase().includes(q) || 
      item.department_name?.toLowerCase().includes(q) || 
      item.manager?.toLowerCase().includes(q) || 
      item.method?.toLowerCase().includes(q) || 
      item.status?.toLowerCase().includes(q);

    // If no filters are active, allow all. If active, item status must match one active flag
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(item.status?.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // ==========================================
  // RECURSIVE ODOO MULTI-GROUP GENERATOR ENGINE
  // ==========================================

//   function buildOdooTreeStructure(records, groups) {
//   if (groups.length === 0) {
//     return { isLeaf: true, records: records };
//   }

//   const [currentGroup, ...restGroups] = groups;
//   const grouped = {};

//   data.forEach(item => {
//     const key = item[currentGroup];
//     if (!grouped[key]) grouped[key] = [];
//     grouped[key].push(item);
//   });

//   return {
//     isLeaf: false,
//     groupType: currentGroup,
//     children: Object.fromEntries(
//       Object.entries(grouped).map(([key, records]) => [
//         key,
//         buildOdooTreeStructure(records, restGroups)
//       ])
//     ),
//     count: data.length
//   };
// }


  const buildOdooTreeStructure = (records, groupKeys, currentLevel = 0, parentPath = "") => {
    // Base Case: If no groups left or empty dataset, render the raw row data
    if (currentLevel >= groupKeys.length || records.length === 0) {
      return { isLeaf: true, records };
    }

    const currentKey = groupKeys[currentLevel];
    const grouped = {};

    records.forEach((item) => {
      let groupValue = "N/A";
      
      // Dynamic grouping field definitions mapper
      if (currentKey === "employee") groupValue = item.employee_name || "Unknown Staff";
      else if (currentKey === "department") groupValue = item.department_name || "No Department";
      else if (currentKey === "manager") groupValue = item.manager || "No Manager";
      else if (currentKey === "method") groupValue = item.method || "No Method Specified";
      else if (currentKey === "status") groupValue = item.status || "Unknown Status";
     


     else if (currentKey === "year" || currentKey === "month" || currentKey === "date") {
  const dateObj = item.attendance_date ? new Date(item.attendance_date) : null;
  if (dateObj && !isNaN(dateObj)) {
    if (currentKey === "year") {
      // ✅ Show only year
      groupValue = `${dateObj.getFullYear()}`;
    } 
    
    else if (currentKey === "month") {
      // ✅ Show month + year
      const monthName = dateObj.toLocaleString("default", { month: "long" });
      const year = dateObj.getFullYear();
      groupValue = `${monthName} ${year}`;
    } 
    else if (currentKey === "date") {
      // ✅ Format as DD-MM-YYYY
      const day   = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year  = dateObj.getFullYear();
      groupValue  = `${day}-${month}-${year}`;
    }
  } else {
    groupValue = "No Date Specified";
  }
}


      if (!grouped[groupValue]) {
        grouped[groupValue] = [];
      }
      grouped[groupValue].push(item);
    });

    // Recursively step deeper down the tree hierarchy
    const childrenTree = {};
    Object.keys(grouped).forEach((bucketName) => {
      const uniquePath = parentPath ? `${parentPath} > ${bucketName}` : bucketName;
      childrenTree[bucketName] = buildOdooTreeStructure(
        grouped[bucketName], 
        groupKeys, 
        currentLevel + 1, 
        uniquePath
      );
    });

    return { isLeaf: false, groupType: currentKey, children: childrenTree, count: records.length };
  };

  const odooTreeData = buildOdooTreeStructure(filteredData, activeGroups);

  // ==========================================
  // RECURSIVE JSX RENDER TREE ENGINE
  // ==========================================
  // const renderOdooTreeBranch = (node, branchName = "", depth = 0, currentPath = "") => {
  //   const nodePath = currentPath ? `${currentPath} > ${branchName}` : branchName;
  //   const isCollapsed = collapsedGroups[nodePath];

  //   if (node.isLeaf) {
  //     // Leaf State: Return data rows directly
  //     return (
  //       <div className="overflow-x-auto border-x border-b border-gray-200" style={{ marginLeft: `${depth * 8}px` }}>
  //         <table className="w-full text-left text-xs bg-white">
  //           <thead className="bg-gray-50 border-b text-gray-500 font-semibold uppercase tracking-wider">
  //             <tr>
  //               <th className="py-2 px-4">Employee</th>
  //               <th className="py-2 px-4">Department</th>
  //               <th className="py-2 px-4">Manager</th>
  //               <th className="py-2 px-4">Method</th>
  //               <th className="py-2 px-4">Check In</th>
  //               <th className="py-2 px-4">Check Out</th>
  //               <th className="py-2 px-4">Status</th>
  //             </tr>
  //           </thead>
  //           <tbody className="divide-y divide-gray-100 text-gray-700">
  //             {node.records.map((record) => (
  //               <tr key={record.id} className="hover:bg-gray-50 transition-colors">
  //                 <td className="py-2 px-4 font-medium text-gray-900">{record.employee_name}</td>
  //                 <td className="py-2 px-4">{record.department_name}</td>
  //                 <td className="py-2 px-4">{record.manager}</td>
  //                 <td className="py-2 px-4">{record.method}</td>
  //                 <td className="py-2 px-4 font-mono">{record.check_in || "--:--"}</td>
  //                 <td className="py-2 px-4 font-mono">{record.check_out || "--:--"}</td>
  //                 <td className="py-2 px-4">
  //                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
  //                     record.status?.toLowerCase() === "present" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
  //                   }`}>
  //                     {record.status}
  //                   </span>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     );
  //   }

  //   // Branch State: Render Collapsible Summary Rows with Odoo's styling
  //   return (
  //     <div key={nodePath} className="w-full">
  //       {branchName && (
  //         <div 
  //           onClick={() => toggleCollapse(nodePath)}
  //           style={{ paddingLeft: `${depth * 12}px` }}
  //           className="flex items-center justify-between py-2 pr-4 border-b border-gray-200 bg-gray-50/80 hover:bg-gray-100/90 cursor-pointer select-none text-sm font-medium transition-colors"
  //         >
  //           <div className="flex items-center gap-2 text-gray-800">
  //             {isCollapsed ? <ChevronRight size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
  //             <span className="capitalize text-[11px] font-bold tracking-wider text-[#714B67] bg-[#F3EFF2] px-1.5 py-0.5 rounded uppercase">
  //               {node.groupType}:
  //             </span>
  //             <span className="font-semibold text-gray-900">{branchName}</span>
  //             <span className="text-xs text-gray-400 font-normal">({node.count})</span>
  //           </div>
  //         </div>
  //       )}

  //       {/* Render child elements if they are not explicitly collapsed */}
  //       {!isCollapsed && (
  //         <div className="w-full">
  //           {Object.keys(node.children || {}).map((childKey) =>
  //             renderOdooTreeBranch(node.children[childKey], childKey, depth + 1, nodePath)
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

// ==========================================
// SUMMARY COUNTS
// ==========================================
// Utility to compute counts

  // const getStatusCounts = (records) => ({
  //   present: records.filter(r => r.status?.toLowerCase() === "present").length,
  //   absent: records.filter(r => r.status?.toLowerCase() === "absent").length,
  //   leave: records.filter(r => r.status?.toLowerCase().includes("leave")).length,
  //   employees: new Set(records.map(r => r.id)).size,
  //   total: records.length
  // });

  const getStatusCounts = (node) => {
  if (node.isLeaf) {
    // Leaf → count directly from records
    return {
      present: node.records.filter(r => r.status?.toLowerCase() === "present").length,
      absent: node.records.filter(r => r.status?.toLowerCase() === "absent").length,
      leave: node.records.filter(r => r.status?.toLowerCase().includes("leave")).length,
      employees: new Set(node.records.map(r => r.id)).size,
      total: node.records.length
    };
  }

  const childCounts = Object.values(node.children || {}).map(getStatusCounts);

  return childCounts.reduce(
    (acc, c) => ({
      present: acc.present + c.present,
      absent: acc.absent + c.absent,
      leave: acc.leave + c.leave,
      employees: acc.employees + c.employees,
      total: acc.total + c.total
    }),
    { present: 0, absent: 0, leave: 0, employees: 0, total: 0 }
  );
};

  // ✅ Recursive renderer defined here
  const renderOdooTreeBranch = (node, branchName = "", depth = 0, currentPath = "") => {
    const nodePath = currentPath ? `${currentPath} > ${branchName}` : branchName;
    const isCollapsed = collapsedGroups[nodePath];

    if (node.isLeaf) {
      // Leaf: render table rows
      return (
        <div
          className="overflow-x-auto border-x border-b border-gray-200"
          style={{ marginLeft: `${depth * 8}px` }}
        >
          <table className="w-full text-left text-xs bg-white">
            <thead className="bg-gray-50 border-b text-gray-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-2 px-4">Employee</th>
                <th className="py-2 px-4">Department</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Manager</th>
                <th className="py-2 px-4">Method</th>
                <th className="py-2 px-4">Check In</th>
                <th className="py-2 px-4">Check Out</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {node.records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 font-medium text-gray-900">{record.employee_name}</td>
                  <td className="py-2 px-4">{record.department_name}</td>
                  <td className="py-2 px-4">{record.attendance_date}</td>
                  <td className="py-2 px-4">{record.manager}</td>
                  <td className="py-2 px-4">{record.method}</td>
                  <td className="py-2 px-4 font-mono">{record.check_in || "--:--"}</td>
                  <td className="py-2 px-4 font-mono">{record.check_out || "--:--"}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        record.status?.toLowerCase() === "present"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Branch: render collapsible header with counts
    // const branchCounts = getStatusCounts(
    //   Object.values(node.children).flatMap(child =>
    //     child.isLeaf ? child.records : []
    //   )
    // );

    const branchCounts = getStatusCounts(node);

    return (
      <div key={nodePath} className="w-full">
        {branchName && (
          <div
            onClick={() => toggleCollapse(nodePath)}
            style={{ paddingLeft: `${depth * 12}px` }}
            className="flex items-center justify-between py-2 pr-4 border-b border-gray-200 bg-gray-50/80 hover:bg-gray-100/90 cursor-pointer select-none text-sm font-medium transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-800">
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
              <span className="capitalize text-[11px] font-bold tracking-wider text-[#714B67] bg-[#F3EFF2] px-1.5 py-0.5 rounded uppercase">
                {node.groupType}:
              </span>
              <span className="font-semibold text-gray-900">{branchName}</span>
              <span className="text-xs text-gray-400 font-normal">({node.count})</span>
            </div>

            {/* Inline summary counts */}
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-0.5 bg-gray-100 rounded">
                    List: {branchCounts.employees > 0 ? branchCounts.employees : branchCounts.total}
              </span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">P: {branchCounts.present}</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">A: {branchCounts.absent}</span>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">L: {branchCounts.leave}</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                     Tot: {branchCounts.total}
              </span>
            </div>
          </div>
        )}

        {!isCollapsed && (
          <div className="w-full">
            {Object.keys(node.children || {}).map((childKey) =>
              renderOdooTreeBranch(node.children[childKey], childKey, depth + 1, nodePath)
            )}
          </div>
        )}
      </div>
    );
  };

  
useEffect(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest(".popover")) {
      setShowFilter(false);
      setShowGroup(false);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);


return (
  <Layout>
  {/* //  ==========================================
  //   ODOO CONTROL BAR SECTION AREA
  //   ==========================================  */}
<div className="flex flex-col md:flex-row items-center gap-2 mb-6 bg-gray-50 p-2 rounded-lg border border-gray-200">

  {/* Search Input */}
  <div className="relative flex-1 w-full bg-white border border-gray-300 rounded p-1 flex items-center min-h-[38px] shadow-inner">
    <Search size={15} className="text-gray-400 ml-2" />
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 px-2 py-1 text-sm outline-none"
    />
  </div>

  {/* Filter Button + Popover */}

    <div className="relative">
<button
  onClick={(e) => {
    e.stopPropagation(); // prevent bubbling
    setShowFilter((prev) => !prev);
    setShowGroup(false); // optional: close group when filter opens
  }}
  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50"
>
  <Filter size={14} /> Filters
</button>



    {/* <button
      onClick={() => setShowFilter(!showFilter)}
      className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50"
    >
      <Filter size={14} /> Filters
    </button> */}

  


    {showFilter && (
       <div className="absolute mt-2 bg-white border border-gray-200 rounded shadow-lg p-3 z-10 popover">
        {["present", "absent", "late", "on leave"].map((filterKey) => (
          <label key={filterKey} className="flex items-center gap-2 text-sm py-1">
            <input
              type="checkbox"
              checked={activeFilters.includes(filterKey)}
              onChange={() => toggleFilter(filterKey)}
            />
            <span className="capitalize">{filterKey}</span>
          </label>
        ))}
        <button
          onClick={() => setActiveFilters([])}
          className="mt-2 text-xs text-red-500 hover:underline"
        >
          Clear Filters
        </button>
      </div>
    )}
  </div>

  {/* Group Button + Popover */}
  <div className="relative">

<button
  onClick={(e) => {
    e.stopPropagation();
    setShowGroup((prev) => !prev);
    setShowFilter(false); // optional: close filter when group opens
  }}
  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50"
>
  <Group size={14} /> Group By
</button>



    {/* <button
      onClick={() => setShowGroup(!showGroup)}
      className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50"
    >
      <Group size={14} /> Group By
    </button> */}

    {showGroup && (
      <div className="absolute mt-2 bg-white border border-gray-200 rounded shadow-lg p-3 z-10 popover">
        {["employee", "department", "manager", "method", "status", "month", "year", "date"].map((groupKey) => (
          <label key={groupKey} className="flex items-center gap-2 text-sm py-1">
            <input
              type="checkbox"
              checked={activeGroups.includes(groupKey)}
              onChange={() => toggleGroupBy(groupKey)}
            />
            <span className="capitalize">{groupKey}</span>
          </label>
        ))}
        <button
          onClick={() => setActiveGroups([])}
          className="mt-2 text-xs text-red-500 hover:underline"
        >
          Clear Grouping
        </button>
      </div>
    )}
  </div>

  
</div>

{/* ==========================================
          TREE RENDERING AREA
          ========================================== */}
      <div className="relative">
        {renderOdooTreeBranch(odooTreeData)}
      </div>

</Layout>

);
};