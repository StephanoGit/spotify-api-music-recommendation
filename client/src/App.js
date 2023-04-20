import "bootstrap/dist/css/bootstrap.min.css"
import "./component-css/App.css";

import Login from "./Login"
import Dashboard from "./Dashboard"
import PlaylistDashboard from "./PlaylistDashboard"
import Profile from "./Profile"



import React, { useEffect, useState } from 'react'
import { Container } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-js"
import useAuth from "./useAuth.js"

import { BrowserRouter , Routes, Route } from "react-router-dom"
import Recommendations from "./Recommendations";


const spotifyApi = new SpotifyWebApi()

function App() {
    // const [loggedIn, setLoggedIn] = useState(false)
    const [spotifyToken, setSpotifyToken] = useState(null)
    const [state, setState] = useState('')

    // useEffect(() => {
    //     // const spotifyToken = window.localStorage.getItem('spotifyToken')
    //     const hash = window.location.hash
    //     window.location.hash = ""

    //     if (!spotifyToken && hash){
    //         const token = hash.split('&')[0].split('=')[1]
    //         // window.localStorage.setItem('spotifyToken', token)
    //         setSpotifyToken(token)
    //         spotifyApi.setAccessToken(token)
    //     } else {
    //         setSpotifyToken(spotifyToken)
    //         spotifyApi.setAccessToken(spotifyToken)
    //     }

    //     spotifyApi.getMe().then(data => { console.log(data) })
    // }, [])

    useEffect(() => {
        const hash = window.location.hash
        const _token = hash.split('&')[0].split('=')[1]
        window.location.hash = ""

        if (_token) {
            setSpotifyToken(_token)
            spotifyApi.setAccessToken(_token)
        }
        
    }, [])

    // return (
    //     <div className="app">
    //         {
    //             spotifyToken ? (
    //                 <BrowserRouter>
    //                     <Routes>
    //                         <Route path="/dashboard" element={<Dashboard accessToken={spotifyToken} />} />
    //                         <Route path="/profile" element={<Profile accessToken={spotifyToken} />} />
    //                     </Routes>
    //                 </BrowserRouter>
    //                 // <Profile accessToken={spotifyToken} />
    //             ) : (
    //                 <Login />
    //             )
    //         }
    //     </div>
    // )


    return spotifyToken ? 
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
            {state ==='profile' && <Profile accessToken={spotifyToken} />}

        </div>
    </div> : <Login />
}

export default App
