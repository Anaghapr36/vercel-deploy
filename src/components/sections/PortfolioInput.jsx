"use client";

import { useState } from "react";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import Input from "../ui/Input";
import StockItem from "../common/StockItem";

function PortfolioInput({ portfolio, setPortfolio }) {
  const [inputSymbol, setInputSymbol] = useState("");

  const addStock = () => {
    if (inputSymbol.trim() && !portfolio.includes(inputSymbol.toUpperCase())) {
      setPortfolio([...portfolio, inputSymbol.toUpperCase()]);
      setInputSymbol("");
    }
  };

  const removeStock = (symbol) => {
    setPortfolio(portfolio.filter((stock) => stock !== symbol));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addStock();
    }
  };

  return (
    <Card>
      <SectionTitle>📈 Your Stock Portfolio</SectionTitle>
      <div className="portfolio-input">
        <Input
          value={inputSymbol}
          onChange={(e) => setInputSymbol(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter stock symbol (e.g., TCS, INFY)"
          className="stock-input"
        />
        <Button onClick={addStock}>Add</Button>
      </div>
      {portfolio.length > 0 && (
        <div className="portfolio-list">
          <h3>Your Stocks:</h3>
          {portfolio.map((symbol) => (
            <StockItem key={symbol} symbol={symbol} onRemove={removeStock} />
          ))}
        </div>
      )}
    </Card>
  );
}

export default PortfolioInput;
