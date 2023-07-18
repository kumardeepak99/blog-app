"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createUser } from "../store/features/userSlice";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { AuthToastConstants } from "../constants/toast/AuthToastConstants";
import { toast } from "react-toastify";
import "../globals.css";
import { Buttons, Labels, LinkPageText, Links, TextErrors } from "../constants/forms/AuthenticationTexts";
import { persistStore } from "redux-persist";
import { Response_Status } from "../apiServices/ApiServiceConstants";
import AuthService from "../apiServices/AuthService";

export type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const store = useStore();
  useEffect(() => {
    const persistor = persistStore(store);
    return () => {
      persistor.pause();
      persistor.flush();
    };
  }, [store]);

  const onLoginClick = handleSubmit(async (data: LoginData) => {
    const response = await AuthService.getUserByEmailId(data);
    if (response && response.data && response.status === Response_Status.OK) {
      dispatch(createUser(response.data));
      toast.success(AuthToastConstants.loginSuccess);
      router.push("/dashboard");
    } else {
      toast.error(AuthToastConstants.invalidCredentials);
    }
  });

  return (
    <div className="container">
      <form onSubmit={onLoginClick} className="form">
        <label htmlFor="email">{Labels.emailLabel}</label>
        <input
          id="email"
          type="text"
          className="input"
          {...register("email", {
            required: TextErrors.emailIsRequired,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: TextErrors.invalidEmailFormat,
            },
          })}
        />
        {errors.email && <div className="error-message">{errors.email.message}</div>}

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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: TextErrors.passwordTypeError,
            },
          })}
        />
        {errors.password && <div className="error-message">{errors.password.message}</div>}

        <button type="submit" className="button">
          {Buttons.loginButton}
        </button>
        <div>
          <span>
            {LinkPageText.RegisterPageText}
            <Link className="text-blue-600" href="/register">
              {Links.registerLink}
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
