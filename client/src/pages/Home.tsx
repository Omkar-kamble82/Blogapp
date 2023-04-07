import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

interface blog {
    _id:Number
    title:string
    description:String
    tags:[String]
    url:string
    createdAt:string
    updatedAt:Number
}

const Home = () => {

    const [items, setItems] = useState<blog[]>()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(import.meta.env.VITE_SERVER,{
                headers: {'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJmOTg3ZDQ3ODAzMjJmNzdlZDFjODQiLCJpYXQiOjE2ODA4NDU0MjcsImV4cCI6MTY4MTEwNDYyN30.-kCCdtaYhYp0MLxRUZcNa4184kCB3NtJJP4SKyZ5aY8`},
            })
            const json = await response.json()
            const data = JSON.stringify(json)
            const blog = JSON.parse(data)
            setItems(blog)
            if (response.ok) {
            }
        }
        fetchWorkouts()
    }, [])

    return (
        <div className="min-h-screen w-screen bg-[#222831]">
            <Navbar/>
            <div className="mt-20 md:mt-32 flex justify-center items-center flex-col">
                {items?.map((item:blog,i) => {
                        return(
                            <Link key={i} to={`/${item._id}`}><div key={i} className="flex bg-[#262d37] mx-4 rounded-xl my-4 max-w-[950px] p-4 flex-col-reverse sm:flex-row md:max-w-[850px] md:min-w-[845px] justify-between items-center">
                            <div className="flex flex-col justify-between">
                                <p className="text-xl sm:text-4xl py-2 text-[#57676f] font-bold">{item.title.substring(0, 35)+"....."}</p>
                                <p className="text-sm font-semibold my-3 sm:text-sm text-[#57676f]">{item.description.substring(0, 130)+"....."}</p>
                                <div className="flex mt-2 cursor-pointer">{item.tags.map((t,i) => (<p className="mr-4 text-sm sm:text-4sm bg-[#57676f] text-[#283035] px-2 py-1 rounded-xl font-bold" key={i}>{t}</p>))}</div>
                                <p className="text-[#57676f] mt-8 font-bold text-[12px]">{formatDistanceToNow(new Date((item.createdAt)), { addSuffix: true })}</p>
                            </div>
                            <img className="object-contain rounded-xl sm:max-w-[250px]" src={item.url} alt={item.title} />
                        </div></Link>
                        )}
                    )}
            </div>
        </div>
    )
}

export default Home