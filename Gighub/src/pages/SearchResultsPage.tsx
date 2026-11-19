import { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import GigCard from "../components/GigCard";
import { categories, gigs, useGigHubStore } from "../store/useGigHubStore";
import styles from "./SearchResultsPage.module.css";

const SearchResultsPage: FunctionComponent = () => {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");
  const search = useGigHubStore((state) => state.search);
  const setSearch = useGigHubStore((state) => state.setSearch);
  const setCategoryInStore = useGigHubStore((state) => state.setCategory);

  useEffect(() => {
    if (urlQuery !== search) setSearch(urlQuery);
  }, [urlQuery, search, setSearch]);

  const results = useMemo(() => {
    const normalizedQuery = urlQuery.trim().toLowerCase();
    const filtered = gigs.filter((gig) => {
      const matchesQuery =
        !normalizedQuery ||
        [gig.title, gig.seller, gig.category, ...gig.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "All" || gig.category === category;
      return matchesQuery && matchesCategory;
    });
    return [...filtered].sort((first, second) =>
      sort === "price"
        ? first.price - second.price
        : sort === "rating"
          ? second.rating - first.rating
          : second.reviews - first.reviews,
    );
  }, [category, sort, urlQuery]);

  const updateCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    setCategoryInStore(nextCategory);
  };

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <Link className={styles.backLink} to="/">
          <ArrowLeft size={14} /> Back to discover
        </Link>
        <section className={styles.searchHero}>
          <div>
            <span className={styles.kicker}>Explore the marketplace</span>
            <h1>
              {urlQuery ? (
                <>
                  Results for <span>“{urlQuery}”</span>
                </>
              ) : (
                "Find the right creative partner"
              )}
            </h1>
            <p>
              Compare work, ratings, delivery times, and prices before you start
              a conversation.
            </p>
          </div>
          <div className={styles.heroSearch}>
            <Search size={18} />
            <span>{urlQuery || "All creative services"}</span>
            <Sparkles size={16} />
          </div>
        </section>
        <div className={styles.resultsLayout}>
          <aside className={styles.filters}>
            <div className={styles.filterHeading}>
              <span>
                <Filter size={15} /> Filters
              </span>
              <button onClick={() => updateCategory("All")}>Reset</button>
            </div>
            <div className={styles.filterGroup}>
              <label>Category</label>
              <button
                className={category === "All" ? styles.selectedFilter : ""}
                onClick={() => updateCategory("All")}
              >
                All services <span>{gigs.length}</span>
              </button>
              {categories.map((item) => {
                const count = gigs.filter(
                  (gig) => gig.category === item.label,
                ).length;
                return (
                  <button
                    key={item.id}
                    className={
                      category === item.label ? styles.selectedFilter : ""
                    }
                    onClick={() => updateCategory(item.label)}
                  >
                    {item.label} <span>{count}</span>
                  </button>
                );
              })}
            </div>
            <div className={styles.filterGroup}>
              <label>Project fit</label>
              <button
                onClick={() =>
                  useGigHubStore
                    .getState()
                    .showToast("Fast delivery filter selected")
                }
              >
                Fast delivery <span>↗</span>
              </button>
              <button
                onClick={() =>
                  useGigHubStore
                    .getState()
                    .showToast("Top rated filter selected")
                }
              >
                Top rated <span>↗</span>
              </button>
            </div>
            <div className={styles.filterHint}>
              <SlidersHorizontal size={16} />
              <span>
                Use search terms like “mobile”, “brand”, or “presentation” to
                narrow your results.
              </span>
            </div>
          </aside>
          <section className={styles.results}>
            <div className={styles.resultsHeader}>
              <div>
                <span className={styles.resultCount}>
                  {results.length} services
                </span>
                <h2>{category === "All" ? "Recommended for you" : category}</h2>
              </div>
              <label className={styles.sort}>
                <span>Sort by</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  aria-label="Sort results"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest rated</option>
                  <option value="price">Lowest price</option>
                </select>
                <ChevronDown size={14} />
              </label>
            </div>
            {results.length > 0 ? (
              <div className={styles.grid}>
                {results.map((gig, index) => (
                  <motion.div
                    key={gig.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <GigCard gig={gig} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <span>
                  <Search size={22} />
                </span>
                <h3>No services found</h3>
                <p>Try a broader search or reset your filters.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    updateCategory("All");
                  }}
                >
                  Clear search <ArrowRight size={15} />
                </button>
              </div>
            )}
          </section>
        </div>
        <div className={styles.searchTips}>
          <Check size={16} />
          <span>
            Every GigHub profile is built around real work, clear pricing, and a
            human conversation.
          </span>
        </div>
      </main>
    </AppLayout>
  );
};

export default SearchResultsPage;
