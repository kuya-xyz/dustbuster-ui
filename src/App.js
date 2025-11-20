import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import confetti from "canvas-confetti";
import "./App.css";

export default function App() {
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);

  const [dustList, setDustList] = useState([
    { name: "Plume Dust", value: 3, checked: true },
    { name: "Moonshit Token", value: 8, checked: true },
    { name: "Dead Airdrop", value: 5, checked: true },
    { name: "Random Crap", value: 2, checked: false },
  ]);

  // Initialize Coinbase Wallet SDK
  useEffect(() => {
    const sdk = new CoinbaseWalletSDK({
      appName: "Dustbuster.ai",
      appLogoUrl: "https://dustbuster-ui.vercel.app/favicon.ico",
      darkMode: true,
    });

    const cbProvider = sdk.makeWeb3Provider(
      "https://mainnet.base.org", // Base RPC
      8453 // Base chain ID
    );

    setProvider(cbProvider);
  }, []);

  const connectWallet = async () => {
    if (!provider) return alert("Wallet still loading…");

    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setConnected(true);
    } catch (err) {
      console.error(err);
      alert("Connection rejected or failed");
    }
  };

  const vacuum = () => {
    const totalCents = dustList
      .filter((t) => t.checked)
      .reduce((sum, t) => sum + t.value, 0);

    if (totalCents === 0) return alert("Check some dust first!");

    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff9500", "#ffb13b", "#ffd27a"],
    });

    alert(
      `Vacuumed ${totalCents}¢ → ${totalCents} Dust minted!\n\nYou're in Tuesday & Friday 4:20 draws.\nMinimum win $6.90 → $69 → $690 → $6,900…`
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Dustbuster.ai</h1>
        <p>Vacuum Base wallet dust → Win real money every 4:20</p>
      </header>

      {!connected ? (
        <button className="connect-btn" onClick={connectWallet}>
          Connect Coinbase Wallet (Base)
        </button>
      ) : (
        <div className="connected">
          <p>
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>

          <div className="dust-box">
            <h2>Found Dust (under 69¢)</h2>
            {dustList.map((token, i) => (
              <label key={i} className="dust-item">
                <input
                  type="checkbox"
                  checked={token.checked}
                  onChange={(e) => {
                    const newList = [...dustList];
                    newList[i].checked = e.target.checked;
                    setDustList(newList);
                  }}
                />
                {token.name} – {token.value}¢
              </label>
            ))}

            <p className="total">
              Selected:{" "}
              {dustList
                .filter((t) => t.checked)
                .reduce((sum, t) => sum + t.value, 0)}
              ¢ →{" "}
              {dustList
                .filter((t) => t.checked)
                .reduce((sum, t) => sum + t.value, 0)}{" "}
              Dust tickets
            </p>

            <button className="vacuum-btn" onClick={vacuum}>
              Vacuum Selected Dust
            </button>
          </div>

          <footer>
            Next draw: Tuesday & Friday 4:20 PM • Pool → $69 → $690 → $6,900
          </footer>
        </div>
      )}
    </div>
  );
}
