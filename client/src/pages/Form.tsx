import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { imagedata } from "../constant/data";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

const Form = () => {
    const navigate = useNavigate();
    const [fileuploadtype, setFileUploadType] = useState<number>(0)
    const [title,setTitle] = useState<String>("")
    const [Tags,setTags] = useState<String>("")
    const [description,setDescription] = useState<String>("")
    const [url,setImageurl] = useState<string>("")
    const [error,setError] = useState<String>("")
    const {user,setUser} = useContext(UserContext)

    const submit = async () => {
        const tags = Tags.split(",")
        const user_name = user.username
        const blog = {title, tags, url, description, user_name}
        const response = await fetch(import.meta.env.VITE_SERVER, {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError("")
            setTitle('')
            setTags('')
            setDescription('')
            setImageurl('')
            navigate("/home")
        }
    }

    return (
        <div className="bg-[#222831] relative min-h-[100vh]">
            <Navbar/>
            <div className="flex justify-center items-center w-[100vw] min-h-[100vh]">
                <div className='flex mt-[120px] mx-4 shadow-lg justify-center rounded-xl items-center max-w-[500px] flex-col my-10 overflow-hidden'>
                    {fileuploadtype === 3 && 
                                <div onClick={() => {setFileUploadType(0)}} className="inset-0 z-10 bg-black absolute">
                                <img onClick={() => {setFileUploadType(0)}} className="bg-white absolute right-0 mx-10 my-6 rounded-full p-2 h-[30px] sm:h-[40px]" src="/close.svg" alt="close-icon" />
                                <h1 className="text-center mt-20 mb-8 text-[#00ADB5] font-bold text-[35px] sm:text-[60px]">Gallery</h1>
                                <div className="mb-10 flex justify-evenly flex-wrap">
                                    {imagedata.map((image) => {
                                    return(
                                        <img onClick={() => {setImageurl(image.url);setFileUploadType(0)}} key={image.id} className="min-w-[200px] max-w-[270px] cursor-pointer m-2 scale-100 object-contain" src={image.url} alt="image"/>
                                        )
                                    })}
                                </div>
                                </div>                       
                                }
                        <div className='w-full bg-[#283035] flex justify-center flex-col'>
                        <h1 className='mt-4 mb-4 text-[#00ADB5] text-center text-4xl pb-6 font-bold'>Create a blog</h1>
                        
                            <label className="text-xl mx-5 mb-1 font-bold text-[#00ADB5] sm:text-2xl">Title </label>
                            <input onChange={(e) => setTitle(e.target.value)} className='mx-4 text-md mb-3 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px] font-bold' placeholder='My first blog.....'/>
                            <label className="text-xl mx-5 mb-1 font-bold text-[#00ADB5] sm:text-2xl">Tags </label>
                            <input onChange={(e) => setTags(e.target.value)} className='mx-4 text-md bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px] font-bold' placeholder='AI,Tech,Apple'/>
                            <p className="ml-5 text-gray-600 mb-4 font-bold text-[14px]">*seprate tags with a comma</p>
                            <label className="ml-5 text-xl font-bold text-[#00ADB5] sm:text-sm">Upload a relevent image </label>
                            <div className="ml-5 mb-1 mt-[5px]">
                                <button onClick={() => {setFileUploadType(2)}} className="text-sm rounded-xl min-w-[100px] mr-2 font-bold bg-[#222831] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4">URL</button>
                                <button onClick={() => {setFileUploadType(1)}} className="text-sm rounded-xl min-w-[100px] mr-2 font-bold bg-[#222831] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4">File</button>
                                <button onClick={() => {setFileUploadType(3)}} className="text-sm rounded-xl min-w-[100px] my-3 font-bold bg-[#222831] text-[#57676f] py-2 px-2 drop-shadow-md md:px-4 sm:m-2">Choose from gallary</button>
                            </div> 
                            <div className="mb-4">
                                {fileuploadtype === 1 && <input className='mx-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[60px] p-4' type="file" name="filename" />}
                                {fileuploadtype === 2 && <input onChange={(e) => {setImageurl(e.target.value)}} className='mx-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px] font-bold' placeholder='www.google.com'/>}
                            </div>  
                            {url !== "" ? <p className="text-[#05bd05] ml-6 mb-6">Image Uploaded</p> :<p className="text-[#c72931] font-semibold ml-6 mb-6">Image not uploaded</p>}                    
                            <label className="text-xl ml-4 font-bold text-[#00ADB5] sm:text-sm">Blog </label>
                            <textarea onChange={(e) => setDescription(e.target.value)} className='mx-4 text-md mt-2 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px] font-bold' placeholder="This is a blog...."/>
                            <button type="submit" onClick = {submit} className="mt-6 ml-4 mb-6 rounded-lg px-4 py-1 font-bold text-[#ffffff] bg-[#00ADB5] text-lg hover:duration-1000 hover:opacity-80 hover:text-white w-[100px]">Post</button>
                            {error && <div className="mt-2 font-bold mb-6 text-center text-[#c72931]">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
