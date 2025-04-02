/* eslint-disable */
'use client';
import { useState } from "react";
import { api } from "@/utils";
import { useRouter } from 'next/navigation';
interface AddNewProjectCardProps{
    isOpen : boolean;
    id:number;
    onClose:()=>void
  }
  type point = {
    description: string;
  };
  
  type FormData = {
    title: string;
    description: string;
    points: point[];
  };
export default function SubmittAgreement({isOpen,id,onClose}:AddNewProjectCardProps) {
    if (!isOpen) return null;
    const router = useRouter()
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: [{ description: ''}]
  });
    const handleAddPoints = () => {
    setFormData((prevState) => ({
      ...prevState,
      points: [...prevState.points, { description: ''}]
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === 'title' || name === 'description') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    } else if (name === 'points' && index !== undefined) {
      const field = e.target.getAttribute('data-field') as keyof point;
      if (field) {
        setFormData((prevState) => {
          const updatedPoints = [...prevState.points];
          updatedPoints[index][field] = value; 
          return { ...prevState, points: updatedPoints };
        });
      }
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await api.post(`/agreements/register/${id}`, formData);
      console.log('Form submitted successfully:', response.data);
      if (response.data.status === 201) {
        alert(response.data.message);
        onClose();
      }
      else{
        alert(response.data.message)
      }
    } catch (error:any) {
      console.error('Error submitting form:', error.response || error.message);
      alert('Failed to submit form.');
    }
    // console.log('form :',formData)
  };


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
           <div className="  sm:w-[30%] w-[90%] bg-white rounded-xl border-2 border-gray-200 flex flex-col overflow-y-auto  sm:h-[900px]  h-full  flex pt-20 items-center  ">
                <p className='font-bold text-4xl'> Make Bid</p>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center py-4 w-full space-y-8" >
                        <input type="text" required name="title" onChange={handleChange} className="h-10 w-[70%] pl-2 outline-none  border-[1px] border-[#2B83E9] rounded-lg" placeholder="Title"/>
                        <input type="text" required name="description" onChange={handleChange} className="h-10 w-[70%] pl-2  outline-none border-[1px] border-[#2B83E9] rounded-lg" placeholder="Description" /> 
                        <button className="bg-[#2B83E9] px-6 py-4 text-white  rounded-xl" onClick={handleAddPoints}>
                        Add Agreement Point
                        </button>
                        {formData.points.map((milestone,index)=>(
                          <div className="w-[70%] mt-8" key={index}>
                         <input type="text" required  name='points' data-field='description' onChange={(e) => handleChange(e, index)} className="h-10 w-full pl-2 outline-none  border-[1px] border-[#2B83E9] rounded-lg" placeholder="Description"/>
                          </div>
                        ))}
                        <button type="submit" className=" bg-[#2B83E9] px-6 py-4 text-white rounded-xl">Submit</button>
                    </form>
                    <button
            className="bg-[#2B83E9] text-white mt-20 px-4 py-2 rounded "
            onClick={onClose}
          >
            Close
          </button>
                </div>
        
      </div>
    );
}