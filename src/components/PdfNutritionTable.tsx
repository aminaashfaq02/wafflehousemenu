import { useState, useMemo } from "react";
import { pdfNutritionData, type PdfNutritionItem } from "@/data/pdfNutritionData";
import {
  Search,
  ArrowUpDown,
  FileSpreadsheet,
  Check,
  X,
  SlidersHorizontal,
  Flame,
  Beef,
  Wheat,
  Droplet,
  ShieldAlert,
} from "lucide-react";

type SortKey = keyof PdfNutritionItem;

export function PdfNutritionTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedAllergen, setSelectedAllergen] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    pdfNutritionData.forEach((item) => set.add(item.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Allergen quick filters
  const allergenList = [
    "All",
    "Egg",
    "Milk",
    "Soy",
    "Wheat",
    "Tree Nuts",
    "Peanut",
    "None",
  ];

  // Filter & Sort logic
  const filteredAndSortedData = useMemo(() => {
    return pdfNutritionData
      .filter((item) => {
        // Category Filter
        if (selectedCategory !== "All" && item.category !== selectedCategory) {
          return false;
        }
        // Allergen Filter
        if (selectedAllergen !== "All") {
          if (selectedAllergen === "None") {
            if (item.allergens !== "None") return false;
          } else {
            if (!item.allergens.toLowerCase().includes(selectedAllergen.toLowerCase())) {
              return false;
            }
          }
        }
        // Search Term Filter (Name, Subtext, Category, Allergens)
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(q);
          const matchCategory = item.category.toLowerCase().includes(q);
          const matchSubText = item.subText?.toLowerCase().includes(q) ?? false;
          const matchAllergens = item.allergens.toLowerCase().includes(q);
          return matchName || matchCategory || matchSubText || matchAllergens;
        }
        return true;
      })
      .sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "asc" ? valA - valB : valB - valA;
        }

        const strA = String(valA ?? "").toLowerCase();
        const strB = String(valB ?? "").toLowerCase();
        if (strA < strB) return sortOrder === "asc" ? -1 : 1;
        if (strA > strB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchTerm, selectedCategory, selectedAllergen, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedAllergen("All");
    setSortKey("name");
    setSortOrder("asc");
  };

  return (
    <div className="w-full space-y-5 rounded-3xl border border-border bg-surface p-6 shadow-sm">
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
            <FileSpreadsheet className="h-3.5 w-3.5 text-foreground" />
            Official Nutrition PDF Table (v20.2)
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
            Complete Waffle House Nutrition Database
          </h3>
          <p className="mt-1 text-sm text-ink-soft">
            Full official menu breakdown: calories, fat, carbs, sodium, protein & allergens. Scrollable & searchable.
          </p>
        </div>

        {/* Quick Stats pill */}
        <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-border bg-background px-4 py-2.5 text-xs text-foreground">
          <div>
            <span className="text-ink-soft">Total Items:</span>{" "}
            <span className="font-bold text-foreground">{pdfNutritionData.length}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div>
            <span className="text-ink-soft">Showing:</span>{" "}
            <span className="font-bold text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
              {filteredAndSortedData.length}
            </span>
          </div>
        </div>
      </div>

      {/* SEARCH BAR & FILTERS SECTION */}
      <div className="space-y-4 rounded-2xl border border-border bg-background p-4 sm:p-5">
        {/* Main Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search any menu item (e.g. Waffle, Bacon, T-Bone, Hashbrowns, Milk)..."
            className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-10 text-sm font-medium text-foreground placeholder:text-ink-soft outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-ink-soft hover:bg-muted hover:text-foreground"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 rounded-lg border border-border bg-surface px-3 text-xs font-medium text-foreground outline-none transition focus:border-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Allergen Filter Dropdown */}
            <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-ink-soft">
              <ShieldAlert className="h-3.5 w-3.5" /> Allergen:
            </span>
            <select
              value={selectedAllergen}
              onChange={(e) => setSelectedAllergen(e.target.value)}
              className="h-9 rounded-lg border border-border bg-surface px-3 text-xs font-medium text-foreground outline-none transition focus:border-primary"
            >
              {allergenList.map((alg) => (
                <option key={alg} value={alg}>
                  {alg === "All" ? "All Allergens" : alg === "None" ? "No Allergens (None)" : `Contains ${alg}`}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filter Clear Button */}
          {(searchTerm || selectedCategory !== "All" || selectedAllergen !== "All") && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 self-start rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 sm:self-auto"
            >
              <X className="h-3.5 w-3.5" /> Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* SCROLLABLE TABLE WRAPPER WITH SIDEBAR SCROLL CONTROL */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-inner">
        {/* Table scroll container - fixed height max-h-[580px] with vertical scrollbar on the side */}
        <div className="max-h-[580px] overflow-y-auto overflow-x-auto rounded-2xl scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted">
          <table className="w-full text-left text-sm border-collapse">
            {/* Sticky Table Header */}
            <thead className="sticky top-0 z-20 bg-[#111111] text-xs uppercase tracking-wider text-white shadow-md">
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  className="cursor-pointer px-4 py-3.5 font-bold hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Menu Item</span>
                    <ArrowUpDown className="h-3 w-3 text-primary" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("category")}
                  className="cursor-pointer px-4 py-3.5 font-bold hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Category</span>
                    <ArrowUpDown className="h-3 w-3 text-primary" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("calories")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Flame className="h-3 w-3 text-amber-400" />
                    <span>Cal</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort("fatCal")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <span>Fat Cal</span>
                </th>
                <th
                  onClick={() => handleSort("fatG")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Droplet className="h-3 w-3 text-yellow-400" />
                    <span>Fat (g)</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort("satFatG")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <span>SatFat (g)</span>
                </th>
                <th
                  onClick={() => handleSort("transFatG")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <span>TransFat (g)</span>
                </th>
                <th
                  onClick={() => handleSort("cholMg")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <span>Chol (mg)</span>
                </th>
                <th
                  onClick={() => handleSort("sodiumMg")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <span>Sodium (mg)</span>
                </th>
                <th
                  onClick={() => handleSort("carbsG")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Wheat className="h-3 w-3 text-amber-300" />
                    <span>Carbs (g)</span>
                  </div>
                </th>
                <th
                  onClick={() => handleSort("fiberG")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <span>Fiber (g)</span>
                </th>
                <th
                  onClick={() => handleSort("sugarsG")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <span>Sugars (g)</span>
                </th>
                <th
                  onClick={() => handleSort("proteinG")}
                  className="cursor-pointer px-3 py-3.5 text-right font-bold hover:bg-white/10 transition"
                >
                  <div className="flex items-center justify-end gap-1">
                    <Beef className="h-3 w-3 text-red-400" />
                    <span>Protein (g)</span>
                  </div>
                </th>
                <th className="px-4 py-3.5 font-bold min-w-[140px]">Allergens</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-border bg-background">
              {filteredAndSortedData.length === 0 ? (
                <tr>
                  <td colSpan={14} className="py-12 text-center text-ink-soft">
                    <p className="font-semibold text-foreground">No menu items found matching "{searchTerm}"</p>
                    <button
                      onClick={clearFilters}
                      className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90"
                    >
                      Reset Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredAndSortedData.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-primary/10 ${
                      idx % 2 === 0 ? "bg-background" : "bg-surface/60"
                    }`}
                  >
                    {/* Item Name */}
                    <td className="px-4 py-3 font-semibold text-foreground min-w-[200px]">
                      <div>{item.name}</div>
                      {item.subText && (
                        <div className="text-[11px] font-normal text-ink-soft italic">{item.subText}</div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 text-xs text-ink-soft min-w-[160px]">
                      <span className="inline-block rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-foreground">
                        {item.category}
                      </span>
                    </td>

                    {/* Calories */}
                    <td className="px-3 py-3 text-right font-bold text-foreground">
                      {item.calories}
                    </td>

                    {/* Fat Cal */}
                    <td className="px-3 py-3 text-right text-ink-soft">
                      {item.fatCal}
                    </td>

                    {/* Fat g */}
                    <td className="px-3 py-3 text-right font-medium text-foreground">
                      {item.fatG}g
                    </td>

                    {/* SatFat g */}
                    <td className="px-3 py-3 text-right text-ink-soft">
                      {item.satFatG}g
                    </td>

                    {/* TransFat g */}
                    <td className="px-3 py-3 text-right text-ink-soft">
                      {item.transFatG}g
                    </td>

                    {/* Chol mg */}
                    <td className="px-3 py-3 text-right text-ink-soft">
                      {item.cholMg}
                    </td>

                    {/* Sodium mg */}
                    <td className="px-3 py-3 text-right text-ink-soft">
                      {item.sodiumMg}
                    </td>

                    {/* Carbs g */}
                    <td className="px-3 py-3 text-right font-medium text-foreground">
                      {item.carbsG}g
                    </td>

                    {/* Fiber g */}
                    <td className="px-3 py-3 text-right text-ink-soft">
                      {item.fiberG}g
                    </td>

                    {/* Sugars g */}
                    <td className="px-3 py-3 text-right text-ink-soft">
                      {item.sugarsG}g
                    </td>

                    {/* Protein g */}
                    <td className="px-3 py-3 text-right font-bold text-emerald-700 dark:text-emerald-400">
                      {item.proteinG}g
                    </td>

                    {/* Allergens */}
                    <td className="px-4 py-3 text-xs min-w-[150px]">
                      {item.allergens === "None" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                          <Check className="h-3 w-3" /> None
                        </span>
                      ) : (
                        <span className="inline-block rounded-md bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:text-amber-200">
                          {item.allergens}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info inside scrollbox */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border bg-surface px-4 py-3 text-xs text-ink-soft">
          <p>
            * Values from official Waffle House Nutrition Guide (v20.2 PDF). 2,000 calories a day is used for general nutrition advice.
          </p>
          <p className="mt-1 sm:mt-0 font-semibold text-foreground">
            Scroll vertically to view all {filteredAndSortedData.length} items
          </p>
        </div>
      </div>
    </div>
  );
}
