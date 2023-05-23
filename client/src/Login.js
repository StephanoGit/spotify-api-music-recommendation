import axios from "axios";
import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export default function Login() {
    const [loginEndPoint, setLoginEndPoint] = useState("");

	useEffect(() => {
        axios.post("/login")
            .then((res) => {
                console.log(res.data);
                setLoginEndPoint(res.data);
            })
    }, []);

	return (
		<Container
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ minHeight: "100vh" }}
		>
			<img
				src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
				width={"50%"}
			></img>
			<a
				className="btn btn-success btn-lg"
				href={loginEndPoint}
				style={{ marginTop: "26px" }}
			>
				Login with Spotify
			</a>
		</Container>
	);
}
