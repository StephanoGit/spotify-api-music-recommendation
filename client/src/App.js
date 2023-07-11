import "bootstrap/dist/css/bootstrap.min.css"
import "./style/App.css";

import React, { useEffect, useState } from 'react'
import SpotifyWebApi from "spotify-web-api-js"
import Marquee from "react-fast-marquee"

import Login from "./Login"
import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Recommendations from "./Recommendations";

const spotifyApi = new SpotifyWebApi()

function App() {
    const [spotifyToken, setSpotifyToken] = useState(null)
    const [state, setState] = useState('profile')

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
        <div className="banner" style={{position: "fixed", top: "0", zIndex: "999"}}>
            <Marquee>
                <div className="banner-text text1">
                    {[...Array(14)].map((e, i) => (<span key={i}>FIND YOUR FAVOURITE MUSIC</span>))}
                </div>
            </Marquee>
        </div>

    {spotifyToken ? 
    <div className="app">
        <div className="navbar">
            <div className="d-flex justify-content-end" style={{width: "100%", gap: "2rem"}}>
                <a href="https://open.spotify.com/" target="_blank">SPOTIFY</a>
                <a onClick={() => setState('profile')}>PROFILE</a>
                <a onClick={() => setState('recommendation')}>RECOMMENDATION</a>
                <a onClick={() => setState('tracks')}>SEARCH</a>
            </div>
            <div className="separator"></div>
        </div>

        <div>
            {state ==='recommendation' && <Recommendations spotifyApi={spotifyApi}/>}
            {state ==='tracks' && <Dashboard accessToken={spotifyToken} />}
            {state ==='profile' && <Profile spotifyApi={spotifyApi} />}
        </div>
    </div> : <Login />}

        <div className="banner" style={{position: "fixed", bottom: "0", zIndex: "999"}}>
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
