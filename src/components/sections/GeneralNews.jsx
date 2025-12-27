import { useEffect, useState } from "react";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import NewsItem from "../common/NewsItem";

function GeneralNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    fetch(`${baseUrl}/api/news/general`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setNews(data.data);
        } else {
          setNews([]);
          setError("API did not return a news array");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card>
      <SectionTitle>📢 General Market News</SectionTitle>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>Error: {error}</div>
      ) : (
        <div className="news-list">
          {news.map((item, idx) => (
            <NewsItem key={item.id || item.url || idx} news={item} />
          ))}
        </div>
      )}
    </Card>
  );
}

export default GeneralNews;
