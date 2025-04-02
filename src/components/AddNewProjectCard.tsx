/* eslint-disable */

'use client';
import { useState } from "react";
import { api } from "@/utils";
import { useRouter } from 'next/navigation';
interface AddNewProjectCardProps{
    isOpen : boolean;
  
    onClose:()=>void
  }
  type Milestone = {
    description: string;
    status: string;
  };
  
export default function AddNewProjectCard({isOpen,onClose}:AddNewProjectCardProps) {
    if (!isOpen) return null;
    const router = useRouter()
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'RESEARCH',
    milestones: [{ description: '', status: '' }]
  });
    const handleAddMilestone = () => {
    setFormData((prevState) => ({
      ...prevState,
      milestones: [...prevState.milestones, { description: '', status: '' }]
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === 'title' || name === 'description' || name === 'type') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    } else if (name === 'milestones' && index !== undefined) {
      const field = e.target.getAttribute('data-field') as keyof Milestone;
      if (field) {
        setFormData((prevState) => {
          const updatedMilestones = [...prevState.milestones];
          updatedMilestones[index][field] = value; 
          return { ...prevState, milestones: updatedMilestones };
        });
      }
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects/register', formData);
      console.log('Form submitted successfully:', response.data);
      if (response.data.status === 201) {
        alert('Project created  successfully!');
        router.push('/dashboard')
        onClose();
      }
      else{
        console.log('data:', response.status);
        alert('Error ');
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
                <p className='font-bold text-4xl'> New Project Registration</p>
                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center py-4 w-full space-y-8" >
                        <input type="text" required name="title" onChange={handleChange} className="h-10 w-[70%] pl-2 outline-none  border-[1px] border-[#2B83E9] rounded-lg" placeholder="Title"/>
                        <input type="text" required name="description" onChange={handleChange} className="h-10 w-[70%] pl-2  outline-none border-[1px] border-[#2B83E9] rounded-lg" placeholder="Description" /> 
                        <select name="type" onChange={handleChange} className=" h-10 w-[70%] pl-2  outline-none border-[1px] border-[#2B83E9] rounded-lg " required>
                          <option value="" disabled>Select project type</option>
                          <option value="RESEARCH">RESEARCH</option>
                          <option value="BUSSINESS">BUSINESS</option>
                          <option value="AGRICULTURE">AGRICULTURE</option>
                        </select>
                        <button className="bg-[#2B83E9] px-6 py-4 text-white  rounded-xl" onClick={handleAddMilestone}>
                        Add Milestone
                        </button>
                        {formData.milestones.map((milestone,index)=>(
                          <div className="w-[70%] mt-8" key={index}>
                         <input type="text" required  name='milestones' data-field='description' onChange={(e) => handleChange(e, index)} className="h-10 w-full pl-2 outline-none  border-[1px] border-[#2B83E9] rounded-lg" placeholder="Title"/>
                          <select name='milestones' data-field='status' value={milestone.status} onChange={(e) => handleChange(e, index)} className=" h-10 w-full pl-2  mt-8 outline-none border-[1px] border-[#2B83E9] rounded-lg " required>
                          <option value="" disabled>Select milestone status</option>
                          <option value="PENDING">PENDING</option>
                          <option value="CANCELLED">CANCELLED</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                          </div>
                        ))}
                        <button type="submit" className=" bg-[#2B83E9] px-6 py-4 text-white rounded-xl">Register</button>
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