import React from 'react'
import {ThreeDots} from "react-loader-spinner"

export default function RadioLoader() {
  return (
    <ThreeDots 
    height="36" 
    width="36" 
    radius="5"
    color="#ffffff" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    visible={true}
     />
  )
}
