import {useState,useEffect} from "react"
//custom hook to get when a compponent is renders on the client
export default function useMounted(){
    const [ismounted,setIsmounted] = useState(false)
    useEffect(()=>{
        setIsmounted(true)
    },[])
    return {ismounted}
}