import React from "react";
import Image from "next/image";
import logo from "../app/utils/topbar/burger.svg";

const TopBar = ({ title }) => {
  return (
    <div className="flex justify-between items-center h-[80px] mb-[80px]">
      <h1 className="text-[24px] font-extrabold">{title}</h1>
      <Image src={logo} alt="My Image" width={40} />
    </div>
  );
};

export default TopBar;
