import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {

    if(message.trim() === "") return;

    try {

      const res = await axios.post(
        "http://localhost:5000/chat",
        {
          message: message,
        }
      );

      setReply(res.data.reply);

    } catch (error) {

      console.log(error);

      setReply("Server Error");

    }

  };

  const quickPrompt = (text) => {
    setMessage(text);
  };

  return (

    <div className="container">

      <div className="sidebar">

        <h2 className="logo">
          📈 FinAI
        </h2>

        <button
          className="side-btn"
          onClick={() => quickPrompt("Analyze Bitcoin today")}
        >
          ₿ Bitcoin
        </button>

        <button
          className="side-btn"
          onClick={() => quickPrompt("Analyze Ethereum market")}
        >
          ◆ Ethereum
        </button>

        <button
          className="side-btn"
          onClick={() => quickPrompt("Should I invest in Tesla stock?")}
        >
          🚗 Tesla
        </button>

        <button
          className="side-btn"
          onClick={() => quickPrompt("Top crypto for 2026")}
        >
          🚀 Top Crypto
        </button>

        <button
          className="side-btn"
          onClick={() => quickPrompt("Best stocks for long term")}
        >
          💹 Long Term Stocks
        </button>

      </div>

      <div className="main">

        <div className="topbar">

          <div className="market">
            🟢 MARKET OPEN
          </div>

          <div className="ticker">
            BTC +4.2% &nbsp;&nbsp; ETH +2.1% &nbsp;&nbsp; 
            Nifty 50 +1.8%
          </div>

        </div>

        <div className="hero">

          <h1 className="heading">
            AI Crypto + Stock Analyzer
          </h1>

          <p className="subheading">
            Smart financial insights powered by AI
          </p>

        </div>

        <div className="cards">

          <div className="card">
            <h3>Bitcoin</h3>
            <p>+4.21%</p>
          </div>

          <div className="card">
            <h3>Ethereum</h3>
            <p>+2.08%</p>
          </div>

          <div className="card">
            <h3>Nifty 50</h3>
            <p>+1.44%</p>
          </div>

          <div className="card">
            <h3>Sensex</h3>
            <p>-0.82%</p>
          </div>

        </div>

        <div className="chat-section">

          <textarea
            className="textarea"
            placeholder="Ask about stocks, crypto, investments, trading..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="button"
            onClick={sendMessage}
          >
            Analyze Market
          </button>

        </div>

        <div className="answer-box">

          <h2 className="answer-title">
            AI Analysis
          </h2>

          <p className="answer">
            {reply || "AI financial analysis will appear here..."}
          </p>

        </div>

      </div>

    </div>

  );

}

export default App;