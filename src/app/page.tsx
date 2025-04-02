import Image from 'next/image';
import { PiShareNetworkThin } from "react-icons/pi";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";
import { LiaFileContractSolid } from "react-icons/lia";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white w-full h-screen">
      <nav className=" flex items-center bg-[#2B83E9]  justify-center h-[10%] rounded-xl ml-4 mr-4">
        <ul className="flex font-sans flex-row sm:space-x-44 space-x-4 text-lg text-white">
          <li> <a href="">Home</a></li>
          <li> <Link href="">Contact Us</Link></li>
          <li> <Link href="/login">Log In</Link></li>
        </ul>
      </nav>
      <div className="mx-[8%]  flex sm:flex-row flex-col mt-8">
          <div className=" sm:w-[50%] w-full sm:pr-6 pr-0 flex flex-col ">
            <p className="text-4xl text-black  font-sans font-bold">Improve Your Productivity</p> 
            <p className="mt-2 text-3xl text-[#2B83E9] font-sans font-bold">Connect With Partners</p>
            <p className="mt-8 text-[#666666] text-justify	">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
         <Link href="/register">
          <button className='w-44 h-16 bg-[#2B83E9] text-white text-sans mt-12 rounded-2xl'>
            Join
          </button>
          </Link>
          </div>
          <div className="sm:w-[50%] w-full  h-[400px] relative">
          <Image
            src="/countryside.png"
            alt="home Image"
            layout="fill"
            objectFit="cover"
            
      />
          </div>
      </div>
      <div className='sm:mt-32 mt-4 justify-between mx-[8%] flex sm:flex-row flex-col'>

        <div className='sm:w-[20%]  w-full mt-4 pb-4 px-2  space-y-4  flex flex-col justify-start'>
          <p className='w-full text-base font-sans font-bold text-justify'>
            Connect with strong partners and improve your productivity
          </p>
          <div className=' w-full  h-[180px] flex flex-col justify-center items-center rounded-[30px] border-[1px] border-[#2B83E9] '>
            <PiShareNetworkThin className='h-24 w-28 text-sm text-[#2B83E9]'/>
            <p className='text-base font-sans font-bold'>Connect With Partners</p>
          </div>
        </div>

        <div className='sm:w-[25%] w-full pb-4 px-2  space-y-4  flex flex-col items-center justify-center'>
          <p className='w-[80%] text-base font-sans font-bold text-justify'>
            ShowCase your project and products and attract investors to work with you
          </p>
          <div className=' w-full  h-[200px] flex flex-col justify-center items-center rounded-[30px] bg-[#2B83E9] border-[1px] border-[#2B83E9]'>
            <HiOutlinePresentationChartLine className='h-24 w-28 text-sm text-white'/>
            <p className='text-base text-white font-sans font-bold'>ShowCase your products</p>
          </div>
        </div>
        <div className='sm:w-[20%] w-full mt-4 pb-4 px-2  space-y-4  flex flex-col justify-start'>
          <p className='w-full text-base font-sans font-bold text-justify'>
            Make Agreements with partners to keep collaborating on  projects
          </p>
          <div className=' w-full  h-[180px] flex flex-col justify-center items-center rounded-[30px] border-[1px] border-[#2B83E9] '>
            <LiaFileContractSolid className='h-24 w-28 text-sm text-[#2B83E9]'/>
            <p className='text-base font-sans font-bold'>Agreement With Partners</p>
          </div>
        </div>
      </div>
    </div>
  );
}
