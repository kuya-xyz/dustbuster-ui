import React, { useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import confetti from "canvas-confetti";
import "./App.css";

export default function App() {
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    const sdk = new CoinbaseWalletSDK({
      appName: "dustbuster.ai",
      appLogoUrl: "https://dustbuster-ui.vercel.app/favicon.ico",
      darkMode: true,
    });

    const provider = sdk.makeWeb3Provider("https://mainnet.base.org", 8453);

    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setConnected(true);
    } catch (e) {
      alert("open coinbase wallet app and approve the connection");
    }
  };

  const vacuum = () => {
    confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 }, colors: ["#ff9500", "#ffb13b"] });
    alert("vacuum complete! you're in the draw for USDC");
  };

  return (
    <div className="App">
      <header>
        <div className="broom-above">🧹</div>
        <h1>dustbuster.ai</h1>
        <p>
          Sweep your base wallet for "dust" (tokens you hold with a total value of less than $0.069) then let dustbuster.ai convert them for entries to win a minimum of 100x the amount in USDC!
        </p>
      </header>

      {!connected ? (
        <button className="connect-btn" onClick={connect}>
          SCAN BASE WALLET
        </button>
      ) : (
        <div className="connected">
          <p>connected: {account.slice(0, 6)}...{account.slice(-4)}</p>

          <div className="dust-box">
            <h2>found dust (under $0.069)</h2>
            <button className="vacuum-btn" onClick={vacuum}>
              SWEEP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
