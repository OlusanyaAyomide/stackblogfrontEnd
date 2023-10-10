import React from 'react'
import Header from './Header'
import Footer from './Footer'


export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <div className=''>
        <div className='paddingx'>
            <Header/>
            <div className='min-h-screen pt-[60px] pb-6'>
                {children}
            </div>
        </div>
        <Footer/>
    </div>
  )
}
