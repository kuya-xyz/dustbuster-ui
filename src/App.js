import React, { useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import confetti from "canvas-confetti";
import "./App.css";

const PROJECT_ID = process.env.REACT_APP_COINBASE_WALLET_PROJECT_ID;

export default function App() {
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);

  const dustList = [
    { name: "Plume Dust", value: 3, checked: true },
    { name: "Moonshit Token", value: 8, checked: true },
    { name: "Dead Airdrop", value: 5, checked: true },
    { name: "Random Crap", value: 2, checked: false },
  ];

  const connect = async () => {
    if (!PROJECT_ID) {
      alert("Missing Project ID – check Vercel env var");
      return;
    }

    const sdk = new CoinbaseWalletSDK({
      appName: "Dustbuster.ai",
      appLogoUrl: "https://dustbuster-ui.vercel.app/favicon.ico",
      darkMode: true,
    });

    const provider = sdk.makeWeb3Provider("https://mainnet.base.org", 8453);

    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setConnected(true);
    } catch (e) {
      console.error(e);
      alert("Open Coinbase Wallet app and try again");
    }
  };

  const vacuum = () => {
    const total = dustList.filter((t) => t.checked).reduce((s, t) => s + t.value, 0);
    confetti({ particleCount: 220, spread: 90, origin: { y: 0.6 }, colors: ["#ff9500", "#ffb13b"] });
    alert(`Vacuumed ${total}¢ → ${total} Dust minted!\nYou're in 4:20 draws!`);
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
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>

          <div className="dust-box">
            <h2>Found Dust (under 69¢)</h2>
            {dustList.map((t, i) => (
              <label key={i} className="dust-item">
                <input type="checkbox" defaultChecked={t.checked} />
                {t.name} – {t.value}¢
              </label>
            ))}

            <button className="vacuum-btn" onClick={vacuum}>
              Vacuum Selected Dust
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
