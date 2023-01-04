import React, { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Button from "../components/Button";
import { signIn } from "../services/user_services.js";
import { UserContext } from "../App";

function SignInPage(props) {
  const [
    loading,
    email,
    password,
    rememberMe,
    errors,
    user,
    formSubmitHandler,
    onEmailChangeHandler,
    onPasswordChangeHandler,
    onCheckboxChangeHandler,
  ] = useAllStates(props);

  return user.isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="bg-gray-200 min-w-screen grow flex flex-col justify-center items-center lg:py-11 lg:px-10">
      {/* board */}
      <div className="bg-white grow w-full max-w-6xl max-h-[800px] lg:rounded-lg flex flex-col-reverse lg:flex-row overflow-hidden shadow-2xl">
        {/* left part */}
        <div className="lg:w-1/2 flex flex-col ">
          {/* form */}
          <div className="grow flex justify-center items-center">
            <div className="flex flex-col gap-4 p-2 w-72 md:w-80 md:items-start">
              <h1 className="text-3xl">Welcome back</h1>
              {!errors ? (
                <p className="text-sm text-gray-400">
                  Welcome back! please enter your details.
                </p>
              ) : (
                <p className="text-sm text-failure">{errors}</p>
              )}

              <form
                className="flex flex-col gap-4 mt-2"
                onSubmit={formSubmitHandler}
              >
                <div className="self-center">
                  <label
                    htmlFor="email"
                    className="block text-xs pb-1 ml-[-1px]"
                  >
                    Email
                  </label>
                  <input
                    className="rounded-[6px] text-sm p-2 border border-gray-300 w-60 md:w-80"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    value={email}
                    onChange={onEmailChangeHandler}
                  />
                </div>

                <div className="self-center">
                  <label
                    htmlFor="password"
                    className="block text-xs pb-1 ml-[-1px]"
                  >
                    Password
                  </label>
                  <input
                    className="rounded-[6px] p-2 text-sm border border-gray-300 w-60 md:w-80"
                    type="password"
                    placeholder="••••••••"
                    id="password"
                    value={password}
                    onChange={onPasswordChangeHandler}
                  />
                </div>

                <div className="flex justify-between items-center self-center w-60 md:w-80">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={onCheckboxChangeHandler}
                      id="remember"
                    />
                    <label className="text-xs ml-1" htmlFor="remember">
                      Remember for 30 days
                    </label>
                  </div>
                  <Link to="#" className="text-xs text-primary">
                    Forgot password
                  </Link>
                </div>

                <div className="w-60 md:w-80 flex flex-col gap-3 self-center">
                  <Button loading={loading}>Log In</Button>

                  <Button
                    className="text-black hover:bg-gray-100 border  border-gray-400 flex justify-center items-center gap-1"
                    outlined={1}
                  >
                    <div className="w-6">
                      <img src="/images/google_icon.png" alt="#" />
                    </div>
                    Sign in with Google
                  </Button>
                </div>

                <div className="flex text-xs self-center gap-1">
                  <p className="text-gray-300">Don't have an account?</p>
                  <Link to="" className="text-primary">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* copyright */}
          <div className="text-xs p-3 text-gray-300">
            © 2022-2023 todos. All Rights Reserved
          </div>
        </div>
        {/* right part */}
        <div className="lg:w-1/2 flex justify-center items-center w-72 md:w-96 self-center">
          <img src="/images/64.svg" alt="#" />
        </div>
      </div>
    </div>
  );
}

function useAllStates(props) {
  const [loading, setLoading] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onCheckboxChangeHandler = (e) => {
    setRememberMe(e.target.checked);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!email) {
      setErrors("Please enter your email address!");
      return;
    }

    if (!password) {
      setErrors("Please enter your password!");
      return;
    }

    setLoading(true);
    const user = {
      email: email,
      password: password,
      rememberMe: rememberMe,
    };
    signIn(user)
      .then((res) => {
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        setErrors("Wrong Credentials!");
      });
  };

  return [
    loading,
    email,
    password,
    rememberMe,
    errors,
    user,
    formSubmitHandler,
    onEmailChangeHandler,
    onPasswordChangeHandler,
    onCheckboxChangeHandler,
  ];
}

export default SignInPage;
