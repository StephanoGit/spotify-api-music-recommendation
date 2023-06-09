import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style/Login.css";

export default function Login() {
  const [loginEndPoint, setLoginEndPoint] = useState("");

  useEffect(() => {
    axios.post("/login").then((res) => {
      setLoginEndPoint(res.data);
    });
  }, []);

  return (
    <div className="login">
      <div className="welcome-div">
        <div className="welcome-text">
          <h1>FIND YOUR NEW</h1>
          <h1>FAVOURITE MUSIC</h1>
        </div>
        <div className="welcome-separator"></div>

        <div className="login-div">
          <div className="flex-column">
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
              width={"50%"}
            ></img>
            <h1>//Web API</h1>
            <h3 style={{color:"#B0FF2F"}}>//MUST HAVE A PREMIUM ACCOUNT</h3>
          </div>
          <div className="d-flex align-items-center">
            <a
              className="btn btn-success btn-lg"
              href={loginEndPoint}
              style={{ marginTop: "26px" }}
            >
              <p className="bttn-txt">LOGIN</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
