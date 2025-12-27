import Badge from "../ui/Badge";

function SentimentItem({ result }) {
  const getSentimentColor = (sentiment) => {
    if (!sentiment || typeof sentiment !== "string") return "#6b7280";
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "#22c55e";
      case "negative":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="sentiment-item">
      <div className="sentiment-header">
        <span className="stock-symbol">{result.symbol}</span>
        <Badge color={getSentimentColor(result.sentiment)}>
          {result.sentiment || "Unknown"}
        </Badge>
      </div>
      <div className="sentiment-details">
        <p className="confidence">
          Confidence:{" "}
          {result.confidence ? result.confidence * 100 + "%" : "N/A"}
        </p>
        <p className="reason">{result.reason || "No reason provided."}</p>
      </div>
    </div>
  );
}

export default SentimentItem;
