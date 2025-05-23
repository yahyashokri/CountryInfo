"use client";

import { useState, useEffect } from "react";

interface AnalogueClockProps {
  utcString: string;
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

const AnalogueClock: React.FC<AnalogueClockProps> = ({ utcString }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const offsetHours = parseUTCOffset(utcString);
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const zoneTime = new Date(utcTime + offsetHours * 3600000);

  const hoursNum = zoneTime.getHours() % 12;
  const minutesNum = zoneTime.getMinutes();
  const secondsNum = zoneTime.getSeconds();
  const hourAngle = hoursNum * 30 + minutesNum * 0.5;
  const minuteAngle = minutesNum * 6;
  const secondAngle = secondsNum * 6;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 text-gray-900 dark:text-gray-100">
      <div className="relative w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-800 shadow-2xl flex items-center justify-center">
        <div className="absolute top-[42px] w-2 h-10 bg-gray-700 dark:bg-gray-300 rounded origin-bottom" style={{ transform: `rotate(${hourAngle}deg)` }} />
        <div className="absolute top-[15px] w-1 h-16 bg-gray-500 dark:bg-gray-400 rounded origin-bottom" style={{ transform: `rotate(${minuteAngle}deg)` }} />
        <div className="absolute top-0 w-0.5 h-20 bg-red-500 origin-bottom" style={{ transform: `rotate(${secondAngle}deg)` }} />
        <div className="absolute w-3 h-3 bg-red-500 rounded-full" />
      </div>
    </div>
  );
};

export default AnalogueClock;
