import React, { useState } from "react";
import { ethers } from "ethers";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);
  const [dustList, setDustList] = useState([
    { name: "Plume Dust", value: 3, checked: true },
    { name: "Moonshit Token", value: 8, checked: true },
    { name: "Dead Airdrop", value: 5, checked: true },
    { name: "Random Crap", value: 2, checked: false },
  ]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    setAccount(addr);
    setConnected(true);
  };

  const vacuum = () => {
    const totalCents = dustList
      .filter((t) => t.checked)
      .reduce((sum, t) => sum + t.value, 0);

    // Confetti explosion
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff9500", "#ffb13b", "#ffd27a"],
    });

    alert(
      `🧹 Vacuumed ${totalCents}¢ → ${totalCents} Dust minted!\n\nYou're in the Tuesday & Friday 4:20 draw.\nMinimum win: $6.90 → next level $69 → $690 → $6,900…`
    );
  };

  return (
    <div className="App">
      <header>
        <h1>🧹 Dustbuster.ai</h1>
        <p>Vacuum your Base wallet dust → Win real money every 4:20</p>
      </header>

      {!connected ? (
        <button className="connect-btn" onClick={connectWallet}>
          Connect Wallet (Base)
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
              Total selected:{" "}
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

          <div className="leaderboard">
            <h3>Top Dusters This Week</h3>
            <ol>
              <li>0x69...DustLord – 69 Dust</li>
              <li>0x42...VacKing – 68 Dust</li>
              <li>0xAB...DogeFan – 65 Dust</li>
            </ol>
          </div>

          <footer>
            Next draw: Tuesday & Friday 4:20 PM • Minimum $6.90 • Pool → $69 → $690 → $6,900
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
