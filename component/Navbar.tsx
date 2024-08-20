import { TonConnectButton } from "@tonconnect/ui-react";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="flex justify-between">
      <h2>My App with React UI</h2>
      <TonConnectButton />
    </header>
  );
};

export default Navbar;
