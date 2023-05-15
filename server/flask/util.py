import pandas as pd
import numpy as np
import random

import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyOAuth

def connect_to_spotify(access_token):
    sp = spotipy.Spotify(auth=access_token)
    return sp


def playlist_to_df(playlist_id, sp):
    playlist_df = pd.DataFrame()
    
    features = list(sp.audio_features("1yxgsra98r3qAtxqiGZPiX")[0].keys())[:11]
    feature_df = pd.DataFrame([features])
    feature_df.columns = feature_df.iloc[0]
    feature_df = feature_df[1:]

    for i, track in enumerate(sp.playlist(playlist_id)["tracks"]["items"]):
        playlist_df.loc[i, 'track_id'] = track["track"]["id"]
        playlist_df.loc[i, 'track'] = track["track"]["name"]
        
        playlist_df.loc[i, 'artist_id'] = track["track"]["artists"][0]["id"]
        playlist_df.loc[i, 'artist'] = track["track"]["artists"][0]["name"]
        
        playlist_df.loc[i, 'popularity'] = track["track"]["popularity"]
        playlist_df.loc[i, 'duration_ms'] = track["track"]["duration_ms"]
        playlist_df.loc[i, 'added_at'] = track["added_at"]
        
        
        feature_df = feature_df.append(sp.audio_features(track["track"]["id"]), ignore_index=True).iloc[: , :-7]
    
    playlist_df['added_at'] = pd.to_datetime(playlist_df['added_at'])
    final_playlist_df = pd.concat([playlist_df, feature_df], axis=1)

    return final_playlist_df


def get_feature_vector(playlist_id, sp):
    final_playlist_df = playlist_to_df(playlist_id=playlist_id, sp=sp)

    f_list = {}
    t = final_playlist_df.iloc[:,-11:]
    for column in t:
        if column == "key" or column == "mode":
            v = int(format(t[column].mean(), ".0f"))
        else:
            v = format(t[column].mean(), ".3f")
        f_list[column] = v
    print(len(final_playlist_df), random.randint(0, len(final_playlist_df)-1))
    return f_list, final_playlist_df["artist_id"][random.randint(0, len(final_playlist_df))]

def generate_recommendation(playlist_id, access_token):
    sp = connect_to_spotify(access_token=access_token)
    playlist_df = playlist_to_df(playlist_id=playlist_id, sp=sp)
    feature_vector, artist = get_feature_vector(playlist_id=playlist_id, sp=sp)
    print(artist)

    track_recomm = sp.recommendations([artist], [], [],
                                  target_danceability=feature_vector["danceability"],
                                  target_energy=feature_vector["energy"],
                                  target_loudness=feature_vector["loudness"],
                                  target_speechiness=feature_vector["speechiness"],
                                  target_acousticness=feature_vector["acousticness"],
                                  target_instrumentalness=feature_vector["instrumentalness"],
                                  target_liveness=feature_vector["liveness"],
                                  target_valence=feature_vector["valence"],
                                  target_tempo=feature_vector["tempo"],
                                  target_key=feature_vector["key"],
                                  target_mode=feature_vector["mode"],
                                  limit = 15)['tracks']
    
    for i, t in enumerate(track_recomm):
        print(f"{i}. {t['name']} -- {t['artists'][0]['name']}")
    
    # for i, t in enumerate(track_recomm):
    #     if t['name'] not in playlist_df['track'].values:
    #         print(f"{i}. {t['name']} -- {t['artists'][0]['name']}")

    for i, t in enumerate(track_recomm):
        if t['name'] in playlist_df['track'].values:
            del track_recomm[i]

    print("\n")
    print("\n")
    
    for i, t in enumerate(track_recomm):
        print(f"{i}. {t['name']} -- {t['artists'][0]['name']}")

    return track_recomm