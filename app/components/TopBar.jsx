import React from "react";
import Image from "next/image";
import logo from "../utils/topbar/avatar.svg";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center bg-[#5599FF] h-[80px] px-9 text-white">
      <h1 className="text-[24px] font-extrabold">Bilim AI</h1>
      <Image src={logo} alt="My Image" width={40} />
    </div>
  );
};

export default TopBar;
