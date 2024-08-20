"use client";
import Navbar from "@/component/Navbar";
import { useTonAddress } from "@tonconnect/ui-react";
import Image from "next/image";

export default function Home() {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  return (
    <main className="">
      <Navbar />

      <div>
        <span>User-friendly address: {userFriendlyAddress}</span>
        <span>Raw address: {rawAddress}</span>
      </div>
    </main>
  );
}
