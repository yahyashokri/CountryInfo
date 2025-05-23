"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="absolute top-0 left-0 lg:left-8 lg:top-4 z-30 w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-full p-1 flex items-center transition-colors duration-300"
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}