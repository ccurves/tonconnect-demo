// import { useTonConnectUI } from "@tonconnect/ui-react";
// import { useEffect, useState } from "react";

// export default function CustomTonConnectButton() {
//   const [tonConnectUI] = useTonConnectUI();
//   const [connected, setConnected] = useState(false);

//   useEffect(() => {
//     setConnected(tonConnectUI.connected);
//   }, [tonConnectUI.connected]);

//   const handleConnect = async () => {
//     if (!connected) {
//       await tonConnectUI.connectWallet();
//     } else {
//       // Reset the connection state (i.e., disconnect)
//       tonConnectUI.disconnect(); // Clears the connection data
//       setConnected(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleConnect}
//       className={`${
//         connected ? "bg-red-500" : "bg-blue-500"
//       } text-white p-2 rounded-md`}
//     >
//       {connected ? "Disconnect Wallet" : "Connect Wallet"}
//     </button>
//   );
// }

import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function CustomTonConnectButton() {
  const [tonConnectUI] = useTonConnectUI();
  const [showModal, setShowModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const userFriendlyAddress = useTonAddress();

  //   const currentWallet = tonConnectUI.wallet;
  //   const currentWalletInfo = tonConnectUI.walletInfo;
  const currentAccount = tonConnectUI.account;
  const status = tonConnectUI.connected;

  const [connected, setConnected] = useState(status);

  console.log(status, currentAccount);

  //   useEffect(() => {
  //     setConnected(tonConnectUI.connected);
  //     if (tonConnectUI.connected) {
  //       const accounts = tonConnectUI.wallet?.accounts;
  //       setWalletAddress(accounts?.[0]?.address || null);
  //     }
  //   }, [tonConnectUI.connected]);

  const handleConnect = async () => {
    if (!status) {
      await tonConnectUI.openModal();
    } else {
      setShowModal(true); // Show modal when already connected
    }
  };

  const handleDisconnect = () => {
    tonConnectUI.disconnect(); // Clear the connection
    setConnected(false);
    setShowModal(false);
  };

  const handleSwitchWallet = async () => {
    await tonConnectUI.disconnect();
    await tonConnectUI.openModal(); // Trigger wallet connection flow
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleConnect} className="custom-button px-2 py-2">
        {status ? userFriendlyAddress : "Connect Wallet"}
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-lg font-semibold">Wallet</h2>
        <p className="my-4">
          {walletAddress ? walletAddress : "Not connected"}
        </p>
        <button
          onClick={handleSwitchWallet}
          className="w-full bg-blue-500 text-white p-2 rounded-md my-2"
        >
          Connect different wallet
        </button>
        <button
          onClick={handleDisconnect}
          className="w-full bg-gray-200 text-gray-800 p-2 rounded-md"
        >
          Close
        </button>
      </Modal>
    </>
  );
}
