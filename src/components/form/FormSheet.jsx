export default function FormSheet({ children }) {
  return (
    <div
      className="
        bg-white
        border
        rounded-xl
        p-6
        shadow-sm
      "
    >
      {children}
    </div>
  );
}