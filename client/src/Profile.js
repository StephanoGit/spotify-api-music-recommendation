import React, {useEffect, useState} from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import useAuth from "./useAuth"
import axios from "axios"
import PlaylistSearchResult from './PlaylistSearchResult'

const spotifyApi = new SpotifyWebApi({
  clientId: "70416d4acd4f41d187541cd8cbf8f1a5",
})

export default function Profile( {code}) {
    const accessToken = useAuth(code)
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        product: '',
        url: '',
        photo: '',
    })
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])


    useEffect(() => {
        if (!accessToken) return
        // console.log(spotifyApi.getMe)

        let cancel = false
        spotifyApi.getMe().then((res) => {
            // console.log(res)
            if (cancel) return
            setProfile({
                name: res.body.display_name,
                email: res.body.email,
                product: res.body.product,
                url: res.body.external_urls.spotify,
                photo: res.body.images[0].url
            }
            )
        })
        return () => (cancel = true)
    }, [accessToken])



    useEffect(() => {
        if (!accessToken) return

        let cancel = false
        spotifyApi.getUserPlaylists().then((res) => {
            console.log(res)
            if (cancel) return
            setPlaylists(
                res.body.items.map(playlist => {
                  // console.log(playlist)
                  return {
                    artist: playlist.owner.display_name,
                    title: playlist.name,
                    uri: playlist.uri,
                    albumUrl: playlist.images[0].url,
                    id: playlist.id
                  }
                })
              )
        })
        return () => (cancel = true)
    }, [accessToken])


  return (
    <div>
        <img src={profile.photo} alt="profile"/>
        <p>{profile.name}</p>
        <p>{profile.email}</p>
        <p>{profile.product}</p>
        <a href={profile.url}>Spotify Profile</a>
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {playlists.map(playlist => (
          <div key={playlist.uri}>
            <img src={playlist.albumUrl} alt={playlist.title} style={{ height: "64px", width: "64px" }} />
            <div className="ml-3">
                <div>{playlist.title}</div>
                <div className="text-muted">{playlist.artist}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
