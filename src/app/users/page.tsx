'use client';
import { useState,useEffect } from 'react';
import SideBar from '@/components/Sidebar';
import { FaUserCircle } from "react-icons/fa";
import UserCard from '@/components/UserCard';
import { api } from '@/utils';
type userType = {
    name: string;
    email:string;
    description:string;
  };
export default function Users() {
    const [data, setData] = useState<userType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true)
            const response = await api.get('/users/');
            console.log("response:",response)
            if(response.data.status === 200){
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
     const displayData = () =>{
        if(isLoading===true){
            return <p className='text-black'> Loading Data</p>
        }
        if(data === null || data.length === 0){
            return <p className='text-black'>No data</p>
        }
        
        return (
            <>
              {data.map((item, index) => (
                <UserCard
                  title={item.name}
                  key={index}
                  Icon={FaUserCircle}
                  description={item.description}
                  email={item.email}
                />
              ))}
            </>
          );
        
     } 

    return(
        <div className='flex sm:flex-row flex-col sm:space-y-0 space-y-8 w-full sm:h-screen h-auto bg-green-400'>
            <SideBar isVisible={true}/>
            <div className='flex flex-col bg-yellow-400 w-full'>
            <div className='  h-24 bg-white border-b-[1px] border-gray-300  flex flex-row justify-center items-center'>
            </div>    
            <div className='grid  sm:grid-cols-3 grid-cols-1 py-4 bg-blue-400 w-full justify-items-center overflow-y-auto gap-x-2 sm:gap-y-2 gap-y-4 bg-white h-full'>
            {displayData()}   
             </div>
            </div>
        </div>
    );
  }