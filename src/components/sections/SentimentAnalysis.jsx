"use client";

import { useState } from "react";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import SentimentItem from "../common/SentimentItem";

function SentimentAnalysis({ portfolio }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState({});
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [error, setError] = useState(null);

  const runAnalysis = async () => {
    if (portfolio.length === 0) {
      alert("Please add some stocks to your portfolio first!");
      return;
    }
    setIsAnalyzing(true);
    setHasAnalyzed(false);
    setError(null);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const res = await fetch(`${baseUrl}/api/analysis`);
      const data = await res.json();
      if (data.success && data.result) {
        let parsed;
        try {
          if (typeof data.result === "string") {
            const cleanedResult = data.result.replace(/```json\n?/, '').replace(/\n?```$/, '');
            parsed = JSON.parse(cleanedResult);
          } else {
            parsed = data.result;
          }
        } catch {
          parsed = {};
        }
        setAnalysisResults(parsed);
      } else {
        setAnalysisResults({});
        setError(data.message || "No analysis result.");
      }
    } catch (err) {
      setAnalysisResults({});
      setError("Failed to fetch analysis.");
    } finally {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }
  };

  return (
    <Card>
      <SectionTitle>🤖 AI Sentiment Analysis</SectionTitle>
      <Button
        onClick={runAnalysis}
        disabled={isAnalyzing || portfolio.length === 0}
        variant="success"
        className={isAnalyzing ? "analyzing" : ""}
      >
        {isAnalyzing ? "Analyzing..." : "Run Analysis"}
      </Button>
      {isAnalyzing && <LoadingSpinner message="Analyzing sentiment for your portfolio stocks..." />}
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {hasAnalyzed && analysisResults && Object.keys(analysisResults).length > 0 && (
        <div className="analysis-results">
          <h3>Analysis Results:</h3>
          {Object.entries(analysisResults).map(([symbol, result]) => (
            <div key={symbol} style={{ marginBottom: 24 }}>
              <h4 style={{ marginBottom: 8 }}>{symbol}</h4>
              <SentimentItem result={{ symbol, ...result }} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default SentimentAnalysis;