/* eslint-disable */
'use client';
import SideBar from '@/components/Sidebar';
import StatsCard from '@/components/StatsCard';
import { useState,useEffect } from 'react';
import { api } from '@/utils';

type projectType = {
    id:number;
    title:string;
    type:string;
    status:string;
    milestones:number;
    milestones_achieved:number;
}
type dataType = {
    project:projectType [];
    pendingStats: number;
    completedStats: number;
    cancelledStats: number;
}

export default function MyProfile() {
    const [data, setData] = useState<dataType>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true)
            const response = await api.get("/projects/stats");
            console.log("response:",response.data)
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
      const showProjects = (data?.project || []).length > 0;
      const hideHeader = showProjects ? '':'hidden';
      const changeStatus = async (status:string,id:number)=>{
        await api.put(`/projects/changeStatus/${id}/${status}`);
      }
      const displayProjects = ()=>{
        if(!showProjects){
            return <p className='text-black'> No projects yet</p>
        }
        else{
            return (
             
                <>
                  {data?.project.map((item, index) => (
                  <div key={index} className='flex w-full p-8 mt-4 space-x-8  flex-row rounded-xl overflow-x-auto border-[1px] border-gray-300 items-center'>
                  <p className='text-base  w-[170px] sm:truncate'>{item.title} </p>
                  <p className='text-base w-[200px] sm:truncate'>{item.type}</p>
                  <p className={`text-base w-[200px] ${colorToShow(item.status)} sm:truncate`}>{item.status}</p>
                  <p className='text-base w-[170px] sm:truncate'>{item.milestones}</p>
                  <p className='text-base w-[170px] sm:truncate'>{item.milestones_achieved}</p>
                  {
                    item.status === 'PENDING' &&(
                      <div className='w-[240px] flex flex-row justify-between'>
                           <button
            className="bg-green-500 text-white py-2 px-4  rounded "
            onClick={()=>{changeStatus('COMPLETED',item.id)}}
          >
            Complete 
          </button>

          <button
            className="bg-[#2B83E9]  text-white py-2 px-4  rounded "
            onClick={()=>{changeStatus('CANCELLED',item.id)}}
          >
            Cancel
          </button>
                      </div>
                    )
                  }
                  </div>
        ))}
                </>
              );
        }
      }
      const colorToShow = (type:string)=>{
            if(type === 'COMPLETED'){
                return 'text-green-400'
            }
            if(type === 'PENDING'){
                 return 'text-[orange]'
            }
            if(type === 'CANCELLED'){
                return 'text-[red]'
           }
      }
    return(
        <div className='flex sm:flex-row flex-col sm:space-y-0 space-y-8 w-full sm:h-screen h-auto '>
            <SideBar isVisible={true}/>
            <div className='flex flex-col  w-full'>   
            <div className='grid  sm:grid-cols-3 grid-cols-1 py-4 bg-blue-400 w-full justify-items-center gap-x-2 sm:gap-y-2 gap-y-4 bg-white h-auto'>
                <StatsCard stats={data?.cancelledStats}  description='CANCELLED PROJECTS'/>
                <StatsCard stats={data?.completedStats}  description='COMPLETED PROJECTS'/>
                <StatsCard stats={data?.pendingStats}  description='PENDING PROJECTS'/>
            </div>
            <p className='font-bold text-4xl mb-6 mt-20 sm:px-20 px-2'> My Projects </p>
           <div className='flex flex-col  w-full h-full sm:px-20 px-2 pb-20 overflow-y-auto'>
            <div className={`flex w-full  p-8 ${hideHeader} space-x-8 border-[1px] overflow-x-auto border-gray-200 text-gray-400 rounded-xl flex-row items-center`}>
            <p className='font-bold text-2xl w-[170px]'>Name</p>
            <p className='font-bold text-2xl w-[200px]'>Type</p>
            <p className='font-bold text-2xl w-[200px]'>Status</p>
            <p className='font-bold text-2xl w-[170px]'>Milestones</p>
            <p className='font-bold text-2xl w-[170px]'>Milestones Achieved</p>
            </div>
            {displayProjects()}
           </div>
            </div>
        </div>
    );
  }