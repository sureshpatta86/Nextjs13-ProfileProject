"use client";
import { useState } from "react";
export default function Login() {
  const [userDetials, setUserDetials] = useState({
    username: "",
    password: "",
  });
  const onClickHandler = () => {};
  return (
    <div className="min-h-screen flex flex-col bg-grey-lighter">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUserDetials({ ...userDetials, username: e.target.value });
            }}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setUserDetials({ ...userDetials, password: e.target.value });
            }}
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
            onClick={onClickHandler}
          >
            Login
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the &nbsp;
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and &nbsp;
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-grey-dark mt-6">
          Already have an account? &nbsp;
          <a
            className="no-underline border-b border-blue text-blue"
            href="../signup"
          >
            Create an account
          </a>
          .
        </div>
      </div>
    </div>
  );
}
