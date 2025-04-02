/* eslint-disable */

'use client';
import { useState } from 'react';
import { GoProjectSymlink } from "react-icons/go";
import { MdAgriculture } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { BsHouse } from "react-icons/bs";
import Link from 'next/link';
interface SideBarProps {
    isVisible:boolean;

  }

export default function SideBar({isVisible}:SideBarProps) {
    const [isTrue, setTrue] = useState<boolean>(isVisible);
    const changeVisibility = () => setTrue(!isTrue);
    const isNotHidden = isTrue ? "visible" : "hidden"
    const width = isTrue ? "ml-2 w-44" : "mx-1 w-18 "
return(
    <div className="flex flex-col bg-white">
        <IoIosMenu className="text-[#2B83E9] h-12 w-24" onClick={changeVisibility}/>
        <aside className={`sm:block ${isNotHidden}  border-r pt-8 border-gray-200 space-y-4  bg-white h-screen flex flex-col` }>
            <div className={`flex flex-row border border-[#2B83E9]  ${width} rounded-[20px] items-center mb-10 `}>
                <MdAgriculture className="h-12 w-24"/>
                <p className={`text-4xl ${isNotHidden} font-sans text-[#2B83E9]`}>F-C</p>
            </div>
           <Card message="Home" linkAddress='/' Icon={BsHouse} isExpanded={isTrue}/>
           <Card message="Projects" linkAddress='/dashboard' Icon={GoProjectSymlink} isExpanded={isTrue}/>
           <Card message="Agreements" linkAddress='/agreements' Icon={TfiWrite} isExpanded={isTrue}/>
           <Card message="Users" linkAddress='/users' Icon={FaUsers} isExpanded={isTrue}/>
           <Card message="My Profile" linkAddress='/myprofile' Icon={CgProfile} isExpanded={isTrue}/>
        </aside>
    </div>
);
}
interface CardProps {
    message: string;
    Icon:React.ComponentType<React.SVGProps<SVGSVGElement>>;
    isExpanded:Boolean;
    linkAddress:string;

  }
  
const Card : React.FC<CardProps>=({message,Icon,isExpanded,linkAddress})=>{
    const isHidden = isExpanded ? "visible" : "hidden";
    const width = isExpanded ? "w-64" : "w-20"
    return(
        <Link href={linkAddress}>
        <div className={`flex flex-row justify-start items-center  ${width} hover:bg-[#2B83E9] cursor-pointer h-12 space-x-2 `}>
             <Icon className="h-6 w-10 text-[#2B83E9]"/>
            <p className={`font-sans ${isHidden} text-base`}> {message}</p>
           
        </div>
        </Link>
    )
}