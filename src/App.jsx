"use client";

import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import GeneralNews from "./components/sections/GeneralNews";
import PortfolioInput from "./components/sections/PortfolioInput";
import FilteredNews from "./components/sections/FilteredNews";
import SentimentAnalysis from "./components/sections/SentimentAnalysis";
import "./App.css";

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [errorNews, setErrorNews] = useState(null);

  const fetchFilteredNews = async () => {
    setLoadingNews(true);
    setErrorNews(null);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const res = await fetch(`${baseUrl}/api/news/portfolio`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setFilteredNews(data.data);
      } else {
        setFilteredNews([]);
        setErrorNews(data.message || "No news found.");
      }
    } catch (err) {
      setFilteredNews([]);
      setErrorNews("Failed to fetch portfolio news.");
    } finally {
      setLoadingNews(false);
    }
  };

  const updatePortfolio = async (newPortfolio) => {
    setPortfolio(newPortfolio);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      await fetch(`${baseUrl}/api/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stocks: newPortfolio }),
      });
    } catch (err) {}
    fetchFilteredNews();
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
        const res = await fetch(`${baseUrl}/api/portfolio`);
        const data = await res.json();
        if (data.success && Array.isArray(data.portfolio)) {
          setPortfolio(data.portfolio);
          fetchFilteredNews();
        } else {
          setPortfolio([]);
          fetchFilteredNews();
        }
      } catch (err) {
        setPortfolio([]);
        fetchFilteredNews();
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <GeneralNews />
        <PortfolioInput portfolio={portfolio} setPortfolio={updatePortfolio} />
        <FilteredNews
          portfolio={portfolio}
          news={filteredNews}
          loading={loadingNews}
          error={errorNews}
        />
        <SentimentAnalysis portfolio={portfolio} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
