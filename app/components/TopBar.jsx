import React from "react";
import Image from "next/image";
import logo from "../utils/topbar/avatar.svg";

const TopBar = ({ title }) => {
  return (
    <div className="flex justify-between items-center bg-[#5599FF] h-[80px] text-white mb-[80px]">
      <h1 className="text-[24px] font-extrabold">{title}</h1>
      <Image src={logo} alt="My Image" width={40} />
    </div>
  );
};

export default TopBar;
