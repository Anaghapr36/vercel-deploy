import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import NewsItem from "../common/NewsItem";

function FilteredNews({ portfolio, news = [], loading = false, error = null }) {
  return (
    <Card>
      <SectionTitle> Portfolio-Relevant News</SectionTitle>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : news.length > 0 ? (
        <div className="news-list">
          {news.map((item, idx) => (
            <NewsItem
              key={item.id || item.url || idx}
              news={item}
              isRelevant={true}
            />
          ))}
        </div>
      ) : (
        <div className="no-news">
          <p>No relevant news found for your portfolio stocks.</p>
          {portfolio.length === 0 && (
            <p>Add some stocks to your portfolio to see relevant news!</p>
          )}
        </div>
      )}
    </Card>
  );
}

export default FilteredNews;
