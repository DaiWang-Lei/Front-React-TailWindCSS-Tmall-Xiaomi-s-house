import React from "react";
import ReactSwiperExample from "./swiper";
import SimpleModal from "./modal";
import BottomBar from '../bottomBar'
import { setPage } from "../state";

const Home: React.FC = () => {
    return (
        <div className='w-screen h-screen  relative'>
            <div className='bg-blue-400 text-white opcity-3 h-48 leading-9 rounded-b-lg '>
                <span className='m-5 text-2xl'>我的家</span>
                <span className=' mr-1 ml-40 text-xl' onClick={()=>{
                    setPage('login')
            }}>退出登陆</span>
            </div>
            <div className=' flex justify-center'>
                <div className=' w-10/12 md:w-2/3 md:h-64 h-40 overflow-hidden rounded-lg' style={{ top: -120 }}>
                    <ReactSwiperExample></ReactSwiperExample>

                </div>
            </div>
            <div>
                <div style={{ top: -100 }}>
                    <div className='lg:mx-20 m-3 text-xl opacity-75'>智能设备</div>
                    <div className='m-3' >
                        <div className='float-left w-1/2 ml-4 text-blue-500 md:ml-48 '>
                            全部
                            <div className='border-b-4 rounded-sm border-blue-500 w-8'></div>
                        </div>
                        <div className='opacity-50 ml-64' style={{ right: 70 }}>其他</div>
                    </div>

                    {/* 灯泡详情页 */}
                    <div className='lg:mr-64'>
                        <SimpleModal></SimpleModal>
                    </div>
                </div>
                {/* 底边栏 */}
            </div>
        </div>
    );
};

export default Home;