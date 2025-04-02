/* eslint-disable */
'use client';
import SideBar from '@/components/Sidebar';
import { useState,useEffect } from 'react';
import Card from '@/components/Card';
import { TiBusinessCard } from "react-icons/ti";
import { MdAdd } from "react-icons/md";
import AddNewProjectCard from '@/components/AddNewProjectCard';
import { api } from '@/utils';

type DataType = {
    id: number;
    title: string;
    description:string;
  };

export default function dashboard() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [data, setData] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true)
            const response = await api.get('/projects/all');
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
                <Card
                  title={item.title}
                  key={index}
                  id = {item.id}
                  Icon={TiBusinessCard}
                  description={item.description}
                />
              ))}
            </>
          );
        
     } 
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return(
        <div className='flex sm:flex-row flex-col sm:space-y-0 space-y-8 w-full sm:h-screen h-auto bg-green-400'>
            <SideBar isVisible={true}/>
            <div className='flex flex-col bg-yellow-400 w-full'>
            <div className='  h-24 bg-white border-b-[1px] border-gray-300  flex flex-row justify-center items-center'>
                    <button className=' bg-[#2B83E9] rounded-xl pl-3 text-white flex flex-row justify-center items-center h-16 w-36' onClick={openModal}>New Project  <MdAdd className='text-white h-6 w-10 font-bold'/> </button>
                    <AddNewProjectCard isOpen={isModalOpen}  onClose={closeModal}/>
            </div>    
            <div className='grid sm:grid-cols-3 grid-cols-1 py-4 bg-blue-400 w-full justify-items-center overflow-y-auto gap-x-2 sm:gap-y-2 gap-y-4 bg-white h-full'>
             {displayData()}
            </div>
            </div>
        </div>
    );
  }