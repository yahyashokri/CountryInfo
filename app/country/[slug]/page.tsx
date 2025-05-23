import { notFound } from "next/navigation";
import Link from "next/link";
import { Country } from "../../../types/country";
import Image from "next/image";
import ThemeSwitcher from "../../../components/ThemeSwitch";
import TimeZoneClock from "../../../components/Clock";
import OpenStreetMapEmbed from "../../../components/Map";
import AnalogueClock from "../../../components/AnalogueClock";

// metadata
export async function generateMetadata(
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  return {
    title: `${slug} - Country Explorer`,
    description: `Details and information about ${slug} on Country Explorer.`,
  };
}

// filtering data for specific country
async function getCountry(slug: string): Promise<Country | null> {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${slug}`);
    if (!res.ok) return null;
    const country : Country = await res.json();
    return country[0];
  } catch {
    return null;
  }
}


export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) return notFound();

  return (
    <main className="min-h-screen bg-gray-200 dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <div className="lg:fixed absolute left-0 lg:bottom-0 top-0 w-screen h-[400px] lg:w-96 lg:h-screen bg-gradient-to-r from-gray-300 to-gray-500 dark:from-gray-500 dark:to-gray-700 shadow-xl lg:rounded-r-3xl flex flex-col items-center justify-center p-8">
      <ThemeSwitcher/>
      <h1 className="text-4xl font-bold mb-4">{country?.name?.common}</h1>
      <Image
        src={country?.flags?.png}
        alt={`Flag of ${country?.name?.common}`}
        width={500}
        height={300}
        className="w-full max-w-md rounded-lg shadow-lg mb-6"
        />
      <p className="text-lg">
        <strong>Capital:</strong> {country?.capital?.[0] || "N/A"}
      </p>
      <p className="text-lg">
        <strong>Region:</strong> {country?.region}
      </p>
      <Link
        href="/"
        className="inline-block mb-3 mt-10 text-indigo-600 dark:text-indigo-300 hover:underline text-sm"
        >
        ← Back to Home
      </Link>
        </div>
        <div className="h-96 lg:absolute"></div>
        <div className="flex flex-col items-center justify-center lg:ml-96">
          <h3 className="mt-3 mb-3 lg:text-6xl text-2xl text-center text-red-800 dark:text-orange-300 font-bold">📌Location: </h3>
          <div className="flex flex-col justify-center items-center h-96 w-full">
          <OpenStreetMapEmbed mapLink={country?.maps.openStreetMaps} />
          </div>
          <TimeZoneClock utcString={country?.timezones[0]} slug={slug}/>
          <AnalogueClock utcString={country?.timezones[0]} />
          <h3 className="mt-3 lg:text-6xl text-2xl text-center text-red-800 dark:text-orange-300 font-bold">Facts about {slug}:</h3>
          <p className="mt-3 lg:text-5xl text-xl text-center">📏{slug} area is {country?.area} square kilometers</p>
          <p className="mt-3 lg:text-5xl text-xl text-center">👥{country?.population} People live in {slug}</p>
          <p className="mt-3 lg:text-5xl text-xl text-center">📅The week starts on {country?.startOfWeek} in {slug}</p>
          <p className="mt-3 lg:text-5xl text-xl text-center">🚗Cars wheels are on the {country?.car?.side} in {slug}</p>
        </div>
    </main>
  );
}
