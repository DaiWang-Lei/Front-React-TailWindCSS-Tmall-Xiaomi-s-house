// 导入react和App.css
import React, { useEffect } from "react";
import "./App.css";
import Home from "./home/Home";
import Login from './login'
import Register from './register'
import Profile from './mine/Profile'
import axios from 'axios'
import { usePage, setPage, setName, setNickname, setPhone, setBirthday, setAccount, setPassword } from "./state";
import BottomBar from './bottomBar'

const App: React.FC = () => {
    const [page] = usePage();

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");

            if (token) {
                const { data } = await axios.get("/user", {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                setPage('home')
                setName(data.name)
                setNickname(data.nickName)
                setPhone(data.phone)
                setBirthday(data.birthday)
                setAccount(data.account)
                setPassword(data.password)
            }
        })();
    }, []);



    return (
        <>
            {(() => {
                if (page === "login")
                    return <Login />;
                else if (page === "home")
                    return <>
                        <Home />
                        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
                            <BottomBar></BottomBar>
                        </div></>
                else if (page === "register")
                    return <Register />
                else if (page === "profile")
                    return <>
                        <Profile />
                        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
                            <BottomBar></BottomBar>
                        </div>
                    </>

                return <Login />
            })()}

        </>
    )
}
// 导出App.tsx
export default App;
