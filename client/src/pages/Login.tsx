import { useState,FormEvent } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";

const Login = () => {
    const [register, setRegister] = useState(true);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const {login, loginerror, isloginLoading} = useLogin()
    const {signup, error, isLoading} = useSignup()
    const [Error,setError] = useState('')
    const [visible, setVisible] = useState(false);


    const submitlogin = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(username, password)
    }

    const submitregister = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(confirmpassword === password) {
            setError("")
        }
        if(confirmpassword !== password) {
            setError("Password and confirm password do not match")
        } else {
            await signup(username, password)
        }
    }
    console.log(password !== confirmpassword)

    return (
        <div className='min-h-[100vh] w-[100vw] flex justify-center items-center relative bg-[#222831]'>
            {isloginLoading && <div className="absolute inset-0 bg-black/70 z-[11] flex justify-center items-center flex-col"><img className="h-[100px]" src="/loading.gif" alt="" /><p className="text-[#00ADB5] text-[14px]">*If it takes longer, please reload the page and try again.</p></div>}
            {register && <div className='flex mx-4 shadow-lg justify-center rounded-xl items-center max-w-[500px] flex-col min-h-[70vh] my-10 overflow-hidden'>
                <div className="relative w-full h-[170px]">
                    <img className='w-full object-fill h-[170px]' src="/login.png" alt="login-img" />
                    <div className="absolute inset-0 bg-black/60 flex justify-center items-center"><img className="h-20 w-50" src="/logo.png" alt="logo" /></div>
                </div>
                <div className='w-full bg-[#283035] flex justify-center flex-col'>
                    <h1 className='mt-4 ml-5 text-[#00ADB5] text-[27px] pb-6 font-bold'>Sign In</h1>
                    <form onSubmit={submitlogin}>
                        <input onChange={(e) => {setUsername(e.target.value)}} className='mx-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px]' placeholder='Username'/>
                        <div className="flex bg-[#222831] items-center m-4 mt-5 rounded-md w-[300px] sm:w-[450px] pl-4 h-[40px] justify-between pr-4"><input type={visible ? "text" : "password"} onChange={(e) => {setPassword(e.target.value)}} className='w-[250px] sm:w-[400px] outline-none placeholder-[#424f58] bg-[#222831] text-[#424f58]' placeholder='Password'/><div className="cursor-pointer" onClick={() => {setVisible(!visible)}}><img className="h-6" src="/eye.svg" alt="change_visiblity" /></div></div>
                        <button type="submit" className="w-[300px] pl-4 h-[40px] mx-4 mt-5 rounded-md text-[#283035] font-bold bg-[#00ADB5] hover:opacity-70 duration-700 sm:w-[450px]">Sign In</button>
                    </form>
                    {loginerror && <p className="text-[#c72931] font-bold text-center text-sm">{loginerror}</p> }           
                    <p  className="text-center text-teal-50 text-[12px] py-5">Not a member? <span onClick={() => {setRegister(false)}} className="underline cursor-pointer text-[#00ADB5]">Register now</span></p>
                </div>
            </div>}
            {!register && 
            <div className='flex mx-4 shadow-lg justify-center rounded-xl items-center max-w-[500px] flex-col min-h-[70vh] my-10 overflow-hidden'>
                {isLoading && <div className="absolute inset-0 bg-black/70 z-[11] flex justify-center items-center flex-col"><img className="h-[100px]" src="/loading.gif" alt="" /><p className="text-[#00ADB5] text-[14px]">*If it takes longer, please reload the page and try again.</p></div>}
                <div className="relative w-full h-[170px]">
                    <img className='w-full object-fill h-[170px]' src="/login.png" alt="login-img" />
                    <div className="absolute inset-0 bg-black/60 flex justify-center items-center"><img className="h-20 w-50" src="/logo.png" alt="logo" /></div>
                </div>
                <div className='w-full bg-[#283035] flex justify-center flex-col'>
                    <h1 className='mt-4 ml-5 text-[#00ADB5] text-[27px] pb-6 font-bold'>Register</h1>
                    <form onSubmit={submitregister}>
                        <input onChange={(e) => {setUsername(e.target.value)}} className='mx-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px]' placeholder='Username'/>
                        <div className="flex bg-[#222831] items-center m-4 mt-5 rounded-md w-[300px] sm:w-[450px] pl-4 h-[40px] justify-between pr-4"><input type={visible ? "text" : "password"} onChange={(e) => {setPassword(e.target.value)}} className='w-[250px] sm:w-[400px] outline-none placeholder-[#424f58] bg-[#222831] text-[#424f58]' placeholder='Password'/><div className="cursor-pointer" onClick={() => {setVisible(!visible)}}><img className="h-6" src="/eye.svg" alt="change_visiblity" /></div></div>
                        <div className="flex bg-[#222831] items-center m-4 mt-5 rounded-md w-[300px] sm:w-[450px] pl-4 h-[40px] justify-between pr-4"><input type={visible ? "text" : "password"} onChange={(e) => {setConfirmPassword(e.target.value)}} className='w-[250px] sm:w-[400px] outline-none placeholder-[#424f58] bg-[#222831] text-[#424f58]' placeholder='Confirm Password'/><div className="cursor-pointer" onClick={() => {setVisible(!visible)}}><img className="h-6" src="/eye.svg" alt="change_visiblity" /></div></div>
                        <button type="submit" className="w-[300px] pl-4 h-[40px] mx-4 mt-5 rounded-md text-[#283035] font-bold bg-[#00ADB5] hover:opacity-70 duration-700 sm:w-[450px]">Register Now</button>
                    </form>
                    {error && <p className="text-[#c72931] font-bold text-center text-sm">{error}</p> }           
                    {Error && <p className="text-[#c72931] font-bold text-center text-sm">{Error}</p> }           
                    <p className="text-center text-teal-50 text-[12px] py-5">If a member? <span onClick={() => {setRegister(true)}} className="underline cursor-pointer text-[#00ADB5]">Sign In</span></p>
                </div>
            </div>
            }
        </div>
    )
}

export default Login;
