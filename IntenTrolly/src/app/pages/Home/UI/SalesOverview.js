import React from "react";
import Card from "@/app/components/Card";
import { BsGraphUpArrow } from "react-icons/bs";

const SalesOverview = () => {
  return (
    <div className="flex flex-row justify-around items-center bg-white p-5 rounded-2xl shadow-md w-full h-full gap-5">
      <Card
        Card_Title="Monthly Sales"
        Icon={<BsGraphUpArrow size={50} />}
        Card_Content="$100k"
      />
      <Card
        Card_Title="Quarterly Sales"
        Icon={<BsGraphUpArrow size={50} />}
        Card_Content="$500k"
      />
    </div>
  );
};

export default SalesOverview;
