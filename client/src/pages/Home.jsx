import React from "react";
import Banner from "../components/Banner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { signedIn } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (signedIn) {
      navigate("/dashboard");
    }
  }, [signedIn, navigate]);

  return (
    <div>
      <Banner />
    </div>
  );
};

export default Home;
