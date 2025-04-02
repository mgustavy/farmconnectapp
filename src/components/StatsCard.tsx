/* eslint-disable */

'use client';
import React,{useState} from "react";
import ViewMoreCard from "./ViewMoreCard";

interface CardProps  {
    stats?:number;
    description:string;
  }

export default function StatsCard({stats,description}:CardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return(
        <div className="flex flex-col justify-center space-y-4 items-center bg-white h-64 rounded-xl border  w-[80%] shadow-xl shadow-gray-500">
         <div className=" w-16 flex items-center justify-center h-16 rounded-full border-[2px] border-black">
         {stats}
         </div>
        <p className="bg-white max-w-[80%] line-clamp-2 h-[44px] whitespace-normal">{description}</p>
        </div>
    );
  }