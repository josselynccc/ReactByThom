import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { sleep } from "./util/sleep";
import { useForm } from "./hook/useForm";
 
export const RegisterPage = () => {
  const { form, onChange, onResetForm } = useForm({
    name: "",
    lastname: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
 
  const [errors, setErrors] = useState<Record<string, null | string>>({
    name: null,
    lastname: null,
    password: null,
    email: null,
  });
 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    if (form.password !== form.confirmPassword) {
      setErrors({
        ...errors,
        password: "El password debe de coincidir con el confirmPassword",
      });
      return;
    }
 
    toast.promise(sleep(2000), {
      loading: "Enviando formulario al servidor",
      success: () => {
        console.log("enviando al servidor");
        console.table(form);
        setErrors({});
        onResetForm();
        return "Formulario enviado";
      },
      error: "Error when fetching",
    });
  };
 
  return (
    <div className="w-[90%] border-amber-100 p-5 border-[1px] bg-white rounded-2xl m-auto my-5 md:w-[600px]">
      <form onSubmit={handleSubmit}>
        <h2 className="text-[#2C3E50] font-bold text-2xl text-center">
          Registro de usuario
        </h2>
        <div className="register">
          <div className="register__input">
            <div>
              <p>Nombre</p>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
              />
            </div>
            <div>
              <p>Apellido</p>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="register__input register__input--all">
            <div>
              <p>Correo electronico</p>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="register__input">
            <div>
              <p>Contraseña</p>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
              />
              {!!errors.password && (
                <span className="text-red-600/70 text-[.7em]">
                  {errors.password}
                </span>
              )}
            </div>
            <div>
              <p>Confirmar contraseña</p>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChange}
              />
              {!!errors.password && (
                <span className="text-red-600/70 text-[.7em]">
                  {errors.password}
                </span>
              )}
            </div>
          </div>
        </div>
        <button className="bg-[#3598DB] text-white font-bold rounded-[5px] p-2 cursor-pointer w-full mt-2">
          Registrarse
        </button>
      </form>
    </div>
  );
};