/* eslint-disable */
'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MdAgriculture } from "react-icons/md";
import { useRouter } from 'next/navigation';
export default function Register(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        description:''
      });
     
      const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }; 

      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://advanced-agriculture-be-1.onrender.com/users/register', formData);
    
          if (response.data.status === 201) {
            console.log('Form submitted successfully:', response.data);
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('id',response.data.data.id)
            alert('User registered  successfully!');
            router.push('/dashboard')
          }
          else{
            console.log('data:', response.status);
            alert('Error ');
          }
        } catch (error:any) {
          console.error('Error submitting form:', error.response || error.message);
          alert('Failed to submit form.');
        }
      };



    return(
        <div className="flex justify-center items-center  w-full  h-screen">
                <div className="  sm:w-[30%] w-[90%] rounded-xl border-2 border-gray-200 flex flex-col  sm:h-[700px] h-full  flex justify-center items-center  ">
                <p className='font-bold text-4xl'> REGISTER PAGE </p>
                <div className="flex flex-row border border-[#2B83E9] ml-2 w-44 rounded-[20px]  mt-8 items-center mb-10">
                <MdAgriculture className="h-12 w-24"/>
                <p className="text-4xl  font-sans text-[#2B83E9]">F-C</p>
            </div>
                    <form onSubmit={handleSubmit}  className="flex flex-col justify-center items-center py-4 w-full space-y-8" >
                        <input type="text" name='name' value={formData.name} onChange={handleChange} className="h-10 w-[50%] pl-2  outline-none border-[1px] border-[#2B83E9] rounded-lg" placeholder="Full Names"/>
                        <input type="email" name='email' value={formData.email} onChange={handleChange} className="h-10 w-[50%] pl-2 outline-none  border-[1px] border-[#2B83E9] rounded-lg" placeholder="Email"/>
                        <input type="text" name='description' value={formData.description} onChange={handleChange} className="h-10 w-[50%] pl-2 outline-none  border-[1px] border-[#2B83E9] rounded-lg"  placeholder="Description"/>
                        <input type="password" name='password' value={formData.password} onChange={handleChange} className="h-10 w-[50%] pl-2  outline-none border-[1px] border-[#2B83E9] rounded-lg" placeholder="Password" />
                        <button type="submit" className=" bg-[#2B83E9] px-6 py-4 text-white rounded-xl">Register</button>
                    </form>
                    <div className=" flex flex-row space-x-2">
                       <p className="text-gray-500"> Already signed up ? </p> 
                       <Link href="/login" className='font-bold text-[#2B83E9]'> Sign In </Link>
                    </div>
                </div>
        </div>
    );
}