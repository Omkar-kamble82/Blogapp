import Navbar from "../components/Navbar";
import { useState } from "react";

type Props = {}

const Blog = (props: Props) => {
    const [updatemode, setUpadatemode] = useState(false)
    return (
        <div className="min-h-[100vh] w-[100vw] bg-[#222831]">
            <Navbar />
            <div className="mt-[90px] mb-10 ml-[5vw] sm:ml-[10vw]">
                <img className="w-[90vw] h-[35vh] rounded-2xl sm:w-[80vw] sm:h-[45vh]" src="login.png" alt="" />
                {!updatemode && <h1 className="mt-4 text-4xl py-4 font-bold text-[#00ADB5]">This is a blog</h1>}
                {updatemode && <input className='mx-4 mb-3 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px] font-bold' placeholder='My first blog.....'/>}
                <div className="flex justify-between items-center">
                    <div>
                        <p className="mt-4 text-lg font-bold text-[#bababa]">Author: <span className="text-[#00ADB5]">Omkarsk82</span></p>
                        {!updatemode && <p className="mt-4 text-lg font-bold text-[#bababa]">Tags: <span className=" bg-[#00ADB5] px-3 rounded-3xl text-[#222831]">AI</span></p>}
                        {updatemode && <input className='mx-4 mb-3 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px] font-bold' placeholder='My first blog.....'/>}
                    </div>
                    <div className="mt-[-30px] sm:mr-[10vw]">
                        {!updatemode &&<button onClick={() => {setUpadatemode(true)}} className="px-4 py-1 m-2 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer mr-2">Update</button>}
                        {updatemode && <button onClick={() => {setUpadatemode(false)}} className="px-4 py-1 m-2 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer mr-2">Publish</button>}
                        <button className="px-4 py-1 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer">Delete</button>
                    </div>
                </div>
                {!updatemode && <p className="mt-6 text-justify font-bold text-[#4f5e68] sm:mr-[10vw]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>}
                {updatemode && <input className='mx-4 mb-3 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px] font-bold' placeholder='My first blog.....'/>}
            </div>
        </div>
    ) 
}

export default Blog;