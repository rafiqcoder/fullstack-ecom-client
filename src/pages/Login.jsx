import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";
import { Navigate, useLocation, useNavigate } from "react-router";
import {
  useAddUserMutation,
  useGenerateJwtMutation,
} from "../redux/api/usersApi/usersApi";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [generateJwt, { isLoading }] = useGenerateJwtMutation();
  const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  console.log("location", location.state?.from?.pathname);

  const provider = new GoogleAuthProvider();
  const onSubmit = (data) => {
    alert("Form submitted successfully!");
    console.log(data);
  };
  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = userCredential.user;
        const userDetails = result.user;
        if (userDetails && userDetails.email) {
          const userData = {
            email: userDetails.email,
            name: userDetails.displayName || "Guest",
          };
          addUser(userData)
            .unwrap()
            .then(() => {
              setLoading(false);
              console.log("User added successfully!");

              navigate(from, { replace: true });
            })
            .catch((error) => {
              console.error("Failed to add user:", error);
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        // The email of the user's account used.
        console.log(error);
        setLoading(false);
        // The AuthCredential type that was used.

        // ...
      });
  };
  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader text-white"> Loading</div>
      </div>
    );
  }
  return (
    <div>
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800 mx-auto my-10">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center dark:text-gray-600">
          Dont have account?
          <a
            href="#"
            rel="noopener noreferrer"
            className="focus:underline hover:underline"
          >
            Sign up here
          </a>
        </p>
        <div className="my-6 space-y-4">
          <button
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
            onClick={handleGoogleSignIn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                data-np-intersection-state="observed"
                data-np-autofill-field-type="username"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                {...register("password")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
