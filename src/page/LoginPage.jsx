import logo from "@/assets/logo.png";
import SwiperImg from "../components/login/SwiperImg";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Polygon from "@/assets/login/polygon.png" 
import LoginDocument from "../components/login/LoginDocument";
const LoginPage = () => {
  const [view, setView] = useState(true);
  const matches = useMediaQuery("(min-width: 939px)");
  return (
    <main className="bg-white relative main-login h-screen">
      {/* mx-auto items-center */}
      <div
        className={`h-full mx-auto container relative px-4 flex flex-col overflow-auto ${
          !view ? "" : "justify-center"
        }  self-center`}
      >
        <div className="absolute h-full w-[98] ">
          <img src={Polygon} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="fondo-login" />
        </div>
        <LoginDocument view={view} setView={setView} />
        <div className="py-4 z-[2] flex justify-center items-center w-full">
          <img
            src={logo}
            className="logo-img"
            alt="logo san juan de lurigancho"
          />{" "}
        </div>
      </div>
      {matches && <div className="h-screen">
        <SwiperImg />
      </div>}
    </main>
  );
};

export default LoginPage;
