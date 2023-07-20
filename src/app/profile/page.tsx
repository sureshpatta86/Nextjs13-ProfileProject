"use client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const logOut = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "GET",
      });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      {/* Logout Button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  );
}
