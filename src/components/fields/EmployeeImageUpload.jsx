import { useEffect, useRef, useState } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function EmployeeImageUpload({
  preview,
  onChange,
}){

  const fileInputRef = useRef(null);

  const placeholder =
    "";

  

const [imagePreview, setImagePreview] = useState(preview || "");

useEffect(() => {
  setImagePreview(preview || "");
}, [preview]);

useEffect(() => {
  console.log(fileInputRef.current);
}, []);

const handleImageClick = () => {
  console.log("Pencil clicked");
  fileInputRef.current?.click();
};

const handleFileChange = (e) => {

  const file =
    e.target.files?.[0];

  if (file) {

    const imageUrl =
      URL.createObjectURL(file);

    setImagePreview(imageUrl);

    onChange?.(e);
  }
};
  // Delete Image
 const handleDeleteImage = () => {

  setImagePreview("");

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  onChange?.({
    target: {
      files: [],
      value: "",
    },
  });
};

  return (
    <div className="relative inline-block group">

      {/* Hover Actions */}
      <div
        className="
          absolute bottom-0 left-0
          w-full flex justify-between
          opacity-0
          group-hover:opacity-100
          transition-opacity
          z-10
        "
      >

        {/* Edit */}
        <button
          type="button"
          onClick={handleImageClick}
          className="
            m-1 p-2 rounded-full
            bg-white shadow
            hover:bg-gray-100
          "
        >
          <Pencil size={16} />
        </button>

        {/* Delete */}
        {imagePreview && (
        <button
          type="button"
          onClick={handleDeleteImage}
        >
          <Trash2 size={16} />
        </button>
      )}

      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />


     <img
  src={
    imagePreview || "http://localhost:8069/web/image/hr.employee/23/avatar_128"    
  }
  alt="Employee"
  className="
    w-40 h-40
    object-cover
    rounded-lg border
    bg-gray-100
  "
/>

  
    </div>
  );
}