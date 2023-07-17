"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../globals.css";
import {
  Buttons,
  Labels,
  LinkPageText,
  Links,
  TextErrors,
} from "../constants/forms/AuthenticationTexts";
import { toast } from "react-toastify";
import { AuthToastConstants } from "../constants/toast/AuthToastConstants";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  // create user and get user data on user creation succesfully
  const onRegisterClick = handleSubmit((data: RegisterData) => {
    if (data.name && data.email && data.password) {
      toast.success(AuthToastConstants.registerSuccess);
      router.push("/dashboard");
    } else {
      toast.error(AuthToastConstants.invalidCredentials);
    }
  });

  return (
    <div className="container">
      <form onSubmit={onRegisterClick} className="form">
        <label htmlFor="name">{Labels.nameLabel}</label>
        <input
          id="name"
          type="text"
          className="input"
          {...register("name", {
            required: TextErrors.nameIsRequired,
          })}
        />
        {errors.name && (
          <div className="error-message">{errors.name.message}</div>
        )}

        <label htmlFor="email">{Labels.emailLabel}</label>
        <input
          id="email"
          type="email"
          className="input"
          {...register("email", {
            required: TextErrors.emailIsRequired,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: TextErrors.invalidEmailFormat,
            },
          })}
        />
        {errors.email && (
          <div className="error-message">{errors.email.message}</div>
        )}

        <label htmlFor="password">{Labels.passwordLabel}</label>
        <input
          id="password"
          type="password"
          className="input"
          {...register("password", {
            required: TextErrors.passwordIsRequired,
            minLength: {
              value: 8,
              message: TextErrors.passwordLengthError,
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: TextErrors.passwordTypeError,
            },
          })}
        />
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}

        <button type="submit" className="button">
          {Buttons.registerButton}
        </button>
        <div>
          <span>
            {LinkPageText.LoginPageText}
            <Link className="text-blue-600" href="/login">
              {Links.loginLink}
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
