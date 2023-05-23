import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";

export default function Recommendations({ spotifyApi }) {
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
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

console.log(playlists);

  return loading ? <div className="loader" 
    style={{display:"flex" ,justifyContent:"center", alignItems:"center",position:"absolute", width:"100vw", height:"100vh", backgroundColor:"white"}}>
  <PuffLoader loading={loading} size={400} color="#1ED760"></PuffLoader>
  </div> :
  !selected ? (
    <div
      className="d-flex flex-row justify-content-around align-items-center"
      style={{ minWidth: "100vw", marginTop: "50px" }}
    >
      <div
        className="d-flex justify-content-around flex-wrap"
        style={{ width: "95vw" }}
      >
        {playlists.map((playlist) => (
          <div
            className="card"
            style={{ cursor: "pointer", width: "300px", marginBottom: "30px" }}
            onClick={() => {recommendTracks(playlist.id); setSelectedPlaylist(playlist.id); setLoading(!loading);}}
            key={playlist.uri}
          >
            <img
            className="card-img-top"
            src={playlist.albumUrl}
            alt={playlist.title}
            />
            <div className="card-body">
              <div>{playlist.title}</div>
              <div className="text-muted">{playlist.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <div
        className="d-flex flex-row justify-content-around align-items-center"
        style={{ minWidth: "100vw", marginTop: "50px" }}
      >
        <div
          className="d-flex justify-content-around flex-wrap"
          style={{ width: "95vw" }}
        >
          {recommendations.map((track) => (
            <div
              className="card"
              style={{
                cursor: "pointer",
                width: "300px",
                marginBottom: "30px",
              }}
              key={track.id}
            >
              <img
                className="card-img-top"
                src={track.image}
                alt={track.name}
                onMouseOver={() => start(track.preview_url)}
                onMouseOut={() => stop()}
              />
              <div className="card-body">
                <div>{track.name}</div>
                <div className="text-muted">{track.artist}</div>
                {track.preview_url == null ? (<div style={{color:"red"}}>No preview available -- Use Search Track</div>) : <div/>}
                <a className="btn btn-lg rounded-pill" style={{backgroundColor: "#212121", float: "right"}} onClick={() => addToPlaylist(selectedPlaylist, [track.uri])}>
                  <FontAwesomeIcon icon={faPlus} size="xl" style={{color: "white",}} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
