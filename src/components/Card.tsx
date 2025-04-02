/* eslint-disable */

'use client';
import React,{useState} from "react";
import ViewMoreCard from "./ViewMoreCard";

interface CardProps  {
    title:string;
    Icon:React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description:string;
    id:number;
  }

export default function Card({title,Icon,description,id}:CardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
    return(
        <div className="flex flex-col justify-center space-y-4 items-center bg-white h-64 rounded-xl border  w-[80%] shadow-xl shadow-gray-500">
         <p className="font-bold">{title}</p>
         <div className=" w-16 flex items-center justify-center h-16 rounded-full border-[2px] border-black">
         <Icon className='w-20 h-10 text-[#2B83E9]'/>
         </div>
        <p className="bg-white max-w-[80%] line-clamp-2 h-[44px] whitespace-normal">{description}</p>
        <button className="bg-[#2B83E9] p-4 font-sans text-white rounded-2xl" onClick={openModal}>
        View More
         </button>
         <ViewMoreCard id={id} isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    );
  }