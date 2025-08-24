import { usePage, router } from "@inertiajs/react";
import { Search, Filter, X, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function NavBar({ children, routeName }) {
  const { filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || "");
  const [searched, setSearched] = useState(!!filters?.search);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") return;
    router.get(
      route(routeName),
      { search },
      { preserveState: true, replace: true }
    );
    setSearched(true);
  };

  const handleSearchInProgress = (status) => {
    router.get(
      route(routeName),
      { ...filters, status }, // ✅ keep search + status together
      { preserveState: true, replace: true }
    );
  };

  const clearSearch = () => {
    setSearch("");
    router.get(route(routeName), { status: filters?.status || "All" });
    setSearched(false);
  };

  const goBack = () => {
    setSearch("");
    router.get(route(routeName), { status: filters?.status || "All" });
    setSearched(false);
  };



  return (
    <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Search */}
      <form onSubmit={handleSearch} className="flex items-center w-1/3">
        <div className="relative w-full">
          {!searched ? (
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          ) : (
            <button
              type="button"
              onClick={goBack}
              className="absolute left-2 top-2.5 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or tasks..."
            className="w-full pl-10 pr-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center px-3 py-2 border rounded-lg text-sm hover:bg-gray-100"
          >
            <Filter size={16} className="mr-1" /> Filter
          </button>
          {filterOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-10">
              <ul className="py-1 text-sm text-gray-700">
                {["All", "pending", "in_progress", "completed"].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => handleSearchInProgress(s)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        filters?.status === s ? "bg-gray-100 font-medium" : ""
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
