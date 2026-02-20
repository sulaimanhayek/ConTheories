function TimelineEntry({ theory, side, index, expanded, onToggle }) {
  return (
    <div
      className={`timeline-entry ${side}`}
      style={{ animationDelay: `${Math.min(index * 0.06, 0.8)}s` }}
    >
      {/* Dot on the timeline */}
      <div className="timeline-dot-wrapper">
        <div
          className="timeline-dot"
          style={{
            backgroundColor: theory.color,
            boxShadow: `0 0 12px ${theory.color}44`,
          }}
        />
      </div>

      {/* Year side */}
      <div className="year-marker">
        <span className="year-text">{theory.displayYear}</span>
      </div>

      {/* Card side */}
      <div className="card-side">
        <div
          className={`theory-card ${expanded ? "expanded" : ""}`}
          onClick={onToggle}
          style={{ "--card-color": theory.color }}
        >
          <div
            className="theory-card-accent"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${theory.color}, ${theory.color}88)`,
              borderRadius: "12px 12px 0 0",
              opacity: expanded ? 1 : 0.6,
              transition: "opacity 0.25s",
            }}
          />
          <div className="card-header">
            <div className="card-category" style={{ color: theory.color }}>
              {theory.category}
            </div>
            <div className="card-title">{theory.title}</div>
            <div className="card-author">{theory.author}</div>
          </div>
          <div className="card-description">{theory.description}</div>
          {!expanded && (
            <div className="card-expand-hint">Click to read more</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimelineEntry;
