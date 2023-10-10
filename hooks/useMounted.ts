import {useState,useEffect} from "react"

export default function useMounted(){
    const [ismounted,setIsmounted] = useState(false)
    useEffect(()=>{
        setIsmounted(true)
    },[])
    return {ismounted}
}