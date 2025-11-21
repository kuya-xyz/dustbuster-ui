import React, { useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import confetti from "canvas-confetti";
import "./App.css";

export default function App() {
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    try {
      const sdk = new CoinbaseWalletSDK({
        appName: "Dustbuster.ai",
        appLogoUrl: "https://dustbuster-ui.vercel.app/favicon.ico",
        darkMode: true,
      });

      // This line uses the old v3 way — NO projectId needed, NO validation error
      const provider = sdk.makeWeb3Provider("https://mainnet.base.org", 8453);

      const accounts = await provider.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setConnected(true);
    } catch (err) {
      console.error(err);
      alert("Open Coinbase Wallet app and approve the connection");
    }
  };

  const vacuum = () => {
    confetti({
      particleCount: 250,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ff9500", "#ffb13b", "#ffd27a"],
    });
    alert("🧹 Vacuum complete! You're in the 4:20 draws.");
  };

  return (
    <div className="App">
      <header>
        <h1>🧹 Dustbuster.ai</h1>
        <p>Vacuum Base wallet dust → Win real money every 4:20</p>
      </header>

      {!connected ? (
        <button className="connect-btn" onClick={connect}>
          Connect Coinbase Wallet (Base)
        </button>
      ) : (
        <div className="connected">
          <p>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>

          <div className="dust-box">
            <h2>Found Dust (under 69¢)</h2>
            <button className="vacuum-btn" onClick={vacuum}>
              Vacuum Selected Dust
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
