import React, { useState, Children, useEffect } from "react";
import "../App.css";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import Dialog from './Dialog'

//@ts-ignore
import fileDialog from "./fileDialog";
import getBase64 from "./getBase64";
import BottomBar from '../bottomBar'
import { useName, useNickname, usePhone, useBirthday, setNickname, setPhone, setName, setBirthday, usePicture, setPicture } from "../state";
import axios from "axios";



const info = {
    nickName: {
        icon: <PersonOutlineIcon />,
        reset: "修改昵称",
    },
    phone: {
        icon: <PhoneIphoneIcon />,
        reset: "修改手机号",
    },
    birthday: {
        icon: <CakeOutlinedIcon />,
        reset: "修改出生日期",
    }
};

const validateNickName = (value: string) => /^[\u0391-\uFFE5A-Za-z0-9 _]{4,20}$/.test(value)
const validatePhone = (value: string) => /^1[3456789]\d{9}$/.test(value)
const validateName = (value: string) => /^[\u4e00-\u9fa5]+$/.test(value)

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
    }
};

const App: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [label, setLabel] = useState('');
    const [name] = useName();
    const [nickName] = useNickname();
    const [phone] = usePhone();
    const [birthday] = useBirthday();
    const [headPicture] = usePicture();




    const [userData, setUserData] = useState({
        picture: headPicture,
        name: name,
        nickName: nickName,
        phone: phone,
        birthday: birthday
    });

    const [keyClicked, setKeyClicked] = useState("");
    const [validate, setValidate] = useState([validateNickName]);
    const [error, setError] = useState("");


    useEffect(() => {
        setPicture(userData.picture)
    }, [userData.picture]);

    return (
        <>
            <div className=' my-6'>
                <div className='float-left  ml-4 mr-6'>Profile</div>
                <div className='opacity-75'> Contact info</div>
                <div className='border-b-4 rounded-md border-blue-500 w-10 ml-4'></div>
            </div>
            {/* 头像 */}
            <div className='flex justify-center flex-wrap w-full'>
                <div
                    className='w-48 h-48 rounded-full  overflow-hidden bg-center bg-cover'
                    style={{ backgroundImage: `url(${userData.picture})` }}
                />
                <div className='w-1/2 mt-4 text-center text-blue-400'
                    onClick={async () => {
                        const fileList = await fileDialog({ accept: ".jpg" });
                        const file = fileList[0];
                        const base64 = await getBase64(file);
                        setUserData({
                            ...userData,
                            picture:base64
                        });
                    }}>
                    更改头像
                </div>
            </div>
            {/* 详细信息 */}
            <div>
                <div className='m-8'>
                    <div className='text-xl font-extrabold'>{userData.name}</div>
                    <div className='text-blue-400 text-sm  w-1/2'
                        onClick={() => {
                            setModalOpen(true);
                            setLabel('修改姓名');
                            setKeyClicked('name')
                            setValidate([validators.name.validate]);
                            setError(validators.name.error);
                        }}>
                        修改姓名
                    </div>
                </div>
                {
                    Object.entries(info).map(([key, val], i) => {
                        return (<div key={i} className='my-2'>
                            <div className='w-12 h-12 ml-6 float-left pt-2'>{val.icon}</div>
                            <div>
                                <div>
                                    {userData[key]}
                                </div>
                                <div className='text-blue-400 text-sm  w-1/2' onClick={() => {
                                    setModalOpen(true);
                                    setLabel(val.reset);
                                    setKeyClicked(key);
                                    setValidate([validators[key]?.validate]);
                                    setError(validators[key]?.error);
                                }}>
                                    {val.reset}
                                </div>
                                <div className='clear-both'></div>
                            </div>
                        </div>)
                    })
                }
            </div>
            {/* dialog  */}
            <Dialog label={label} open={modalOpen} validate={validate[0]} error={error} handleClose={ (value) => {
                try {
                    setModalOpen(false)
                    value && setUserData({
                        ...userData,
                        [keyClicked]: value
                    });
                    if (keyClicked == 'name') {
                        setName(value)
                    }
                    else if (keyClicked == 'nickName') {
                        setNickname(value)
                    }
                    else if (keyClicked == 'birthday') {
                        setBirthday(value)
                    }
                    else if (keyClicked == 'phone') {
                        setPhone(value)
                    }
                }
                catch {}
            }} />
        </>
    );
};

export default App;

