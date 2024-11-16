import Login from "@/components/login/Login";
import fondo from "@/assets/wp_fondo.webp";
import logo from "@/assets/logo.png";
const LoginPage = () => {
  return (
    // login-page
    <main className="relative">
      <div className="fondo-login-wp">
        <img className="logo-wp-login" src={logo} alt="" />
        <div className="fondo-bg-login"></div>
      </div>

      <div className=" h-screen container mx-auto px-4 flex items-center justify-center">
        <Login />
      </div>
    </main>
  );
};

export default LoginPage;
