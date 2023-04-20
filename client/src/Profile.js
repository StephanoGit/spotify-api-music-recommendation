import React, {useEffect, useState} from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import useAuth from "./useAuth"
import axios from "axios"
import PlaylistSearchResult from './PlaylistSearchResult'

const spotifyApi = new SpotifyWebApi({
  clientId: "70416d4acd4f41d187541cd8cbf8f1a5",
  clientSecret: "994f755689fb49f29b563925aabbbd22"
})

export default function Profile({accessToken}) {
    const access_token = accessToken
    spotifyApi.setAccessToken(access_token)

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        product: '',
        url: '',
        photo: '',
    })
    const [playlists, setPlaylists] = useState([])

    function recommendTracks(playlist_id){
      axios.post('/recommendations', {
        'access_token': accessToken,
        'playlist_id': playlist_id
      })
    }

    // useEffect(() => {
    //     if (!accessToken) return
    //     spotifyApi.setAccessToken(accessToken)
    //   }, [accessToken])


    useEffect(() => {
        if (!accessToken) return

        let cancel = false
        spotifyApi.getMe().then((res) => {
            console.log(res)
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
            // console.log(res)
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
          <div
            className="d-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => recommendTracks(playlist.id)}
            key={playlist.uri}
          >
            <div>
              <img src={playlist.albumUrl} alt={playlist.title} style={{ height: "64px", width: "64px" }} />
              <div className="ml-3">
                  <div>{playlist.title}</div>
                  <div className="text-muted">{playlist.artist}</div>
              </div>
            </div>
          </div>
        ))}
        </div>

    </div>
  )
}
