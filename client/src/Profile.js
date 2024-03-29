import React, {useEffect, useState} from 'react'
import "./style/Profile.css";

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
          if (res.images.length < 1) {
            setProfile({
              name: res.display_name,
              email: res.email,
              product: res.product,
              url: res.external_urls.spotify,
              photo: 'https://ps.w.org/basic-user-avatars/assets/icon-256x256.png?rev=2560641'
          }
          )
          }
          else {
            setProfile({
              name: res.display_name,
              email: res.email,
              product: res.product,
              url: res.external_urls.spotify,
              photo: res.images[1].url
          }
          )
          }
        })
    }, [])

    useEffect(() => {
      spotifyApi.getMyTopArtists({ limit: 4 }).then((res) => {
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

  return (
    <div className='profile' style={{display:"flex", flexDirection:"column", width:"90vw", margin:"auto", marginTop:"50px", gap:"5vw"}}>
      <div className='profile-about'>
        <h1>//PROFILE</h1>
        <div className='d-flex'>
          <img src={profile.photo} alt="profile" style={{width:"200px", height:"200px", objectFit:"cover"}}/>
          <div className='flex-column'>
            <p>{profile.name}</p>
            <p>{profile.email}</p>
            <p>{profile.product}</p>
            <a href={profile.url} style={{color: "#B0FF2F"}}>Spotify Profile</a>
          </div>
        </div>
      </div>
      <div className="separator"></div>

      <div className='profile-fav-tracks'>
        <h1>//FAVOURITE TRACKS</h1>
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
          {topTracks.length === 0 ? <h3>The stats for your favourite tracks has not been yet generated, listen to more tracks...</h3> :
          topTracks.map((track) => (
          <div className='track-card' style={{cursor: "pointer", width: "260px", marginBottom: "30px", padding: "1rem 1rem 0.5rem 1rem", backgroundColor: "#262626"}} key={track.id}>
            <img className='track-card-img' style= {{width: "100%"}} src={track.image} alt={track.name} onMouseOver={() => start(track.preview_url)} onMouseOut={() => stop()}/>
            <div className='track-card-body'>
              <div style={{fontSize:"1rem", color: "white", marginTop: ".5rem"}}>{track.name}</div>
              <div className="text-muted">{track.artist}</div>
              {track.preview_url == null ? (<div style={{color:"red"}}>No preview available</div>) : (<div style={{color:"#262626"}}>Preview available</div>)}
            </div>
          </div>
          ))}
          </div>
      </div>

      <div className="separator"></div>
      <div className='profile-top-artists'>
        <h1>//FAVOURITE ARTISTS</h1>
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
          {topArtists.length === 0 ? <h3>The stats for your favourite artists has not been yet generated, listen to more artists...</h3> :
          topArtists.map((artist) => (
          <div className='track-card' style={{cursor: "pointer", width: "260px", marginBottom: "30px", padding: "1rem 1rem 0.5rem 1rem", backgroundColor: "#262626"}} key={artist.id}>
            <a href={artist.url} target='_blank'><img className='track-card-img' style= {{width: "100%"}}src={artist.image} alt={artist.name}/></a>
            <div className='track-card-body'>
              <div style={{fontSize:"1rem", color: "white", marginTop: ".5rem"}}>{artist.name}</div>
              <div className="text-muted">{artist.genres}</div>
            </div>
          </div>
          ))}
          </div>
      </div>

      <div className="separator"></div>
      <div className='profile-followed-artists'>
        <h1>//FOLLOWED ARTISTS</h1>
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
          {followedArtists.length === 0 ? <h3>It seems like you don't follow any artists</h3> :
          followedArtists.map((artist) => (
          <div className='track-card' style={{cursor: "pointer", width: "260px", marginBottom: "30px", padding: "1rem 1rem 0.5rem 1rem", backgroundColor: "#262626"}} key={artist.id}>
            <a href={artist.url} target='_blank'><img className='track-card-img' style= {{width: "100%"}}src={artist.image} alt={artist.name}/></a>
            <div className='track-card-body'>
              <div style={{fontSize:"1rem", color: "white", marginTop: ".5rem"}}>{artist.name}</div>
              <div className="text-muted">{artist.genres}</div>
            </div>
          </div>
          ))}
          </div>
      </div>
      </div>
  )
}
