import { useState } from "react";
import InputField from "../fields/InputField";
import TextAreaField from "../fields/TextAreaField";
import EmployeeImageUpload from "../fields/EmployeeImageUpload";
import FormSheet from "../form/FormSheet";
import SelectField from "../fields/SelectField";

export default function EmployeeFormView({
  formData,
  imagePreview,
  handleChange,
  handleFileChange,
  departments,
  jobs,
  managers,
  companies,
  errors,
  handleSave, // ✅ ensure this is passed in
}) {
  const [activeTab, setActiveTab] = useState("work");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave?.(e); // ✅ safe call
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <form onSubmit={onSubmit}>
        <div className="max-w-7xl mx-auto p-6">
          <FormSheet>
            <div className="flex flex-col lg:flex-row gap-10">
              {/* IMAGE */}
              <div className="flex flex-col items-center">
                <EmployeeImageUpload
                  preview={
                    imagePreview ||
                    (formData.image_1920
                      ? formData.image_1920.startsWith("data:image")
                        ? formData.image_1920
                        : `http://localhost:8069${formData.image_1920}`
                      : "")
                  }
                  onChange={handleFileChange}
                />
              </div>

              {/* FORM FIELDS */}
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Employee Name"
                  className={`w-full text-3xl font-semibold border-b pb-3 mb-8 outline-none bg-transparent 
                    ${errors.name ? "border-red-500" : "border-gray-300"} focus:border-[#714B67]`}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                  <InputField
                    label="Work Email"
                    name="work_email"
                    value={formData.work_email || ""}
                    onChange={handleChange}
                    className={`${errors.work_email ? "border-red-500" : "border-gray-300"} focus:border-[#714B67]`}
                  />

                  <InputField
                    label="Work Phone"
                    name="work_phone"
                    value={formData.work_phone || ""}
                    onChange={handleChange}
                    className={`${errors.work_phone ? "border-red-500" : "border-gray-300"} focus:border-[#714B67]`}
                  />

                  <SelectField
                    label="Department"
                    name="department_id"
                    value={formData.department_id}
                    options={departments}
                    onChange={handleChange}
                  />

                  <SelectField
                    label="Manager"
                    name="parent_id"
                    value={formData.parent_id}
                    options={managers}
                    onChange={handleChange}
                  />

                  <SelectField
                    label="Job Position"
                    name="job_id"
                    value={formData.job_id}
                    options={jobs}
                    onChange={handleChange}
                  />

                  <SelectField
                    label="Company"
                    name="company_id"
                    value={formData.company_id}
                    options={companies}
                    onChange={handleChange}
                    className={`${errors.company_id ? "border-red-500" : "border-gray-300"} focus:border-[#714B67]`}
                  />

                  <InputField
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

              {activeTab === "work" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                  <InputField
                    label="Company"
                    name="company"
                    value={formData.company || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              )}

              {activeTab === "private" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                  <InputField label="Private Email" name="private_email" value={formData.private_email || ""} onChange={handleChange} />
                  <InputField label="Private Phone" name="private_phone" value={formData.private_phone || ""} onChange={handleChange} />
                  <InputField label="Home Address" name="home_address" value={formData.home_address || ""} onChange={handleChange} />
                  <InputField label="Emergency Contact" name="emergency_contact" value={formData.emergency_contact || ""} onChange={handleChange} />
                </div>
              )}

              {activeTab === "hr" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                  <InputField label="Badge ID" name="badge_id" value={formData.badge_id || ""} onChange={handleChange} />
                  <InputField label="PIN Code" name="pin_code" value={formData.pin_code || ""} onChange={handleChange} />
                  <InputField label="Attendance Mode" name="attendance_mode" value={formData.attendance_mode || ""} onChange={handleChange} />
                  <InputField label="Kiosk PIN" name="kiosk_pin" value={formData.kiosk_pin || ""} onChange={handleChange} />
                </div>
              )}

              {activeTab === "notes" && (
                <TextAreaField label="Notes" name="notes" value={formData.notes || ""} onChange={handleChange} />
              )}
            </div>
          </FormSheet>
        </div>
      </form>
    </div>
  );
}
