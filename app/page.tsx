"use client";
import CustomTonConnectButton from "@/component/ConnectButton";
import Navbar from "@/component/Navbar";
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TonWeb from "tonweb";

interface SendTransactionRequest {
  validUntil: number;
  messages: {
    address: string;
    amount: string; // The amount should be in nanoTONs as a string
    payload?: string; // Optional payload if you need to include additional data
  }[];
}

export default function Home() {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  const [tonConnectUI] = useTonConnectUI();

  const sendTransaction = async () => {
    if (!tonConnectUI.connected) {
      alert("Please connect your wallet first!");
      return;
    }

    const tonweb = new TonWeb();
    const amount = TonWeb.utils.toNano("0.01"); // Convert to string

    // Prepare the transaction payload
    const transactionPayload = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 1 minute from now
      messages: [
        {
          address: "UQCanfRSV1ERbDW6fNwDNuONTAb8sB3iLhef_LfBFPfLhnLn", // Replace with the actual recipient address
          amount: amount, // The amount in nanoTONs as a string
        },
      ],
    };

    try {
      const result = await tonConnectUI.sendTransaction(transactionPayload);
      console.log("Transaction result: ", result);
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const { state, open, close } = useTonConnectModal();

  return (
    <main className="">
      {/* <Navbar /> */}
      <CustomTonConnectButton />
      <div>
        <span>User-friendly address: {userFriendlyAddress}</span>
        <br />
        <span>Raw address: {rawAddress}</span>
      </div>

      <div>
        <button
          onClick={sendTransaction}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Pay 0.1 TON
        </button>
      </div>
    </main>
  );
}
