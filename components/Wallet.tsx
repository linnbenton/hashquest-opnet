"use client"

import { useState, useEffect } from "react"
import { Contract, formatUnits } from "ethers"

const ORANGE_PILL_ADDRESS =
  "0xb09fc29c112af8293539477e23d8df1d3126639642767d707277131352040cbb"

export default function Wallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [xp, setXP] = useState<number>(0)
  const [opnet, setOpnet] = useState<any>(null)

  // set opnet only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOpnet((window as any).opnet)
    }
  }, [])

  const connectWallet = async () => {
    if (!opnet) {
      alert("OPNET Wallet not detected!")
      return
    }

    try {
      const accounts = await opnet.connect?.()
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0])
        fetchBalance(accounts[0])
      } else {
        alert(
          "No accounts returned. Make sure OPNET Wallet is unlocked and localhost is allowed."
        )
      }
    } catch (err) {
      console.error("Wallet connect error:", err)
    }
  }

  const fetchBalance = async (userAccount: string) => {
    if (!opnet?.web3) return

    try {
      const provider = new opnet.web3.providers.Web3Provider(
        opnet.web3.currentProvider
      )

      const erc20 = new Contract(
        ORANGE_PILL_ADDRESS,
        [
          "function balanceOf(address owner) view returns (uint256)",
          "function decimals() view returns (uint8)",
        ],
        provider
      )

      const rawBalance = await erc20.balanceOf(userAccount)
      const decimals = await erc20.decimals()
      setBalance(formatUnits(rawBalance, decimals))
    } catch (err) {
      console.error("Fetch balance error:", err)
    }
  }

  const rewardPlayer = (amount: number) => {
    if (!account) {
      alert("Connect wallet first!")
      return
    }
    setXP((prev) => prev + amount)
    console.log(`Rewarded ${amount} ORP + XP to ${account}`)
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        onClick={connectWallet}
        className="px-6 py-3 bg-orange-500 rounded hover:bg-orange-600 mb-3"
      >
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect OPNET Wallet"}
      </button>

      {account && (
        <div className="mt-2 text-center">
          <p>Balance: {balance ?? "loading..."} ORP</p>
          <p>XP: {xp}</p>

          <button
            onClick={() => rewardPlayer(10)}
            className="mt-2 px-4 py-2 bg-green-500 rounded hover:bg-green-600"
          >
            Reward 10 ORP + XP
          </button>
        </div>
      )}
    </div>
  )
}