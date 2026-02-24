import { useState, useMemo } from "react";
import theories, { categories } from "./data/theories";
import TimelineEntry from "./components/TimelineEntry";
import "./App.css";

const eras = [
  { label: "Ancient World", startYear: -600, endYear: -1 },
  { label: "Early Modern Period", startYear: 1600, endYear: 1799 },
  { label: "19th Century", startYear: 1800, endYear: 1899 },
  { label: "Early 20th Century", startYear: 1900, endYear: 1959 },
  { label: "Late 20th Century", startYear: 1960, endYear: 1999 },
  { label: "21st Century", startYear: 2000, endYear: 2100 },
];

function getEraForYear(year) {
  return eras.find((e) => year >= e.startYear && year <= e.endYear);
}

function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    return theories.filter((t) => {
      const matchesSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.author.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  // Group entries by era, preserving order
  const groupedEntries = useMemo(() => {
    const groups = [];
    let lastEra = null;

    filtered.forEach((theory, index) => {
      const era = getEraForYear(theory.year);
      const eraLabel = era ? era.label : "Other";

      if (eraLabel !== lastEra) {
        groups.push({ type: "era", label: eraLabel });
        lastEra = eraLabel;
      }

      groups.push({
        type: "entry",
        theory,
        side: index % 2 === 0 ? "left" : "right",
        index,
      });
    });

    return groups;
  }, [filtered]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>
            Theories of <span>Consciousness</span>
          </h1>
          <p>
            From ancient philosophy to modern neuroscience — a visual journey
            through humanity's attempts to understand the nature of conscious
            experience.
          </p>
          <div className="stats">
            <div className="stat">
              <div className="stat-number">{theories.length}</div>
              <div className="stat-label">Theories</div>
            </div>
            <div className="stat">
              <div className="stat-number">2,500+</div>
              <div className="stat-label">Years</div>
            </div>
            <div className="stat">
              <div className="stat-number">{categories.length}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-inner">
          <div className="search-row">
            <input
              type="text"
              className="search-input"
              placeholder="Search theories, authors, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="result-count">
              {filtered.length} of {theories.length}
            </span>
          </div>
          <div className="category-filters">
            <button
              className={`filter-btn ${activeCategory === "All" ? "active" : ""}`}
              style={
                activeCategory === "All"
                  ? { background: "#fff", color: "#0a0a0f" }
                  : {}
              }
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`filter-btn ${activeCategory === cat.name ? "active" : ""}`}
                style={
                  activeCategory === cat.name
                    ? { background: cat.color, color: "#fff" }
                    : {}
                }
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.name ? "All" : cat.name
                  )
                }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        <div className="timeline-line" />

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No theories match your search.</p>
            <span>Try a different keyword or category.</span>
          </div>
        ) : (
          groupedEntries.map((item, i) => {
            if (item.type === "era") {
              return (
                <div className="era-marker" key={`era-${item.label}`}>
                  <div className="era-marker-inner">
                    <div className="era-marker-line" />
                    <h3>{item.label}</h3>
                    <div className="era-marker-line" />
                  </div>
                </div>
              );
            }

            return (
              <TimelineEntry
                key={item.theory.id}
                theory={item.theory}
                side={item.side}
                index={item.index}
                expanded={expandedId === item.theory.id}
                onToggle={() =>
                  setExpandedId(
                    expandedId === item.theory.id ? null : item.theory.id
                  )
                }
              />
            );
          })
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Built by a student for students.</p>
        <p>
          This website is inspired by an assignment related to Neuroscience of
          Consciousness Module of AI and Adaptive Systems course at the
          University of Sussex.
        </p>
      </footer>
    </div>
  );
}

export default App;
