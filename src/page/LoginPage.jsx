import Login from "@/components/login/Login";
import fondo from "@/assets/fondojsl.webp";
const LoginPage = () => {
  return (
    // login-page
    <main className="">
      <img className="fondo-xd" src={fondo} alt="" />
      <div className=" h-screen container mx-auto px-4 flex items-center justify-center">
        <Login />
      </div>
    </main>
  );
};

export default LoginPage;
