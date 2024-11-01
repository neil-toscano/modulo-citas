import Login from "@/components/login/Login";
import fondo from "@/assets/fondojsl.webp";
const LoginPage = () => {
  return (
    // login-page
    <main className="h-full relative ">
      <img className="fondo-xd" src={fondo} alt="" />
      <div className="py-5 container mx-auto px-4 flex items-center justify-center  main-login">
        <Login />
      </div>
    </main>
  );
};

export default LoginPage;
