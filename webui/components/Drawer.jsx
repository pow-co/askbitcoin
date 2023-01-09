import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/router"

const Drawer= ({ children, selector, isOpen, onClose }) => {
   const [mounted, setMounted] = useState(false)
   const router = useRouter()

   useEffect(() => {
    onClose();
  }, [router.pathname]);


   useEffect(() => {
      setMounted(true)

      return () => setMounted(false)
   }, [])

   const DrawerLayout = ({children}) => {
       return (
        <div className="fixed inset-0 w-screen h-screen" style={{zIndex:"1001"}}>
            <div className="fixed inset-0 w-screen h-screen bg-black opacity-50" onClick={onClose}></div>
               <div>{children}</div>
        </div>)
   }

   if(!isOpen){
       return null
   } else {
   return mounted
      ? createPortal(<DrawerLayout>{children}</DrawerLayout>, 
        document.querySelector(selector))
      : null}
}

export default Drawer