/* eslint-disable */

'use client';
import { useState,useEffect } from 'react';
import { MdOutlineAssignment } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { api } from '@/utils';
interface ViewMoreCardProps  {
    isOpen : boolean;
    id:number;
    onClose:()=>void
  }
  type pointType = {
    description:string;
  }

  type projectType = {
    title:string;
    type:string;
    status:string;
    milestones:number;
    milestones_achieved:number;
  }
  type AgreementType = {
    id:number;
    title:string;
    description:string;
    created_at:string;
    status:string;
    project_owner_id:number;
    project:projectType;
    agreement_points:pointType[];
  }

export default function ViewMoreAgreementCard({isOpen,id,onClose}:ViewMoreCardProps) {

    if (!isOpen) return null;
    const displayImage = ()=>{
        return  <MdOutlineAssignment className="w-72 h-48 text-[#2B83E9]"/>  
    }
    const [data, setData] = useState<AgreementType>();
    const [isLoading, setIsLoading] = useState(true);
    const ownerid =  Number(localStorage.getItem('id'))
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true)
          const response = await api.get(`/agreements/byId/${id}`);
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
    const isAcceptedShown = ((ownerid===data?.project_owner_id) && (data.status==='PENDING'))
    const showDiv = isAcceptedShown ? '' : 'hidden'
    const changeStatus = async (status:string) =>{
      const response = await api.put(`/agreements/changeStatus/${id}/${status}`);
      onClose()
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="sm:w-[60%] w-[90%] bg-white rounded-xl border-2 border-gray-200 flex flex-col overflow-y-auto  sm:h-[900px]  h-full  flex pt-12 items-start sm:px-40 px-2 ">
         
         <div className=" w-full flex-col flex items-center justify-center">
            {displayImage()}
            <p  className="text-5xl font-bold">{data?.title} </p>
            <p className="text-base text-gray-400 mt-4"> Initiated on {data?.created_at} </p>
         </div>

         <p className="my-8 text-justify">{data?.description}</p>
         <p className="font-bold text-4xl "> Project Details </p>
          <div className=" w-full mt-6  border-[1px] border-b-[0px] space-y-8 py-10 rounded-xl border-gray-400 px-4  flex flex-col items-start ">
            <p className="flex flex-row sm:space-x-10 space-x-4"> <span className="text-gray-500">Name:</span>   <span className="text-gray-400">{data?.project.title}</span></p>  
            <p className="flex flex-row sm:space-x-10 space-x-4"> <span className="text-gray-500">Type:</span>   <span className="text-gray-400">{data?.project.type}</span></p>  
            <p className="flex flex-row sm:space-x-10 space-x-4"> <span className="text-gray-500">Status:</span>   <span className="text-gray-400">{data?.project.status}</span></p>  
            <p className="flex flex-row sm:space-x-10 space-x-4"> <span className="text-gray-500">Milestones</span>   <span className="text-gray-400">{data?.project.milestones}</span></p>  
            <p className="flex flex-row sm:space-x-10 space-x-4"> <span className="text-gray-500">Milestones achieved:</span>   <span className="text-gray-400">{data?.project.milestones_achieved}</span></p>  
          </div>
          <p className="font-bold text-4xl mt-6 "> Agreement Points </p>
          <div className=" w-full mt-6  border-[1px] border-b-[0px] space-y-8 py-10 rounded-xl border-gray-400 px-4  flex flex-col items-start ">
          {
            data?.agreement_points.map((point,index)=>{
              return <li key={index} className="flex flex-row justify-center space-x-4"> <FaCheck className="w-8 h-6 text-green-400"/> <span>{point.description}</span> </li>
              })
          }
         
           </div>

           <div className={`w-full ${showDiv} flex flex-row px-2 justify-between items-center mt-10 py-6`}>
           <button
            className="bg-green-500 mt-20 mb-4 text-white px-4 py-2 rounded "
            onClick={()=>{changeStatus('ACCEPTED')}}
          >
            Accept 
          </button>

          <button
            className="bg-[#2B83E9] mt-20 mb-4 text-white px-4 py-2 rounded "
            onClick={()=>{changeStatus('REJECTED')}}
          >
            Reject
          </button>

            </div> 

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