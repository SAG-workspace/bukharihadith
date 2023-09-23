"use client";
import Image from "next/image";
import react from "react";
import React, { useEffect, useState } from "react";
import css from "styled-jsx/css";
// import Image from "next/image";

interface HadithData {
  hadith_english: string;
  refno: string;
}

export default function Home() {
  const [hadith, setHadith] = useState<HadithData | null>(null);

  const getHadith = async () => {
    try {
      const apiResponse = await fetch(
        "https://random-hadith-generator.vercel.app/bukhari",
        { method: "GET" }
      );

      const apiData = await apiResponse.json();

      const hadith_english = apiData.data.hadith_english;

      const refno = apiData.data.refno;
      setHadith({ hadith_english, refno });
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getHadith();
  }, []);
  return (
    <>
      <div className="bg-blue-700 sticky bottom-6">
        <p className="text-center font-bold ">
          Keep Remember in Your Finest Prayers
        </p>
      </div>
      <img
        style={{ width: "100vw", height: "100vw" }}
        src="https://images.unsplash.com/photo-1596163177973-aa0e47c735dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1827&q=80"
      ></img>
      <div
        className="flex flex-col justify-items-start items-center mt-1"
        style={{
          position: "absolute",
          top: "100px",
          left: "115px",
          width: "80vw",
          height: "80vw",
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0,0,00,0.4)",
        }}
      >
        {hadith !== null && (
          <div className=" w-75 mt-0">
            <h3 className="text-white italic text-4xl items-center font-semibold">
              {hadith.hadith_english}
            </h3>
            <p className="text-white font-italic"> ~{hadith.refno}</p>
            <div className="flex flex-col items-center mt-10">
              <button
                className=" hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded btb btn-primary bg-green-700"
                onClick={() => getHadith()}
              >
                Next Hadith
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
