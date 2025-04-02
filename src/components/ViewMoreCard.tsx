/* eslint-disable */

'use client';
import { useState,useEffect } from 'react';
import { TiBusinessCard } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { MdOutlineAgriculture } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { MdOutlinePending } from "react-icons/md";
import { api } from '@/utils';
import SubmittAgreement from './SubmittAgreementCard';
interface ViewMoreCardProps  {
    isOpen : boolean;
    id:number;
    onClose:()=>void
  }
type MilestoneType = {
    status: string;
    description:string;
  }; 
type OwnerType = {
    name: string;
    email:string;
  }; 
type ProjectType = {
  title:string;
  description:string;
  type:string;
  status:string;
  created_at: string;
  milestones:number;
  milestones_achieved:number;
  project_milestones: MilestoneType[];
  owner:OwnerType;
}   
export default function ViewMoreCard({isOpen,id,onClose}:ViewMoreCardProps) {
    if (!isOpen) return null;
    
    const [data, setData] = useState<ProjectType>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true)
          const response = await api.get(`/projects/getById/${id}`);
          console.log("response:",response)
          if((response.data.status === 200)){
          setData(response.data.data);
          }
        } catch (err) {
          console.log("error:",err)
        }
        finally{
          setIsLoading(false)
        }
      };
  
      fetchData();
    }, []);
    const project = data?.type
    const displayImage = ()=>{
      if(project === "BUSSINESS"){
        return  <TiBusinessCard className="w-72 h-48 text-[#2B83E9]"/>
      }
      if(project === "RESEARCH"){
        return  <GiArchiveResearch className="w-72 h-48 text-[#2B83E9]"/>
      }
      if(project === "AGRICULTURE"){
        return  <MdOutlineAgriculture className="w-72 h-48 text-[#2B83E9]"/>
      }
    }
    const displayIcon = (status:string)=>{
      if(status === 'COMPLETED'){
        return <FaCheck className="w-8 h-6 text-green-400"/>
      }
      if(status === 'PENDING'){
        return <MdOutlinePending className="w-8 h-6 text-[orange]"/>
      }
      if(status === 'CANCELLED'){
        return <ImCross className="w-8 h-6 text-[red]"/>
      }
    }

    const openModal = () => setIsModalOpen(true);
    const closeForm = () => setIsModalOpen(false);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="sm:w-[60%] w-[90%] bg-white rounded-xl border-2 border-gray-200 flex flex-col overflow-y-auto  sm:h-[900px]  h-full  flex pt-12 items-start sm:px-40 px-2 ">
         
         <div className=" w-full flex-col flex items-center justify-center">
            {displayImage()}
            <p  className="text-5xl font-bold">{data?.title} </p>
            <p className="text-base text-gray-400 mt-4"> Initiated on {data?.created_at} </p>
         </div>

         <p className="my-8 text-justify">{data?.description}</p>
         <p className="font-bold text-4xl "> Owner Details </p>
          <div className=" w-full mt-6  border-[1px] border-b-[0px] space-y-8 py-10 rounded-xl border-gray-400 px-4  flex flex-col items-start ">
            <p className="flex flex-row sm:space-x-20 space-x-4"> <span className="text-gray-500">Name:</span>   <span className="text-gray-400">{data?.owner.name}</span></p>  
            <p className="flex flex-row sm:space-x-20 space-x-4"> <span className="text-gray-500">Email:</span>   <span className="text-gray-400">{data?.owner.email}</span></p>  
          </div>
          <p className="font-bold text-4xl mt-6 "> Milestones </p>
          <div className=" w-full mt-6  border-[1px] border-b-[0px] space-y-8 py-10 rounded-xl border-gray-400 px-4  flex flex-col items-start ">
              {
                data?.project_milestones.map((milestone,index)=>{
               return <li key={index} className="flex flex-row justify-center space-x-4"> {displayIcon(milestone.status)} <span>{milestone.description}</span> </li>
                })
              }
           </div>

           <button
            className="bg-green-500 mt-20 mb-4 text-white px-4 py-2 rounded "
            onClick={openModal}
          >
            Make Bid
          </button>
           <SubmittAgreement id={id} isOpen={isModalOpen} onClose={closeForm}/>
          <button
            className="bg-[#2B83E9] mt-20 mb-4 text-white px-4 py-2 rounded "
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
}