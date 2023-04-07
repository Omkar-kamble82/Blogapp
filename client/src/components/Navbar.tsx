import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";


const Navbar = () => {

    const [menu, setMenu] = useState(true)
    const { logout } = useLogout()
    const {user,setUser} = useContext(UserContext)

    useEffect(() => {
        let handler = (e:MouseEvent | TouchEvent | Event) => {
            if(e.target) {
                setMenu(true)
            }
        };
        document.addEventListener("mousedown",handler);
        document.addEventListener("scroll",handler);
        return () => window.removeEventListener("scroll", handler);
    },[]);

    return (
        <>
        <nav className='w-full shadow-2xl flex justify-between fixed bg-[#222831] p-4 items-center'>
            <Link to="/home"><img className='w-[170px] cursor-pointer' src="/logo.png" alt="logo-img" /></Link>
            <div onClick={() => {setMenu(!menu)}} className='w-[40px] cursor-pointer h-[40px] rounded-full bg-[#00ADB5] flex justify-center items-center text-xl text-[#eee]'>A</div>
        </nav>
        <div className={`${menu ? `translate-x-[100%]` : `translate-x-0`} border-2 border-[#565e6c] transition-all text-white bg-[#222831] z-[11] duration-1000 fixed w-[240px] h-[230px] top-0 right-0 lg:w-[300px]`}>
                <div onClick={()=>{setMenu(true)}} className={`h-[30px] w-[30px] bg-[#00ADB5] text-white p-2 rounded-[50%] absolute top-6 right-6 lg:h-[35px] lg:w-[35px]`}><img src="/close.svg" alt="close-icon"/></div>
                <div className={`absolute top-20 left-4`}>
                    <Link to="/form"><li><p className="px-4 py-2 font-bold rounded-xl cursor-pointer text-[#222831] bg-[#00ADB5] hover:opacity-70 duration-700"><span className="px-2 rounded-full text-xl border-2 border-[#222831]"> +</span> Create</p></li></Link>
                    <Link to={`/${user.username}blogs`}><li><p className="p-2 font-bold text-[#565e6c] cursor-pointer text-xl">Account</p></li></Link>
                    <div className="bg-[#565e6c] w-full h-[3px]"/>
                    <li onClick={logout}><p className="p-2 cursor-pointer font-bold text-[#565e6c] text-xl">Logout</p></li>
                </div>
            </div>
        </>
    )
}

export default Navbar;