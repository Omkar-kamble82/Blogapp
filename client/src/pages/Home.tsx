import Navbar from "../components/Navbar";

type Props = {}

const Home = (props: Props) => {
    return (
        <div className='bg-[#222831] min-h-[100vh]'>
            <Navbar />
            <h1 className="ml-10 py-2 mt-[100px] text-4xl font-bold text-[#eee]">Hello <span className="text-[#00ADB5]">User!</span></h1>
            <div className="flex bg-[#283035] rounded-xl my-4 max-w-[950px] p-4 flex-col-reverse sm:flex-row md:max-w-[850px] md:min-w-[845px] justify-between mx-auto items-center">
                <div className="flex flex-col justify-between">
                    <p className="text-xl sm:text-4xl py-2 text-[#57676f] font-bold">nencncncc cnccncnecn j3cbi3rncr3cnocn</p>
                    <p className="text-sm font-semibold my-3 sm:text-sm text-[#57676f]">cnriocv3nrvrvbrj jrv rjbvrvbrjv rvjrvbrvbrw3vbw3v</p>
                    <div className="flex mt-2 cursor-pointer">orncjr3bjr3bcvr3jvb</div>
                    <p className="text-[#57676f] mt-8 font-bold text-[12px]">kjncjkr3ncjr3c</p>
                </div>
                <img className="object-contain rounded-xl sm:max-w-[250px]" src="/login.png"/>
            </div>
        </div>
    )
}

export default Home