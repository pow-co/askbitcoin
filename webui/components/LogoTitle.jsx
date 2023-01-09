import React from 'react'
import { useTheme } from "next-themes"

const LogoTitle = () => {
  const { theme} = useTheme()
  return <>
  {theme === "light" ? <img className='w-[180px]' src="/icons/askbitcoin_logo_without_margins_or_background.png" /> : <img className='w-[180px]' src="/icons/askbitcoin_logo_inverted_without_margins_or_background.png"/>}</>
}

export default LogoTitle