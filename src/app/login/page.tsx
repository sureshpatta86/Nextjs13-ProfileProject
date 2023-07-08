"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [userDetials, setUserDetials] = useState({
    email: "",
    password: "",
  });
  const [isloading, setIsloading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      userDetials.email.trim().length > 0 &&
      userDetials.password.trim().length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userDetials.email, userDetials.password]);

  const onClickHandler = async () => {
    try {
      setIsloading(true);
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userDetials),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        toast.error(data.error.message, { duration: 5000 });
        console.log(data.error);
      }
      if (data.success) {
        toast.success(data.success);
        router.push("/profile");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  };
  return isloading ? (
    <div>
      <h1 className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 text-4xl font-extrabold">
        Loading...
      </h1>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col bg-grey-lighter">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="email"
            onChange={(e) => {
              setUserDetials({ ...userDetials, email: e.target.value });
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
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Please Enter Username and Password" : "Login"}
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
