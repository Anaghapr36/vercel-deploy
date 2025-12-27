function NewsItem({ news, isRelevant = false }) {
  const formattedTime = news.timestamp
    ? new Date(news.timestamp).toLocaleString()
    : "";
  return (
    <a
      href={news.url || "#"}
      className={`news-item-link ${isRelevant ? "relevant-news" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={`news-item`}>
        <h3 className="news-title">{news.title}</h3>
        {news.description && (
          <p className="news-description">{news.description}</p>
        )}
        <div className="news-meta">
          <span className="news-source">{news.source} </span>
          <span className="news-timestamp">{formattedTime}</span>
        </div>
      </div>
    </a>
  );
}

export default NewsItem;
