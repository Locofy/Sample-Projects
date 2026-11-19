import { FormEvent, FunctionComponent, useMemo, useState } from "react";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { gigs, useGigHubStore } from "../../store/useGigHubStore";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  className?: string;
};

const SearchBar: FunctionComponent<SearchBarProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useGigHubStore((state) => state.search);
  const setSearch = useGigHubStore((state) => state.setSearch);
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return gigs.slice(0, 3);
    return gigs
      .filter((gig) =>
        [gig.title, gig.seller, gig.category, ...gig.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 4);
  }, [query]);

  const goToSearch = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const normalizedQuery = query.trim();
    setIsOpen(false);
    if (!normalizedQuery) {
      if (location.pathname !== "/") navigate("/");
      return;
    }
    navigate(`/search?q=${encodeURIComponent(normalizedQuery)}`);
  };

  const chooseSuggestion = (title: string) => {
    setSearch(title);
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(title)}`);
  };

  return (
    <div className={[styles.wrapper, className].join(" ")}>
      <form className={styles.form} onSubmit={goToSearch}>
        <Search size={17} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setSearch(event.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="What service are you looking for?"
          aria-label="Search services"
          autoComplete="off"
        />
        <button aria-label="Search" type="submit">
          <Search size={16} />
        </button>
      </form>
      {isOpen && (
        <>
          <button
            className={styles.dismiss}
            aria-label="Close search suggestions"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.suggestions}>
            <div className={styles.suggestionHeader}>
              <span>
                {query.trim() ? "Suggested services" : "Popular right now"}
              </span>
              <Sparkles size={14} />
            </div>
            {suggestions.length > 0 ? (
              suggestions.map((gig) => (
                <button
                  key={gig.id}
                  className={styles.suggestion}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => chooseSuggestion(gig.title)}
                >
                  <img src={gig.image} alt="" />
                  <span>
                    <strong>{gig.title}</strong>
                    <small>
                      {gig.category} · From ${gig.price}
                    </small>
                  </span>
                  <ArrowUpRight size={15} />
                </button>
              ))
            ) : (
              <div className={styles.noResults}>
                No exact matches yet. Try a broader phrase.
              </div>
            )}
            <button
              className={styles.allResults}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => goToSearch()}
            >
              Search all services <ArrowUpRight size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
