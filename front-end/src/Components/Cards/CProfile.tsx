export default function CProfile() {
  return (
    <header className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6 w-full px-10 py-3 rounded-xl bg-gray-200 border border-orange-600/40 shadow-lg">
      <div className="shrink-0 flex items-center gap-3">
        <img
          src="/profile_example.jpg"
          alt="image profile user"
          className="w-15 h-15 rounded-full object-cover"
        />
        <div>
          <span className="font-bold capitalize">Carlos Martinez</span>
          <p className="text-xs text-gray-500">Role: <span className="text-orange-600">User</span></p>
        </div>
      </div>

      <div className="relative w-full sm:max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search product by name, categories or SKU"
          className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-neutral-800 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
      </div>
    </header>
  );
}
