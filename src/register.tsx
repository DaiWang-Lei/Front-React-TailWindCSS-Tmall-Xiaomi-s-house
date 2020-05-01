
import "./App.css";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SpaIcon from '@material-ui/icons/Spa';
import React, { useState } from "react";
import Picker from "./picker";
import { setPage, setName, setNickname, setBirthday, setPhone, setPassword, setAccount } from "./state";
import axios from "axios";

const item = {
    name: {
        title: "姓名:",
        test: '请输入姓名',
        type: "text",
    },
    nickName: {
        title: "昵称:",
        test: '请输入昵称',
        type: "text",

    },
    phone: {
        title: "手机号:",
        test: '请输入手机号',
        type: "text",
    },
    birthday: {
        title: '出生日期：',
        test: '',
        type: "",
    },
    account: {
        title: '账号:',
        test: '请输入账号',
        type: "text",
    },
    password: {
        title: "密码:",
        test: '请输入密码',
        type: "password",
    },

}
const validateNickName = (value: string) => /^[\u0391-\uFFE5A-Za-z0-9 _]{4,20}$/.test(value)
const validatePhone = (value: string) => /^1[3456789]\d{9}$/.test(value)
const validateName = (value: string) => /^[\u4e00-\u9fa5]+$/.test(value)
const validateAccount = (value: string) => /^[a-zA-Z0-9_-]{4,16}$/.test(value)
const validatePassword = (value: string) => /^[a-zA-Z0-9._-]{6,16}$/.test(value)

const validators = {
    nickName: {
        validate: validateNickName,
        error: "请输入，4-16个文字或字母"
    },
    phone: {
        validate: validatePhone,
        error: "请输入，正确的手机号"
    },
    name: {
        validate: validateName,
        error: "请输入正确的姓名"
    },
    account: {
        validate: validateAccount,
        error: "请输入合法的账号"
    },
    password: {
        validate: validatePassword,
        error: "请输入合法的密码"
    },

};
const register: React.FC = () => {
    const [info, setInfo] = useState({
        name: '',
        nickName: '',
        phone: '',
        birthday: '',
        account: '',
        password: '',
    })
    // const [keyClicked, setKeyClicked] = useState('')

    const [error, setError] = useState("");
    const [keyClicked, setKeyClicked] = useState('')
    const [status, setStatus] = useState('')

    return (

        <div className='h-screen w-screen'>
            <div className='text-center font-bold text-2xl' style={{ top: '5%' }}>
                <SpaIcon className='mr-4 ' style={{ height: 50, width: 50, color: 'orange' }} />
                 Smart Bulb
            </div>
            <div style={{ top: '5%', left: '5%' }}>
                {
                    validators[keyClicked]?.validate(info[keyClicked]) ?
                        <div></div>
                        :
                        <div className='text-red-500 text-center'>{error}</div>
                }
                {
                    Object.entries(item).map(([key, val], i) => {
                        return (
                            <div key={i}>

                                <div className='float-left mb-1 pl-3'>{val.title}</div>
                                {
                                    key === 'birthday' ?
                                        <div className=' overflow-hidden flex rounded-full justify-start pl-8 w-11/12 bg-gray-200 my-1'>
                                            <Picker onChange={(e) => {

                                                setInfo({
                                                    ...info,
                                                    [key]: e
                                                });

                                            }} />
                                        </div>
                                        :
                                        <input
                                            className=' pl-2 focus:outline-none focus:shadow-outline bg-gray-200 opacity-75 w-11/12 h-8 rounded-full mb-3 outline-none py-4'
                                            type={val.type}
                                            placeholder={val.test}
                                            onChange={(e) => {
                                                setInfo({
                                                    ...info,
                                                    [key]: e.target.value
                                                });
                                                setKeyClicked(key)
                                                setStatus('200')
                                            }
                                            }
                                            onKeyUp={() => {
                                                if (!validators[keyClicked]?.validate(info[keyClicked])) {
                                                    setError(validators[key].error);
                                                }
                                            }}
                                        />}
                            </div>
                        )
                    })
                }
            </div>

            {
                status == '403' ? <div style={{ top: '-59%' }} className='text-red-500 text-center'>账号已存在，请重新输入！</div> : <div />
            }

            <div style={{ top: '5%' }}>
                <div
                    className='flex justify-center items-center bg-blue-400 mt-10 w-40 rounded-lg h-16 text-white font-bold m-auto text-xl'
                    onClick={ () => {
                        try {
                            setPage('home')
                            setName(info.name)
                            setNickname(info.nickName)
                            setPhone(info.phone)
                            setBirthday(info.birthday)
                            setAccount(info.account)
                            setPassword(info.password)
                        }
                        catch (err) {
                            setStatus(err.response.status);
                        }


                    }}
                >
                    注册
                </div>
            </div>

        </div >
    );
};

export default register;