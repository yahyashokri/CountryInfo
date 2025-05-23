"use client";

import { useState, useEffect } from "react";

interface TimeZoneClockProps {
  utcString: string;
  slug: string;
}

function parseUTCOffset(utcString: string): number {
  const regex = /^UTC([+-])(\d{2}):(\d{2})$/;
  const match = utcString.match(regex);
  if (match) {
    const sign = match[1] === "+" ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);
    return sign * (hours + minutes / 60);
  }
  return 0;
}

const TimeZoneClock: React.FC<TimeZoneClockProps> = ({ utcString , slug }) => {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="p-4 text-center">
        <p className="lg:text-5xl text-xl font-semibold">⌚️Time in ({slug}):</p>
        <p className="lg:text-6xl text-2xl font-mono">--:--:--</p>
      </div>
    );
  }

  const offsetHours = parseUTCOffset(utcString);
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const zoneTime = new Date(utcTime + offsetHours * 3600000);

  const formatTime = (n: number) => n.toString().padStart(2, "0");

  const hours = formatTime(zoneTime.getHours());
  const minutes = formatTime(zoneTime.getMinutes());
  const seconds = formatTime(zoneTime.getSeconds());

  return (
    <div className="p-4 text-center">
      <h3 className="mt-6 lg:text-6xl text-2xl text-center text-red-800 dark:text-orange-300 font-bold">⌚️Time in {slug}:</h3>
      <p className="lg:text-6xl text-2xl font-mono">
        {hours}:{minutes}:{seconds}
      </p>
    </div>
  );
};

export default TimeZoneClock;

