import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login"
import Dashboard from "./Dashboard"
import PlaylistDashboard from "./PlaylistDashboard"
import Profile from "./Profile"


import React, { useEffect, useState } from 'react'
import axios from "axios"

const code = new URLSearchParams(window.location.search).get("code")

function App() {

    useEffect(() => {
        fetch('/time')
            .then(res => res.json())
            .then(data => console.log(data))

        axios.post('/test', {'title': 'cool title'})
    }, [])

    // return (<div className="App"/>)

    return code ? <Profile code={code}/> : <Login />


    // const [state, setState] = useState('')
    // return code ? 
    // <div>
    //     <div>
    //         <a className="btn btn-primary btn-lg" onClick={() => setState('playlist')}>Search for Playlists</a>
    //         <a className="btn btn-primary btn-lg" onClick={() => setState('track')}>Search for Tracks</a>
    //     </div>

    //     <div>
    //         {state ==='playlist' && <PlaylistDashboard code={code}/>}
    //         {state ==='track' && <Dashboard code={code} />}
    //     </div>
    // </div> : <Login />
}

export default App
