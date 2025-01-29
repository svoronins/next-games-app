"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlatformId } from "../app/utils";
import { Game } from "../app/types";

interface FilterItem {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  title: string;
  items: FilterItem[];
  currentFilter: string | null;
  onFilterChange: (value: string | null) => void;
}

function FilterDropdown({
  title,
  items,
  currentFilter,
  onFilterChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-1 ms-3 text-left whitespace-nowrap">{title}</span>
        {isOpen ? (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19 9-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 5 7 7-7 7"
            />
          </svg>
        )}
      </button>
      <ul className={`${!isOpen ? "hidden" : ""} py-2 space-y-2`}>
        <li>
          <button
            className={`flex items-center w-full p-2 rounded-lg pl-11 group dark:text-white ${
              !currentFilter
                ? "bg-blue-300"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => onFilterChange(null)}
          >
            Show All
          </button>
        </li>
        {items.map((item) => (
          <li key={item.id}>
            <button
              className={`flex text-left items-center w-full p-2 rounded-lg pl-11 group dark:text-white ${
                currentFilter === item.id
                  ? "bg-blue-300"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => onFilterChange(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function SideBar({ games }: { games: Game[] }) {
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [platforms, setPlatforms] = useState<FilterItem[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const currentPlatform = searchParams.get("platform");

  useEffect(() => {
    const gameCategories = Array.from(
      new Set(games.map((game) => game.genre.trim()))
    ).map((cat) => ({
      id: cat.toLowerCase(),
      label: cat,
    }));

    const gamePlatforms = Array.from(
      new Set(games.map((game) => game.platform.trim()))
    ).map((pl) => ({
      id: getPlatformId(pl),
      label: pl,
    }));

    setCategories(gameCategories);
    setPlatforms(gamePlatforms);
  }, [games]);

  const handleFilterChange = (filterType: string, value: string | null) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value) {
      currentParams.set(filterType, value);
    } else {
      currentParams.delete(filterType);
    }
    router.push(`/games?${currentParams.toString()}`);
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <FilterDropdown
            title="Category"
            items={categories}
            currentFilter={currentCategory}
            onFilterChange={(value) => handleFilterChange("category", value)}
          />
          <FilterDropdown
            title="Platform"
            items={platforms}
            currentFilter={currentPlatform}
            onFilterChange={(value) => handleFilterChange("platform", value)}
          />
        </ul>
      </div>
    </aside>
  );
}
