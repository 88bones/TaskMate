import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Banner = () => {
  const navigate = useNavigate();
  const { signedIn } = useSelector((state) => state.user);

  return (
    <div className="w-full h-96 flex justify-center items-center flex-col">
      <h1>
        <i className="text-5xl font-bold">Plan Smarter. Acheive more</i>
        <p className="text-sm">
          “Track progress, collaborate with your team, and hit every deadline.”
        </p>
      </h1>

      {!signedIn ? (
        <button
          className="mt-8 py-2 px-4 text-white rounded bg-black cursor-pointer hover:shadow-xl"
          onClick={() => navigate("/signup")}
        >
          [Get Started]
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Banner;
