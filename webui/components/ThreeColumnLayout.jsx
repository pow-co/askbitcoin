import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useBitcoin } from '../context/BitcoinContext'
const Header = dynamic(() => import('./Header'), { ssr: false})
const SideBar = dynamic(() => import ('./SideBar'), { ssr: false })
const SidebarTuning = dynamic(() => import('./SidebarTuning'), { ssr: false })

const ThreeColumnLayout = ({ children }) => {
  const { authenticated } = useBitcoin()

  const ToastTroubleShoot = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 z-[1000]">
        <div className="bg-orange-500 text-white p-4 rounded-md">
          <p className='text-white'>Have trouble login in? <Link href="/questions/08b40f405f9575e5b1d5489b7f5fe8353645f74816371214c3997aad3f4e1d6d"><a className='ml-2 underline'>Troubleshoot</a></Link></p> 
        </div>
      </div>
    )
  };

  return (
    <div className='bg-gray-300 dark:bg-gray-700'>
      {!authenticated && <ToastTroubleShoot/>}
      <Header/>
      <div className='h-16'/>
      <div className='grid grid-cols-12'>
        <div className='hidden lg:block col-span-3 lg:w-full lg:pr-7'>
          <div className='w-20 xl:w-64 fixed top-16 h-[calc(100%-4rem)] z-50'>
            <SideBar/>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-9 xl:col-span-6 grid grid-cols-12'>
          <div className='hidden lg:block col-span-1 xl:col-span-2'/>
          <div className='col-span-12 lg:col-span-8'>
            {children}
          </div>
          <div className='hidden lg:block col-span-2'/>
        </div>
        <div className='hidden xl:block col-span-3 sticky top-[72px] w-full px-7'>
          <div className='fixed top-[102px] z-50 w-[344px]'>
            <SidebarTuning/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeColumnLayout