export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 6,
}) {

  return (
    <div className="flex flex-col gap-2">

      {label && (
        <label
          htmlFor={name}
          className="
            text-sm
            font-medium
            text-gray-700
          "
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          p-4
          text-sm
          outline-none
          transition
          resize-none
          focus:border-[#714B67]
          focus:ring-2
          focus:ring-[#714B67]/20
        "
      />

    </div>
  );
}