import { useState, useEffect } from "react"
import useAuth from "./useAuth"
// import Player from "./Player"
import PlaylistSearchResult from "./PlaylistSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import Playlist from "./Playlist"

const spotifyApi = new SpotifyWebApi({
  clientId: "70416d4acd4f41d187541cd8cbf8f1a5",
})

export default function PlaylistDashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playlistTracks, setPlaylistTracks] = useState([])

  function choosePlaylist(playlist){
    spotifyApi.getPlaylistTracks(playlist.id)
      .then(res => {
        setPlaylistTracks(
        res.body.items.map(track => {
          // console.log(track)
          return {
            artist: track.track.artists[0].name,
            title: track.track.name,
            uri: track.track.uri,
            albumUrl: track.track.album.images[0].url,
            id: track.track.id
          }
        }))
      })
      console.log(playlistTracks)
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchPlaylists(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.playlists.items.map(playlist => {
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
  }, [search, accessToken])

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(playlist => (
          <PlaylistSearchResult
            playlist={playlist}
            key={playlist.uri}
            choosePlaylist={choosePlaylist}
          />
        ))}
      </div>
      <div>
        {playlistTracks.map(track =>
          <Playlist key={track.uri} track={track}/>
        )}
      </div>
    </Container>
  )
}
