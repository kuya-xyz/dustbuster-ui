import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export default function App() {
  const connect = () => {
    const sdk = new CoinbaseWalletSDK({
      appName: "Dustbuster.ai",
      appLogoUrl: "https://dustbuster-ui.vercel.app/favicon.ico",
    });
    const provider = sdk.makeWeb3Provider("https://mainnet.base.org", 8453);
    provider.request({ method: "eth_requestAccounts" });
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "200px", background: "#000", color: "#fff", minHeight: "100vh" }}>
      <h1>Dustbuster.ai</h1>
      <p>Vacuum Base wallet dust → Win real money every 4:20</p>
      <button
        onClick={connect}
        style={{
          background: "#ff9500",
          color: "#000",
          fontSize: "2rem",
          padding: "20px 40px",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        Connect Coinbase Wallet (Base)
      </button>
    </div>
  );
}
