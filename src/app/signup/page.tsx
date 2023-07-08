"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [userDetials, setUserDetials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (
      userDetials.username.length > 0 &&
      userDetials.email.length > 0 &&
      userDetials.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userDetials]);

  const onClickHandler = async () => {
    try {
      setIsloading(false);
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify(userDetials),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        console.log(data.error);
      } else {
        console.log("Account created successfully");
        toast.success("Account created successfully");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsloading(true);
    }
  };
  return isloading ? (
    <div>
      <h1 className="text-4xl font-extrabold">Loading...</h1>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col bg-grey-lighter">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
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
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
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
          >
            {buttonDisabled ? "Please fill all the fields" : "Create Account"}
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
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
}
