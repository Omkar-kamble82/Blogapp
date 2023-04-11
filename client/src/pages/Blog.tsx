import Navbar from "../components/Navbar";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";

interface Blog {
    _id:string
    title:string
    description:string
    tags:[String]
    url:string
    createdAt:string
    updatedAt:Number
    user_id:string
    user_name:string
}

const Blog = () => {
    let { id } = useParams();
    const [updatemode, setUpadatemode] = useState(false)
    const [title,setTitle] = useState<String>("")
    const [Tags,setTags] = useState<String>("")
    const [description,setDescription] = useState<String>("")
    const navigate = useNavigate();
    const[userblog,setUserblog] = useState<Blog>();
    const {user,setUser} = useContext(UserContext)
    const [loading,setLoading] = useState(true);
    let token:any
    let tokenid

    if(user?.token){
        token = jwt_decode(user?.token)
        tokenid = token._id
    }

    const handledelete = async () => {
        const response = await fetch(import.meta.env.VITE_SERVER + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
        })
        const json = await response.json()
        navigate("/home")
    }

    const update = async () => {
        let tags = Tags.split(",")
        if (userblog?.title !== title && title !== "") {
            userblog!.title = String(title)
        }
        if (userblog?.description !== description && description !== "") {
            userblog!.description = String(description)
        }
        if (JSON.stringify(userblog?.tags) !== JSON.stringify(tags) && tags.length !== 0 && tags[0] !== "") {
            for(let i = 0 ; userblog!.tags.length ; i++) {
                userblog!.tags.pop()
            }
            
            tags.map((tag) => {
                if(!userblog!.tags.includes(tag)) {
                    userblog!.tags.push(tag)
                }
            })
        }
        const blog = {...userblog}
        const response = await fetch(import.meta.env.VITE_SERVER + id, {
            method: 'PATCH',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        })
        if (response.ok) {
            setTitle('')
            setTags('')
            setDescription('')
            tags = []
        }
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(import.meta.env.VITE_SERVER,{
                headers: {'Authorization': `Bearer ${user.token}`
            },
            })
            const json = await response.json()
            const data = JSON.stringify(json)
            const blog = [JSON.parse(data)].map((blog:Blog) => {
                if(blog._id === id) {
                    setUserblog(blog)
                }
            })
            const timer = setTimeout(() => {
                setLoading(false)
            }, 2000);
            return () => clearTimeout(timer);
        }
        fetchWorkouts()
    }, [])

    let tagsstring = ""
    const tagsarray = userblog?.tags.map((tag) => {
        if(userblog?.tags.length === 1) {
            tagsstring = tag + ""
            return
        }
        tagsstring =  tag + "," + tagsstring
    })


    return (
        <div className="min-h-[100vh] w-[100vw] relative bg-[#222831]">
            {loading && <div className="absolute inset-0 bg-black/90 z-[11] flex justify-center items-center flex-col"><img className="h-[100px]" src="/loading.gif" alt="" /><p className="text-[#00ADB5] text-[14px]">*Post Loading.....</p></div>}
            <Navbar />
            <div className="mt-[90px] mb-10 ml-[5vw] sm:ml-[10vw]">
                <img className="w-[90vw] h-[35vh] object-cover rounded-2xl sm:w-[80vw] sm:h-[45vh]" src={userblog?.url} alt="blog-img" />
                {updatemode && <p className="mt-4 text-2xl text-[#00ADB5] font-bold">Update the blog</p>}               
                {!updatemode && <h1 className="mt-4 text-4xl py-4 font-bold text-[#00ADB5]">{userblog?.title}</h1>}
                {updatemode && <div className="mt-4"><label className="text-[#bababa] font-bold text-xl">Title: </label><input  autoFocus type="text" defaultValue={userblog?.title} onChange={(e) => setTitle(e.target.value)} className='ml-4 mb-3 mt-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] border-2 border-[#424f58] w-[250px] sm:w-[450px] pl-4 h-[40px] font-bold'/></div>}
                {tokenid === userblog?.user_id && <div className="ml-[-10px]">
                    {!updatemode &&<button onClick={() => {setUpadatemode(true)}} className="px-4 py-1 m-2 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer mr-2">Update</button>}
                    {updatemode && <button onClick={() => {update();setUpadatemode(false)}} className="px-4 py-1 m-2 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer mr-2">Publish</button>}
                    <button onClick={handledelete} className="px-4 py-1 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer">Delete</button>
                </div>}
                <div className="flex justify-between items-center">
                    <div>
                        <p className="mt-2 text-lg font-bold text-[#bababa]">Author: <span className="text-[#00ADB5]">{userblog?.user_name}</span></p>
                        {!updatemode && <p className="mt-4 text-lg font-bold text-[#bababa]">Tags: {userblog?.tags.map((t,i) => (<span className=" bg-[#00ADB5] px-3 mr-2 rounded-3xl text-[#222831]" key={i}>{t}</span>))}</p>}
                        {updatemode && <div className=""><label className="text-[#bababa] font-bold text-xl">Tags: </label><input defaultValue={tagsstring} onChange={(e) => setTags(e.target.value)} className='ml-4 mb-3 mt-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] border-2 border-[#424f58] w-[250px] sm:w-[450px] pl-4 h-[40px] font-bold'/></div>}
                    </div>
                </div>
                {!updatemode && <p className="mt-6 mr-4 text-justify font-bold text-[#4f5e68] sm:mr-[10vw]">{userblog?.description}</p>}
                {updatemode && <div className=""><label className="text-[#bababa] font-bold text-xl">Blog: </label><input defaultValue={userblog?.description} onChange={(e) => setDescription(e.target.value)} className='ml-4 mb-3 mt-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] border-2 border-[#424f58] w-[250px] sm:w-[450px] pl-4 h-[40px] font-bold'/></div>}
            </div>
        </div>
    ) 
}

export default Blog;
