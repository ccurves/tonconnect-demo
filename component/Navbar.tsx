import { TonConnectButton } from "@tonconnect/ui-react";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="">
      <div className="flex w-full justify-between px-2">
        <h2>My App with React UI</h2>

        <TonConnectButton
          className="custom-button"
          style={{ float: "right" }}
        />
      </div>
    </header>
  );
};

export default Navbar;
