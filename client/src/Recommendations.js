import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";

export default function Recommendations({ spotifyApi }) {
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [selectedPlaylistName, setSelectedPlaylistName] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(false);
  let audio = new Audio();

  function addToPlaylist(playlist, track) {
    console.log(playlist, track);
    spotifyApi.addTracksToPlaylist(playlist, track).then((res) =>{
      console.log(res);
    })
  }

  function recommendTracks(playlist_id) {
    console.log(playlist_id);
    console.log(spotifyApi.getAccessToken());

    axios
      .post("/recommendations", {
        access_token: spotifyApi.getAccessToken(),
        playlist_id: playlist_id,
      })
      .then((res) => {
        setRecommendations(
          res.data.recommendations.map((track) => {
            console.log(track);
            return {
              artist: track.artists[0].name,
              id: track.id,
              uri: track.uri,
              name: track.name,
              preview_url: track.preview_url,
              image: track.album.images[0].url,
            }
          })
        );
        setSelected(true);
        setLoading(false);
      });
  }

  function start(url){
    audio.src = url
    audio.play()
  }

  function stop(){
    audio.pause()
  }

  useEffect(() => {
    spotifyApi.getUserPlaylists().then((res) => {
      console.log(res);
      setPlaylists(
        res.items.map((playlist) => {
          return {
            artist: playlist.owner.display_name,
            title: playlist.name,
            uri: playlist.uri,
            albumUrl: playlist.images[0].url,
            id: playlist.id,
          };
        })
      );
    });
  }, []);


  return (loading ? <div className="loader" 
    style={{display:"flex" ,justifyContent:"center", alignItems:"center",position:"absolute", width:"100vw", height:"100vh", backgroundColor:"#262626"}}>
  <PuffLoader loading={loading} size={400} color="#B0FF2F"></PuffLoader>
  </div> :
  !selected ? (
    <div className="flex-column" style={{margin: "1rem auto", width: "95vw"}}>
      <h1 style={{textTransform: "uppercase", color: "white"}}>//YOUR PLAYLISTS</h1>
      <div
        className="d-flex flex-row justify-content-around align-items-center"
        style={{ minWidth: "90vw", marginBottom: "2rem"}}
      >
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
            {playlists.map((playlist) => (
            <div className='track-card' style={{cursor: "pointer", width: "320px", marginBottom: "30px", padding: "1rem 1rem 0.5rem 1rem", backgroundColor: "#262626"}}
              onClick={() => {recommendTracks(playlist.id); setSelectedPlaylist(playlist.id); setSelectedPlaylistName(playlist.title); setLoading(!loading);}}
              key={playlist.uri}>
              <img className='track-card-img' style= {{width: "100%"}} src={playlist.albumUrl} alt={playlist.title}/>
              <div className='track-card-body'>
                <div style={{fontSize:"1rem", color: "white", marginTop: ".5rem"}}>{playlist.title}</div>
                <div className="text-muted">{playlist.artist}</div>
              </div>
            </div>
            ))}
          </div>
      </div>
    </div>
  ) : (
    <div className="flex-column" style={{margin: "1rem auto", width: "95vw"}}>
      <h1 style={{textTransform: "uppercase", color: "white"}}>//RECOMMENDATIONS FOR "{selectedPlaylistName}"</h1>
      <div
        className="d-flex flex-row justify-content-around align-items-center"
        style={{ minWidth: "90vw", marginBottom: "2rem"}}
      >
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
          {recommendations.map((track) => (
          <div className='track-card' style={{cursor: "pointer", width: "320px", marginBottom: "30px", padding: "1rem 1rem 0.5rem 1rem", backgroundColor: "#262626"}}
            key={track.id}>
            <img className='track-card-img' style= {{width: "100%"}} src={track.image} alt={track.name} 
              onMouseOver={() => start(track.preview_url)}
              onMouseOut={() => stop()}/>
            <div className='track-card-body' style={{marginTop: ".8rem"}}>
              <div className="d-flex justify-content-between">
                <div className="flex-column">
                  <div style={{fontSize:"1rem", color: "white", marginTop: ".5rem"}}>{track.name}</div>
                  <div className="text-muted">{track.artist}</div>
                </div>
                <div>
                  <a className="btn btn-lg" style={{backgroundColor: "#B0FF2F"}} onClick={() => addToPlaylist(selectedPlaylist, [track.uri])}>
                    <FontAwesomeIcon icon={faPlus} size="xl" style={{color: "#262626", margin: "auto"}} />
                  </a>
                </div>
              </div>
              {track.preview_url == null ? (<div style={{color:"red"}}>No preview available</div>) : (<div style={{color:"#262626"}}>Preview available</div>)}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>)
  );
}
