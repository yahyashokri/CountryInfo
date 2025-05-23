
export type Country = {
  name: { common: string };
  capital?: string[];
  region: string;
  flags: { png: string };
  timezones: string[];
  population: number;
  startOfWeek: string;
  car: {side: string, signs: string[]};
  area: number;
  maps: {googleMaps: string, openStreetMaps: string};
};
