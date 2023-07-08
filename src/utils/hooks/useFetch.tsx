"use client";
import { useEffect, useState } from "react";

export default function useFetch(url: string, options: any) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setIsloading(false);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchData();
  }, [url, options]);
  return { response, error, isloading };
}
