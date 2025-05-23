import { Country } from "../types/country";

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch("https://restcountries.com/v3.1/all");
  if (!res.ok) throw new Error("Failed to fetch countries");

  const json = await res.json();

  const cleaned: Country[] = json.map((c: any) => ({
    name: { common: c.name?.common || "Unknown" },
    capital: c.capital || ["N/A"],
    region: c.region || "Unknown",
    flags: { png: c.flags?.png || "" },
  }));

  return cleaned;
}
