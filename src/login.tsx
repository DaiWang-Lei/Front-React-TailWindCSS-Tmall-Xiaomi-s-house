import React, { useRef, useState } from "react";
import "./App.css";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SpaIcon from '@material-ui/icons/Spa';
import { setPage, useAccount, usePassword } from "./state";


const login: React.FC = () => {
    const handleLogin = () => {
        try {
            setPage('home')
           
        }
        catch {
            setPass(false)
            return;
        }



    }
    const handleRegister = () => {
        setPage("register");

    }
    const accountRef = useRef(null)
    const passwordRef = useRef(null)
    const [account] = useAccount()
    const [password] = usePassword()
    const [pass, setPass] = useState(true)
    return (
        <div className='h-screen w-screen'>
            <div className='text-center font-bold text-2xl' style={{ top: '11%' }}>
                <SpaIcon className='mr-4 ' style={{ height: 50, width: 50, color: 'orange' }} />
                 Smart Bulb
            </div>
            <div style={{ top: '14%', left: '14%' }}>
                <input
                    className=' pl-5 focus:outline-none focus:shadow-outline bg-gray-200 opacity-75 w-9/12 h-14 rounded-full mb-3 outline-none py-4'
                    type="text"
                    placeholder='请输入账号'
                    ref={accountRef}
                />
                <input
                    className='pl-5 focus:outline-none focus:shadow-outline bg-gray-200 opacity-75  rounded-full w-9/12 h-14 outline-none py-4'
                    type="password"
                    placeholder='请输入密码'
                    ref={passwordRef}
                />
            </div>
            <div style={{ top: '25%' }}>
                <div
                    className='flex justify-center items-center bg-blue-400 w-16 rounded-full h-16 text-white font-bold m-auto text-xl'
                    onClick={handleLogin}
                >
                    <ArrowForwardIcon />
                </div>
            </div>
            {
                pass ? <div /> : <div className='ml-32 mt-12 font-bold text-red-500'>账号或密码错误</div>

            }

            <div className='flex justify-around text-xs font-bold' style={{ top: '50%' }}>
                <span >忘记密码</span>
                <span className='opacity-50'>｜</span>
                <span onClick={handleRegister} >用户注册</span>
            </div>
        </div>
    );
};

export default login;