import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"

export default function Profile({spotifyApi}) {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        product: '',
        url: '',
        photo: '',
    });
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [followedArtists, setFollowedArtists] = useState([]);
    const [loadedData, setLoadedData] = useState(false);

    // const [followedUsers, setFollowedUsers] = useState([]);
    let audio = new Audio();
    function start(url){
      audio.src = url
      audio.play()
    }
  
    function stop(){
      audio.pause()
    }


    useEffect(() => {
        spotifyApi.getMe().then((res) => {
          // console.log(res)
            setProfile({
                name: res.display_name,
                email: res.email,
                product: res.product,
                url: res.external_urls.spotify,
                photo: res.images[0].url
            }
            )
        })
    }, [])

    useEffect(() => {
      spotifyApi.getMyTopArtists({ limit: 4 }).then((res) => {
        // console.log(res)
        setTopArtists(
          res.items.map((artist) => {
            return {
              name: artist.name,
              image: artist.images[0].url,
              genres: artist.genres,
              url: artist.external_urls.spotify,
              id: artist.id,
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    spotifyApi.getMyTopTracks({ limit: 4 }).then((res) => {
        setTopTracks(
          res.items.map((track) => {
            return {
              artist: track.artists[0].name,
              id: track.id,
              uri: track.uri,
              name: track.name,
              preview_url: track.preview_url,
              image: track.album.images[0].url,
            };
          })
        );
    });
}, []);

useEffect(() => {
  spotifyApi.getFollowedArtists({ limit: 10 }).then((res) => {
    // console.log(res)
      setFollowedArtists(
        res.artists.items.map((artist) => {
          return {
            name: artist.name,
            image: artist.images[0].url,
            genres: artist.genres,
            url: artist.external_urls.spotify,
            id: artist.id,
          };
        })
      );
  });
}, []);

console.log(topTracks);

  return (
  <div className="profile-info" style={{display:"flex", width:"90vw", margin:"auto", marginTop:"50px", gap:"5vw"}}>
      <div className="profile-details" style={{display:"flex", flexDirection:"column", alignItems:"center",width:"30vw"}}>
        <img src={profile.photo} alt="profile" style={{width:"200px", height:"200px", objectFit:"cover", borderRadius:"100px"}}/>
        <p>{profile.name}</p>
        <p>{profile.email}</p>
        <p>{profile.product}</p>
        <a href={profile.url}>Spotify Profile</a>
      </div>
      <div className="profile-tops">
        <h2>Top Tracks</h2>
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
          {topTracks.map((track) => (
            <div
            className="card"
            style={{
              cursor: "pointer",
              width: "220px",
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
            </div>
          </div>
          ))}
          </div>

          <h2>Top Artists</h2>
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
          {topArtists.map((artist) => (
            <div
            className="card"
            style={{
              cursor: "pointer",
              width: "220px",
              marginBottom: "30px",
            }}
            key={artist.id}
          >
            <a href={artist.url} target="_blank" rel="noreferrer">
              <img
              className="card-img-top"
              src={artist.image}
              alt={artist.name}
              />
            </a>
            <div className="card-body">
              <div>{artist.name}</div>
              <div className="text-muted">{artist.genres}</div>
            </div>
            </div>
          ))}
          </div>

          <h2>Followed Artists</h2>
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
          {followedArtists.map((artist) => (
            <div
            className="card"
            style={{
              cursor: "pointer",
              width: "220px",
              marginBottom: "30px",
            }}
            key={artist.id}
          >
            <a href={artist.url} target="_blank" rel="noreferrer">
              <img
              className="card-img-top"
              src={artist.image}
              alt={artist.name}
              />
            </a>
            <div className="card-body">
              <div>{artist.name}</div>
              <div className="text-muted">{artist.genres}</div>
            </div>
            </div>
          ))}
          </div>

      </div>
    </div>
  )
}
