export default function DateField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">
        {label}
      </label>

      <input
        type="date"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="
          w-full
          h-10
          px-3
          border
          rounded-lg
          outline-none
          focus:ring-2
          focus:ring-[#714B67]
        "
      />
    </div>
  );
}