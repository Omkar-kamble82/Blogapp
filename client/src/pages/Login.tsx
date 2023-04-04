import { useState,FormEvent } from "react";
type Props = {}

const Login = (props: Props) => {
    const [register, setRegister] = useState(true);
    const handlesubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(2)
    }
    return (
        <div className='min-h-[100vh] w-[100vw] flex justify-center items-center bg-[#222831]'>
            {register && <div className='flex mx-4 shadow-lg justify-center rounded-xl items-center max-w-[500px] flex-col min-h-[70vh] my-10 overflow-hidden'>
                <img className='w-full object-fill h-[170px]' src="/login.png" alt="login-img" />
                <div className='w-full bg-[#283035] flex justify-center flex-col'>
                    <h1 className='mt-4 ml-5 text-[#00ADB5] text-[27px] pb-6'>Sign In</h1>
                    <form onSubmit={(e) => {handlesubmit}}>
                        <input className='mx-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px]' placeholder='Username'/>
                        <input className='m-4 mt-5 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px]' placeholder='Password'/>
                        <button type="submit" className="w-[300px] pl-4 h-[40px] mx-4 mt-5 rounded-md text-[#283035] font-bold bg-[#00ADB5] hover:opacity-70 duration-700 sm:w-[450px]">Sign In</button>
                    </form>
                    <p  className="text-center text-teal-50 text-[12px] py-5">Not a member? <span onClick={() => {setRegister(false)}} className="underline cursor-pointer text-[#00ADB5]">Register now</span></p>
                </div>
            </div>}
            {!register && <div className='flex mx-4 shadow-lg justify-center rounded-xl items-center max-w-[500px] flex-col min-h-[70vh] my-10 overflow-hidden'>
                <img className='w-full object-fill h-[170px]' src="/login.png" alt="login-img" />
                <div className='w-full bg-[#283035] flex justify-center flex-col'>
                    <h1 className='mt-4 ml-5 text-[#00ADB5] text-[27px] pb-6'>Register</h1>
                    <form onSubmit={(e) => {handlesubmit}}>
                        <input className='mx-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px]' placeholder='Username'/>
                        <input className='m-4 mt-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px]' placeholder='Password'/>
                        <input className='mx-4 mb-4 bg-[#222831] rounded-md placeholder-[#424f58] text-[#424f58] outline-none w-[300px] sm:w-[450px] pl-4 h-[40px]' placeholder='Confirm Password'/>
                        <button type="submit" className="w-[300px] pl-4 h-[40px] mx-4 mt-5 rounded-md text-[#283035] font-bold bg-[#00ADB5] hover:opacity-70 duration-700 sm:w-[450px]">Register Now</button>
                    </form>
                    <p className="text-center text-teal-50 text-[12px] py-5">If a member? <span onClick={() => {setRegister(true)}} className="underline cursor-pointer text-[#00ADB5]">Sign In</span></p>
                </div>
            </div>}
        </div>
    )
}

export default Login;
