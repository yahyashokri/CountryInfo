import { useEffect, useState } from "react";
import { fetchCountries } from "../services/countryService";
import { Country } from "../types/country";

export function useCountries() {
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchCountries();
        console.log("✅ Fetched countries:", result);
        setData(result);
      } catch (err) {
        console.error("❌ Failed to fetch countries:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, loading, error };
}
