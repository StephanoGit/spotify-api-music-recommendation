import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Recommendations({ spotifyApi }) {
  const [playlists, setPlaylists] = useState([]);
  const [selected, setSelected] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recommendations, setRecommendations] = useState([]);


  let audio = new Audio();

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
            // console.log(track);
            return {
              artist: track.artists[0].name,
              id: track.id,
              name: track.name,
              preview_url: track.preview_url,
              image: track.album.images[0].url,
            }
          })
        );
        setSelected(true);
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

  return !selected ? (
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
            onClick={() => recommendTracks(playlist.id)}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
