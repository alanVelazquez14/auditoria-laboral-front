export default function Navbar() {
  return (
    <div className="absolute top-0 p-8 flex justify-between items-center w-full max-w-7xl">
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 p-1.5 rounded-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <span className="font-bold text-xl">DepurApp</span>
      </div>
      <button className="text-gray-400 hover:text-white hover:bg-[#18abdb] px-4 py-2 rounded-lg cursor-pointer transition">
        Ingresar
      </button>
    </div>
  );
}
