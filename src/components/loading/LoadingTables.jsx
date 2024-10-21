
import logo from "@/assets/logo.png"
const LoadingTables = () => {
  return (
    <div className='flex flex-col gap-4 text-2xl font-bold justify-center items-center h-screen w-full'>
      <img className="latido" style={{width:"350px"}} src={logo} alt="San juan de lurigancho logo" />
      <p>Cargando datos...</p>
    </div>
  )
}

export default LoadingTables;
