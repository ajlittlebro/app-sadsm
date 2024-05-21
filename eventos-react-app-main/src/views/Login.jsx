import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Img
import logoImg from "../img/logo.png";

const Login = () => {

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const iniciarSesion = () => {

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === "" && password === "") {
      Swal.fire({
        icon: "error",
        title: "Vaya...",
        text: "No haz ingresado bien tus credenciales.",
        footer: '<a href="#">¿Tengo el correo o contraseña correct@?</a>'
      });
    } else if(email === "admin@sadsm.com" && password === "root") {
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Estás a punto de ingresar a tu cuenta.",
        footer: '<a href="#">¿Cómo puedo cambiar mi contraseña?</a>'
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Vaya...",
        text: "Tus credenciales no son correctas.",
        footer: '<a href="#">¿Tengo el correo o contraseña correct@?</a>'
      });
    }   
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="h-32"
            src={logoImg}
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold italic">SADSM ORGANIZADORA DE EVENTOS</h1>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              Inicia sesión en tu cuenta
            </h2>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu correo electrónico
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="correo@gmail.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Recuérdame
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-cyan-600	 hover:underline dark:text-primary-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-cyan-600	 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={
                  (e) => {
                    e.preventDefault();
                    iniciarSesion()
                  }
                }
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Todavía no tienes una cuenta?{" "}
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-primary-500"
                >
                  Regístrate
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
