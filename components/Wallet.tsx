// components/Wallet.tsx
import { useState, useEffect } from "react";
import { BrowserProvider, Contract, formatUnits } from "ethers";

const ORANGE_PILL_ADDRESS = "0xb09fc29c112af8293539477e23d8df1d3126639642767d707277131352040cbb";

declare global {
  interface Window {
    opnet?: any;
  }
}

export default function WalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  // Connect wallet with safe fallback
  const connectWallet = async () => {
    if (!window.opnet) {
      alert("OPNET Wallet not detected! Please install and unlock your wallet.");
      return;
    }

    try {
      const accounts = await window.opnet.connect?.();

      if (!accounts || accounts.length === 0) {
        alert(
          "No accounts returned. Make sure your OPNET Wallet is unlocked and localhost is allowed."
        );
        return;
      }

      setAccount(accounts[0]);
      fetchBalance(accounts[0]);
    } catch (err) {
      console.error("Wallet connect error:", err);
      alert("Error connecting wallet: " + err);
    }
  };

  // Fetch ORP token balance
  const fetchBalance = async (userAccount: string) => {
    try {
      if (!window.opnet?.web3) return;

      const provider = new BrowserProvider(window.opnet.web3.currentProvider);
      const erc20 = new Contract(
        ORANGE_PILL_ADDRESS,
        [
          "function balanceOf(address owner) view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        provider
      );

      const rawBalance = await erc20.balanceOf(userAccount);
      const decimals = await erc20.decimals();
      setBalance(formatUnits(rawBalance, decimals));
    } catch (err) {
      console.error("Fetch balance error:", err);
    }
  };

  useEffect(() => {
    if (account) fetchBalance(account);
  }, [account]);

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        onClick={connectWallet}
        className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
      >
        {account
          ? "Connected: " + account.slice(0, 6) + "..." + account.slice(-4)
          : "Connect Wallet"}
      </button>

      {account && (
        <p className="mt-2 text-white">
          Balance: {balance ?? "loading..."} ORP
        </p>
      )}
    </div>
  );
}