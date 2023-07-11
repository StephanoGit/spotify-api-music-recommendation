from util import generate_recommendation

from flask import Flask, request
import lyricsgenius
import os

app = Flask(__name__)

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
AUTH_ENDPOINT = os.getenv('AUTH_ENDPOINT')
REDIRECT_URI = os.getenv('REDIRECT_URI')

ACCESS_TOKEN_GENIUS = os.getenv('ACCESS_TOKEN_GENIUS')


scopes_new = ['streaming', 'user-read-email', 'user-read-private', 'user-library-read',
            'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state',
            'playlist-read-private', 'playlist-modify-private', 'playlist-read-collaborative',
            'playlist-modify-public', 'user-top-read', 'user-follow-read'];


genius = lyricsgenius.Genius(ACCESS_TOKEN_GENIUS)

@app.route('/lyrics', methods=['POST', 'GET'], strict_slashes=False)
def getSongLyrics():
    track = request.json['track']
    artist = request.json['artist']
    lyrics = genius.search_song(track, artist).lyrics
    return {'lyrics': lyrics}


@app.route('/login', methods=['POST'], strict_slashes=False)
def getLoginEndPoint():
    scopes = "%20".join(scopes_new)
    endPoint = (f"{AUTH_ENDPOINT}client_id={CLIENT_ID}"
                f"&redirect_uri={REDIRECT_URI}"
                f"&scope={scopes}"
                f"&response_type=token&show_dialog=true")
    return endPoint

@app.route('/recommendations', methods=['POST', 'GET'], strict_slashes=False)
def getRecommendations():
    playlist_id = request.json['playlist_id']
    access_token = request.json['access_token']
    recommendations = generate_recommendation(playlist_id=playlist_id, access_token=access_token)

    return {'recommendations': recommendations}