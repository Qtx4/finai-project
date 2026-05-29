import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// STOCK SYMBOLS
const stockSymbols = {
  tesla: "TSLA",
  apple: "AAPL",
  microsoft: "MSFT",
  nvidia: "NVDA",
  amazon: "AMZN",
  google: "GOOGL",
  meta: "META",
  netflix: "NFLX",

  infosys: "INFY.NS",
  tcs: "TCS.NS",
  reliance: "RELIANCE.NS",

  bitcoin: "BINANCE:BTCUSDT",
  ethereum: "BINANCE:ETHUSDT",
  solana: "BINANCE:SOLUSDT",
};

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message.toLowerCase();

    let symbol = null;

    // FIND STOCK NAME
    for (const key in stockSymbols) {

      if (userMessage.includes(key)) {
        symbol = stockSymbols[key];
        break;
      }

    }

    let liveData = "No live market data found.";

    // FETCH LIVE PRICE
    if (symbol) {

      const stock = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
      );

      liveData = `
Asset: ${symbol}

Current Price: ${stock.data.c}
High Price: ${stock.data.h}
Low Price: ${stock.data.l}
Open Price: ${stock.data.o}
Previous Close: ${stock.data.pc}
`;

    }

    const completion = await groq.chat.completions.create({

      messages: [

        {
          role: "system",
          content: `
You are FinAI, a professional AI financial advisor.

Use this LIVE market data while answering:

${liveData}

You specialize in:
- Cryptocurrency
- Stocks
- Trading
- Investing
- Technical analysis
- Financial education

Rules:
- Give smart finance answers.
- Explain clearly.
- Use live data if available.
          `,
        },

        {
          role: "user",
          content: userMessage,
        },

      ],

      model: "llama-3.3-70b-versatile",

    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });

  }

});

app.listen(5000, () => {
  console.log("FinAI running on port 5000");
});