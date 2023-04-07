import Navbar from "../components/Navbar";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

    const handledelete = async () => {
        const response = await fetch(import.meta.env.VITE_SERVER + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJmOTg3ZDQ3ODAzMjJmNzdlZDFjODQiLCJpYXQiOjE2ODA4NDA4MzAsImV4cCI6MTY4MTEwMDAzMH0.FoOr7mIUbdU7qdP09QQkuDyv-h4FLrmd3QWur_ZNGqc`
        }
        })
        const json = await response.json()
        navigate("/home")
    }

    const update = async () => {
        const tags = Tags.split(",")
        const blog = {...userblog,title,description,tags}
        const response = await fetch(import.meta.env.VITE_SERVER + id, {
            method: 'PATCH',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJmOTg3ZDQ3ODAzMjJmNzdlZDFjODQiLCJpYXQiOjE2ODA4NDA4MzAsImV4cCI6MTY4MTEwMDAzMH0.FoOr7mIUbdU7qdP09QQkuDyv-h4FLrmd3QWur_ZNGqc`,
            }
        })
        console.log("gkjkjjh")
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(import.meta.env.VITE_SERVER,{
                headers: {'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJmOTg3ZDQ3ODAzMjJmNzdlZDFjODQiLCJpYXQiOjE2ODA4NDA4MzAsImV4cCI6MTY4MTEwMDAzMH0.FoOr7mIUbdU7qdP09QQkuDyv-h4FLrmd3QWur_ZNGqc`
            },
            })
            const json = await response.json()
            const data = JSON.stringify(json)
            const blog = JSON.parse(data)
            blog.map((blog:Blog) => {
                if(blog._id === id) {
                    setUserblog(blog)
                }
            })
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
        <div className="min-h-[100vh] w-[100vw] bg-[#222831]">
            <Navbar />
            <div className="mt-[90px] mb-10 ml-[5vw] sm:ml-[10vw]">
                <img className="w-[90vw] h-[35vh] rounded-2xl sm:w-[80vw] sm:h-[45vh]" src={userblog?.url} alt="blog-img" />
                {updatemode && <p className="mt-4 text-2xl text-[#00ADB5] font-bold">Update the blog</p>}                {!updatemode && <h1 className="mt-4 text-4xl py-4 font-bold text-[#00ADB5]">{userblog?.title}</h1>}
                {updatemode && <div className="mt-4"><label className="text-[#bababa] font-bold text-xl">Title: </label><input  autoFocus type="text" defaultValue={userblog?.title} onChange={(e) => setTitle(e.target.value)} className='ml-4 mb-3 mt-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] border-2 border-[#424f58] w-[250px] sm:w-[450px] pl-4 h-[40px] font-bold'/></div>}
                <div className="ml-[-10px]">
                    {!updatemode &&<button onClick={() => {setUpadatemode(true)}} className="px-4 py-1 m-2 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer mr-2">Update</button>}
                    {updatemode && <button onClick={() => {update();setUpadatemode(false)}} className="px-4 py-1 m-2 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer mr-2">Publish</button>}
                    <button onClick={handledelete} className="px-4 py-1 rounded-xl bg-[#2e373d] text-[#00ADB5] cursor-pointer">Delete</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="mt-2 text-lg font-bold text-[#bababa]">Author: <span className="text-[#00ADB5]">{userblog?.user_name}</span></p>
                        {!updatemode && <p className="mt-4 text-lg font-bold text-[#bababa]">Tags: {userblog?.tags.map((t,i) => (<span className=" bg-[#00ADB5] px-3 mr-2 rounded-3xl text-[#222831]" key={i}>{t}</span>))}</p>}
                        {updatemode && <div className=""><label className="text-[#bababa] font-bold text-xl">Tags: </label><input defaultValue={tagsstring} onChange={(e) => setTitle(e.target.value)} className='ml-4 mb-3 mt-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] border-2 border-[#424f58] w-[250px] sm:w-[450px] pl-4 h-[40px] font-bold'/></div>}
                    </div>
                </div>
                {!updatemode && <p className="mt-6 mr-4 text-justify font-bold text-[#4f5e68] sm:mr-[10vw]">{userblog?.description}</p>}
                {updatemode && <div className=""><label className="text-[#bababa] font-bold text-xl">Blog: </label><input defaultValue={userblog?.description} onChange={(e) => setTitle(e.target.value)} className='ml-4 mb-3 mt-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] border-2 border-[#424f58] w-[250px] sm:w-[450px] pl-4 h-[40px] font-bold'/></div>}
            </div>
        </div>
    ) 
}

export default Blog;