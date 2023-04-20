const authEndPoint = "https://accounts.spotify.com/authorize?"
const client_id = "70416d4acd4f41d187541cd8cbf8f1a5"
const redirect_uri = "http://localhost:3000"
const scopes = "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export const loginEndPoint = `${authEndPoint}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`