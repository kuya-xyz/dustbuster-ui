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
      appLogoUrl: "https://dustbuster-ui.vercel.app/vacuum.png",
      darkMode: true,
    });

    const provider = sdk.makeWeb3Provider("https://mainnet.base.org", 8453);

    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setConnected(true);
    } catch (e) {
      alert("Open Coinbase Wallet app and approve the connection");
    }
  };

  const vacuum = () => {
    confetti({ particleCount: 250, spread: 100, origin: { y: 0.6 }, colors: ["#ff9500", "#ffb13b"] });
    alert("Vacuum complete! You're in the draw for real USDC.");
  };

  return (
    <div className="App">
      <header>
        <h1>
          <img src="https://dustbuster-ui.vercel.app/vacuum.png" alt="vacuum" className="logo" />
          dustbuster.ai
        </h1>
        <p>Vacuum your Base wallet dust to enter and win real USDC!</p>
      </header>

      {!connected ? (
        <button className="connect-btn" onClick={connect}>
          Connect Coinbase Wallet (Base)
        </button>
      ) : (
        <div className="connected">
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>

          <div className="dust-box">
            <h2>Found Dust (under $0.69)</h2>
            <button className="vacuum-btn" onClick={vacuum}>
              Vacuum Selected Dust
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
