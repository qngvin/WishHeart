import TextArea from "antd/es/input/TextArea";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { useState } from "react";

import { FaRegHeart } from "react-icons/fa";
import { uid } from "uid";
import { db } from "./firebase";

function Guest() {
  const [heart, setHeart] = useState("");

  const handleHeartChange = (e) => {
    setHeart(e.target.value);
  };

  const writeToDatabase = () => {
    const uuid = uid();

    const timestamp = serverTimestamp();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    set(ref(db, `/${uuid}`), {
      heart,
      uuid,
      timestamp,
      currentDate: formattedDate,
    }).then(() => {
      setHeart("");
    });
  };

  return (
    <div className="bg-color_1 h-screen w-full relative">
      <img className="h-[400px] w-[400px]" src="/public/logo192.png" />
      <div className="w-[400px] p-2  bg-white absolute top-[50%] left-[10%]  border-solid rounded-[10px] shadow-box_shadow_1  ">
        <TextArea
          className="mb-4"
          rows={5}
          placeholder="Pour your heart out..."
          value={heart}
          onChange={handleHeartChange}
        />
        <div className="flex justify-center">
          <button
            onClick={writeToDatabase}
            className="relative overflow-hidden group bg-[#e1dbb4] rounded-[8px] mx-auto py-[8px] px-6"
          >
            <FaRegHeart className="text-[20px] relative z-40 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#b7c3d7] to-[#fcccf1] w-0 group-hover:w-full transition-width duration-500 ease-in-out"></div>
          </button>
        </div>
      </div>
      <div className="w-3/6 float-right p-14">
        <h1 className="text-white font-mono text-7xl leading-[7rem] font-semibold">
          Let me in on your thoughts and{" "}
          <span className="text-[#fffa91c7]">feelings</span>
        </h1>
      </div>
    </div>
  );
}

export default Guest;
