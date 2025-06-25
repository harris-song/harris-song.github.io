---
permalink: /trading/
title: "Trading"
author_profile: false
---

# Harris Song Trading SMA

<div style="text-align: center; margin: 30px 0;">
  <a href="https://harris-song-trading.streamlit.app/" target="_blank" rel="noopener" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; hover: transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.3);">
    Launch Trading Dashboard (Fullscreen)
  </a>
</div>

<iframe
  src="https://harris-song-trading.streamlit.app/?embed=true"
  width="100%"
  height="800"
  style="border: none;"
  loading="lazy"
></iframe>

This Streamlit app showcases:
- Simple Moving Average (SMA) trading strategies
- Interactive charts and backtesting
- Real-time data visualization

Feel free to try out the demo and see how the strategies perform on different stocks and timeframes!

---

## What's on the Trading Dashboard?

- **Controls:**  
  - **Market Selection:** Choose between ES=F (E-mini S&P 500 Futures) and SPY (SPDR S&P 500 ETF).
  - **Data Frequency:** Select time period (e.g., 5 days) and data interval (e.g., 5 minutes).
  - **Strategy Selection:** Run both SMA Crossover and Breakout strategies.
  - **Strategy Parameters:**  
    - *SMA Crossover:* Set short and long moving average periods.  
    - *Breakout Strategy:* Adjust lookback period, volume factor, stop loss %, and take profit %.

- **Multi-Strategy Trading Dashboard:**  
  - **Market Overview:** Live prices and percent changes for ES=F and SPY.
  - **Strategy Results:**  
    - See starting and final balances, returns, and current trend signals (e.g., BULLISH).
    - View results for each strategy and market.
  - **Recent Data:**  
    - Tabular view of the latest market data at your selected interval.

- **Live Market Status:**  
  - Shows current time, market hours, and last data update. 