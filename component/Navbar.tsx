import { TonConnectButton } from "@tonconnect/ui-react";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="">
      <div className="flex w-full justify-between">
        <h2>My App with React UI</h2>
        <div className="justify-end w-full">
          <TonConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
