"use client";

import { useState } from "react";
import { useCountries } from "../hooks/useCountries";
import dynamic from "next/dynamic";
import ThemeSwitcher from "../components/ThemeSwitch";
import LoadingAnimation from "../components/Loading";

const CountryCard = dynamic(() => import("../components/CountryCard"), {
  ssr: false,
});

export default function HomePage() {
  const { data: countries, loading, error } = useCountries();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const filtered = countries
    .filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    .filter(c => !region || c.region === region);

  const regions = Array.from(new Set(countries.map(c => c.region))).filter(Boolean);

  return (
      <main className="p-6 md:p-10 bg-gray-200 dark:bg-gray-900 min-h-screen">
        {/* header section */}
        <div className="z-10 fixed left-0 right-0 top-0 h-64 lg:h-40 w-screen bg-gradient-to-r from-gray-500 to-gray-300 dark:from-gray-700 dark:to-gray-500 shadow-xl rounded-b-2xl lg:rounded-b-full flex flex-col items-center justify-center p-8">
        <ThemeSwitcher />
          <h1 className="text-5xl font-extrabold text-center text-white dark:text-gray-100 tracking-wide">
            🌍 Country Explorer
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search countries..."
              className="flex-1 px-5 py-3 border border-gray-400 dark:border-gray-600 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-500"
            />
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="px-5 py-3 border border-gray-400 dark:border-gray-600 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-500"
            >
              <option value="">🌐 All Regions</option>
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-72 lg:mt-40 px-4 relative">
          {!loading && !error && (
            <p className="text-md text-gray-700 dark:text-gray-300 mb-4 absolute left-[25%] lg:left-[45%] top-[-30px]">
              Showing {filtered.length} {filtered.length === 1 ? "country" : "countries"}
            </p>
          )}
          {loading && <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="text-center text-gray-400">⏳ Loading countries...</p>
            <LoadingAnimation/>
            </div>
            }
          {error && <p className="text-center text-red-500">⚠️ Error loading data.</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300">No countries found.</p>
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6">
            {filtered.map((country, idx) => (
              <CountryCard country={country} key={idx} />
            ))}
          </div>
        </div>
      </main>
  );
}
