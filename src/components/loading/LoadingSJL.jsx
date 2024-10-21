// import Image from 'next/image'

import logo from "@/assets/logo.png"
const LoadingSJL = () => {
  return (
    <div className='flex text-2xl font-bold justify-center items-center h-screen w-full'>
      <img className="latido"  style={{width:"350px"}} src={logo} alt="San juan de lurigancho logo" />
    </div>
  )
}

export default LoadingSJL

