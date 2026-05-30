export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1 w-full">

      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="
            text-sm
            text-gray-600
            font-medium
          "
        >
          {label}
        </label>
      )}

      {/* Input */}
      <input
        id={name}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`
          w-full
          h-10
          px-0
          border-0
          border-b
          border-gray-300
          bg-transparent
          text-sm
          outline-none
          focus:ring-0
          focus:border-[#714B67]
          placeholder:text-gray-400
          transition-colors
          ${className}
        `}
      />

    </div>
  );
}