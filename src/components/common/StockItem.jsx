import Button from "../ui/Button";

function StockItem({ symbol, onRemove }) {
  return (
    <div className="portfolio-item">
      <span className="stock-symbol">{symbol}</span>
      <Button variant="danger" size="small" onClick={() => onRemove(symbol)}>
        Remove
      </Button>
    </div>
  );
}

export default StockItem;
