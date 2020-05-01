import store from "@lincode/react-global-state";
//@ts-ignore
import headPicture from './assets/test.jpeg'

type Page = "login" | "profile" | "register" | "home";

export const [usePage, setPage] = store("login" as Page);
export const [useName,setName]  = store('代罔' as String)
export const [useNickname,setNickname]  = store('Spard Man' as String)
export const [useBirthday,setBirthday]  = store('2020-02-02' as String)
export const [usePhone,setPhone]  = store('13572390749' as String)
export const [useAccount,setAccount]  = store('admin' as String)
export const [usePassword,setPassword]  = store('admin' as String)
export const [usePicture,setPicture]  = store(headPicture)






