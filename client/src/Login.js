import React from "react"
import { Container } from "react-bootstrap"
// import { loginEndPoint } from "./spotify"

// const AUTH_URL =
//   "https://accounts.spotify.com/authorize?client_id=70416d4acd4f41d187541cd8cbf8f1a5&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const authEndPoint = "https://accounts.spotify.com/authorize?"
const client_id = "70416d4acd4f41d187541cd8cbf8f1a5"
const redirect_uri = "http://localhost:3000"
const scopes = "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-private%20playlist-read-collaborative%20playlist-modify-public"

const loginEndPoint = `${authEndPoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`



export default function Login() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" width={"50%"}></img>
      <a className="btn btn-success btn-lg" href={loginEndPoint} style={{marginTop: "26px"}}>
        Login with Spotify
      </a>
    </Container>
  )
}
