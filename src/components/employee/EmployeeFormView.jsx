import { useState } from "react";

import InputField from "../fields/InputField";
import TextAreaField from "../fields/TextAreaField";
import EmployeeImageUpload from "../fields/EmployeeImageUpload";
import FormSheet from "../form/FormSheet";
import FormHeader from "../form/FormHeader";
import SelectField from "../fields/SelectField";

export default function EmployeeFormView({
  mode,
  formData,
  imagePreview,
  handleChange,
  handleFileChange,
  handleSave,
  handleDiscard,

  onNext,
  onPrevious,

  disableNext,
  disablePrevious,

  currentIndex,
  total,

  departments,
  loading,

  isEditing = false,
}) {

  const [activeTab, setActiveTab] = useState("work");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave(e);
  };

//   const [formData, setFormData] = useState({
//   department_id: "",
// });

// const handleChange = (e) => {
//   setFormData((prev) => ({
//     ...prev,
//     [e.target.name]: e.target.value,
//   }));
// };

  return (
    <div className="min-h-screen bg-[#f6f7f9]">

      {/* HEADER */}
      <FormHeader
        title={
          isEditing
            ? "Edit Employee"
            : "Create Employee"
        }
        mode={
          isEditing
            ? "update"
            : "create"
        }
        onSave={handleSave}
        onDiscard={handleDiscard}
        onNext={onNext}
        onPrevious={onPrevious}
        disableNext={disableNext}
        disablePrevious={disablePrevious}
        currentIndex={currentIndex}
        total={total}
      />

      <form onSubmit={onSubmit}>
        <div className="max-w-7xl mx-auto p-6">

          <FormSheet>

            <div className="flex flex-col lg:flex-row gap-10">

              {/* IMAGE */}
              <div className="flex flex-col items-center">
                <EmployeeImageUpload
                    preview={
                      formData.image
                        ? `http://localhost:8069${formData.image}`
                        : ""
                    }
                    onChange={handleFileChange}
                  />
              </div>

              {/* FIELDS */}
              <div className="flex-1">

                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Employee Name"
                  className="
                    w-full
                    text-3xl
                    font-semibold
                    border-b
                    border-gray-300
                    pb-3
                    mb-8
                    outline-none
                    bg-transparent
                    focus:border-[#714B67]
                  "
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">

                  <InputField
                    label="Job Position"
                    name="job_title"
                    value={formData.job_title || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Work Email"
                    name="work_email"
                    value={formData.work_email || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Work Phone"
                    name="mobile_phone"
                    value={formData.work_phone || ""}
                    onChange={handleChange}
                  />

                  {/* Department Select */}
                  {/* <SelectField
                    label="Department"
                    name="department"
                    value={formData['department_id'] || ""}
                    onChange={handleChange}
                    options={departments}
                  /> */}

                  <SelectField 
                      label="Department" 
                      name="department_id" 
                      // Safely grab the first element if the array exists, otherwise fallback to empty string
                      value={Array.isArray(formData.department_id) ? formData.department_id[0] : (formData.department_id || "")} 
                      options={departments} 
                      onChange={handleChange} 
                    />

                  

                  <SelectField
                    label="Manager"
                    name="manager"
                    value={formData.manager || ""}
                    onChange={handleChange}
                  />

                  <SelectField
                    label="Company"
                    name="company"
                    value={formData.company || ""}
                    onChange={handleChange}
                  />

                  <SelectField
                    label="Work Location"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                  />

                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="mt-10 border-t pt-6">

              <div className="flex gap-8 border-b mb-8 overflow-x-auto">

                {[
                  ["work", "Work Information"],
                  ["private", "Private Information"],
                  ["hr", "HR Settings"],
                  ["notes", "Notes"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`pb-3 text-sm font-medium whitespace-nowrap transition ${
                      activeTab === key
                        ? "border-b-2 border-[#714B67] text-[#714B67]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}

              </div>

              {/* WORK TAB */}
              {activeTab === "work" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">

                  <InputField
                    label="Department"
                    name="department"
                    value={departments.complete_name || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Manager"
                    name="manager"
                    value={formData.manager || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Company"
                    name="company"
                    value={formData.company || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Work Location"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                  />

                </div>
              )}

              {/* PRIVATE TAB */}
              {activeTab === "private" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">

                  <InputField
                    label="Private Email"
                    name="private_email"
                    value={formData.private_email || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Private Phone"
                    name="private_phone"
                    value={formData.private_phone || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Home Address"
                    name="home_address"
                    value={formData.home_address || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Emergency Contact"
                    name="emergency_contact"
                    value={formData.emergency_contact || ""}
                    onChange={handleChange}
                  />

                </div>
              )}

              {/* HR TAB */}
              {activeTab === "hr" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">

                  <InputField
                    label="Badge ID"
                    name="badge_id"
                    value={formData.badge_id || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="PIN Code"
                    name="pin_code"
                    value={formData.pin_code || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Attendance Mode"
                    name="attendance_mode"
                    value={formData.attendance_mode || ""}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Kiosk PIN"
                    name="kiosk_pin"
                    value={formData.kiosk_pin || ""}
                    onChange={handleChange}
                  />

                </div>
              )}

              {/* NOTES TAB */}
              {activeTab === "notes" && (
                <TextAreaField
                  label="Notes"
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleChange}
                />
              )}

            </div>

          </FormSheet>
        </div>
      </form>
    </div>
  );
}