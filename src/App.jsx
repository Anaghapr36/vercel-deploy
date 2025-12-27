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
  const [generalNewsLoaded, setGeneralNewsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchFilteredNews = async () => {
    if (portfolio.length === 0) {
      setFilteredNews([]);
      setErrorNews(null);
      return;
    }
    setLoadingNews(true);
    setErrorNews(null);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const res = await fetch(`${baseUrl}/api/news/portfolio`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setFilteredNews(data.data);
        if (data.data.length === 0) {
          setErrorNews("No relevant news found for your portfolio stocks.");
        }
      } else {
        setFilteredNews([]);
        setErrorNews(data.message || "No news found.");
      }
    } catch (err) {
      setFilteredNews([]);
      setErrorNews("Failed to fetch portfolio news.");
      console.error("Portfolio news error:", err);
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
    } catch (err) {
      console.error("Portfolio update error:", err);
    }
    // Fetch filtered news after portfolio is updated
    if (newPortfolio.length > 0 && generalNewsLoaded) {
      fetchFilteredNews();
    }
  };

  // Fetch portfolio on app load
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
        const res = await fetch(`${baseUrl}/api/portfolio`);
        const data = await res.json();
        if (data.success && Array.isArray(data.portfolio)) {
          setPortfolio(data.portfolio);
        } else {
          setPortfolio([]);
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setPortfolio([]);
      }
    };
    fetchPortfolio();
  }, []);

  // Fetch filtered news when portfolio changes and general news is loaded
  useEffect(() => {
    if (portfolio.length > 0 && generalNewsLoaded) {
      const timer = setTimeout(() => {
        fetchFilteredNews();
      }, 500); // Small delay to ensure general news is fetched first
      return () => clearTimeout(timer);
    }
  }, [portfolio, generalNewsLoaded]);

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Header onThemeChange={setIsDarkMode} />
      <main className="app-main">
        <GeneralNews onNewsLoaded={() => setGeneralNewsLoaded(true)} />
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
