export default function ButtonField({
  label,
  name,
  type = "button",
  value,
  onClick,
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

      {/* Button */}
      <button
  id={name}
  type={type}
  name={name}
  onClick={onClick}
  className={`
    w-full
    h-12
    rounded-xl
    bg-[#714B67]
    hover:bg-[#5d3d56]
    text-white
    font-semibold
    transition-all
    duration-200
    flex
    items-center
    justify-center
    gap-2
    ${className}
  `}
>
  {value}
</button>
    </div>
  );
}