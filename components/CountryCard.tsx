"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Country } from "../types/country";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  country: Country;
}

export default function CountryCard({ country }: Props) {
  const [flipped, setFlipped] = useState(false);

  const slug = country.name.common.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/country/${slug}`} prefetch={false}>
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full h-[330px] cursor-pointer perspective-[1200px]"
        aria-label={`Country card for ${country.name.common}`}
      >
        <div
          className={`relative w-full h-full duration-700 transition-transform transform-style-3d ${
            flipped ? "rotate-y-180" : ""
          } card-container`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 flex flex-col justify-between overflow-hidden">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                width={320}
                height={180}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
            <h2 className="text-center mt-4 text-lg font-semibold text-gray-800 dark:text-white tracking-wide">
              {country.name.common}
            </h2>
          </div>

          {/* Back Side */}
            <div className="absolute inset-0 transition-none backface-hidden rotate-y-180 bg-indigo-100 dark:bg-indigo-900 rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center">
            <p className="flex items-center gap-2 text-gray-800 dark:text-white text-sm mb-2">
              <FaMapMarkerAlt className="text-indigo-500" />
              <span>
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </span>
            </p>
            <p className="flex items-center gap-2 text-gray-800 dark:text-white text-sm">
              <FaGlobe className="text-indigo-500" />
              <span>
                <strong>Region:</strong> {country.region}
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-5">
              Click to flip back
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
