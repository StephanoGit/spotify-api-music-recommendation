import "bootstrap/dist/css/bootstrap.min.css"
import "./style/App.css";

import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-js"
import Marquee from "react-fast-marquee"

import Login from "./Login"
import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Recommendations from "./Recommendations";
// import PlaylistDashboard from "./PlaylistDashboard"


const spotifyApi = new SpotifyWebApi()

function App() {
    const [spotifyToken, setSpotifyToken] = useState(null)
    const [state, setState] = useState('')

    useEffect(() => {
        const hash = window.location.hash
        const _token = hash.split('&')[0].split('=')[1]
        window.location.hash = ""

        if (_token) {
            setSpotifyToken(_token)
            spotifyApi.setAccessToken(_token)
        }
        
    }, [])


    return (
    <div>
        <div className="banner" style={{position: "fixed", top: "0"}}>
            <Marquee>
                <div className="banner-text text1">	
                    {[...Array(14)].map((e, i) => (<span key={i}>FIND YOUR FAVOURITE MUSIC</span>))}
                </div>
            </Marquee>
        </div>

    {spotifyToken ? 
    <div className="app">
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
            <Container className="d-flex flex-row justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <div className="oswald-font" style={{fontSize:"86px"}}>
                    SPOTIFY MUSIC RECOMMENDATION
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" width={"400px"}/>
            </Container>

            <Container className="d-flex flex-row justify-content-around align-items-center">
                <a className="btn btn-lg rounded-pill" style={{backgroundColor: "#212121", color: "white"}} onClick={() => setState('profile')}>See Profile</a>
                <a className="btn btn-lg rounded-pill" style={{backgroundColor: "#1ED760", color: "white", fontSize: "28px"}} onClick={() => setState('recommendation')}>Get Recommendations</a>
                <a className="btn btn-lg rounded-pill" style={{backgroundColor: "#212121", color: "white"}} onClick={() => setState('tracks')}>Serach Tracks</a>
            </Container>
        </Container>

        <div>
            {state ==='recommendation' && <Recommendations spotifyApi={spotifyApi}/>}
            {state ==='tracks' && <Dashboard accessToken={spotifyToken} />}
            {state ==='profile' && <Profile spotifyApi={spotifyApi} />}

        </div>
    </div> : <Login />}

        <div className="banner" style={{position: "fixed", bottom: "0"}}>
            <Marquee>
                <div className="banner-text text1">	
                    {[...Array(14)].map((e, i) => (<span key={i}>FIND YOUR FAVOURITE MUSIC</span>))}
                </div>
            </Marquee>
        </div>
    </div>
    )
}

export default App
