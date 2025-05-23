"use client";

import { useState, useEffect } from "react";
import LoadingAnimation from "./Loading";

interface OpenStreetMapDynamicProps {
  mapLink: string;
}

export default function OpenStreetMapDynamic({
  mapLink,
}: OpenStreetMapDynamicProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const match = mapLink.match(/\/relation\/(\d+)/);
    if (!match) {
      setError("Invalid map URL format. Expected a relation URL.");
      return;
    }
    const relationId = match[1];
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];relation(${relationId});out bb;`;

    fetch(overpassUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from Overpass API");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.elements || data.elements.length === 0) {
          throw new Error("No relation data found");
        }
        const relation = data.elements[0];
        if (!relation.bounds) {
          throw new Error("No bounding box found for this relation");
        }
        const { minlat, minlon, maxlat, maxlon } = relation.bounds;

        const centerLat = (minlat + maxlat) / 2;
        const centerLon = (minlon + maxlon) / 2;
        const bbox = `${minlon},${minlat},${maxlon},${maxlat}`;
        const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${centerLat},${centerLon}`;
        setEmbedUrl(embed);
      })
      .catch((err) => {
        setError(err.toString());
      });
  }, [mapLink]);

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700">
        Error: {error}
      </div>
    );
  }

  if (!embedUrl) {
    return (
    <div>
      <LoadingAnimation/>
    </div>
    );
    
  }

  return (
    <div className="w-full h-96">
      <iframe
        src={embedUrl}
        title="OpenStreetMap"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        className="w-full h-full border-0 rounded-3xl filter dark:invert dark:hue-rotate-180"
      ></iframe>
    </div>
  );
}
