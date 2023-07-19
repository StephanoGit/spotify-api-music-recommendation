

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

![GitHub last commit](https://img.shields.io/github/last-commit/StephanoGit/spotify-api-music-recommendation) ![GitHub repo size](https://img.shields.io/github/repo-size/StephanoGit/spotify-api-music-recommendation)


# Spotify Track Recommendations
This is a web application project that uses the Spotify API in order to generate recommendations based on the playlists of the autheticated user. The user is not only just able to get recommendations, but to get previews of tracks before adding them and play any given song in full length.

Kindly take note that the utilization of this application is exclusively available for premium Spotify accounts. Please understand that this restriction is not of my choosing but rather a result of the various limitations imposed by the Spotify API.
    
> 📘 Info
> 
>The Spotify API does not permit the usage of their extended quota mode for personal projects. The extended quota mode is usually reserved for specific commercial purposes or applications that serve a larger user base. Since you are using the API for a personal project, it falls outside the scope of the extended quota mode.
    
To ensure complete accessibility to the website, it is imperative that I include you in a whitelist, which requires your full name and the email address associated with your premium Spotify account. Please email them at <poporaduu@gmail.com> with the subject `Spotify Recommendation Whitelist`. 


## Table of Contents
1. How to run the project
2. Project stucture
3. Future Improvements


## How to run the project
Note that the project is hosted using Heroku at https://arcane-stream-35686-3ba02fe740f7.herokuapp.com/ and you must make some changes to the project before running it: change the `proxy` field in `client/package.json` to `localhost:5000`.

After performing the changes mentioned above, run the following commands:
>`pip install -r requirements.txt` - Installs all the python libraries required by the project. Please note the fact that is good practice to create an environment before using this command as it **can pollute your machine**. Please check the `venv` documentation [here](https://docs.python.org/3/library/venv.html#creating-virtual-environments) on how to create your virtual environment.
>>
>`cd client`
>
>> `npm install` - Installs all the node modules necessary for the project\
>> `npm run start` - Runs the app (aka the frontend) in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
>
>`cd .. `
>
>>`flask run api.py` - Starts the flask server (aka. the backend of the application).

## Project structure
For this project I have chosen to use React and Bootstrap for the frontend and Flask for the backend because:
1. Flask backend:
    * It is a lightweight and popular web framework for Python, primarily used to build web applications and APIs
    * Suitable choice for small to medium-sized projects
    * Allows developers to create endpoints (URL routes) that respond to HTTP requests from clients
        * `\login` - returns itself an endpoint that the user is able to access in order to login with its spotify account.
        * `\lyrics` - returns the lyrics of a given track using the Genius API.
        * `\recommendations` - returns the recommendations based of a selected playlist.
            * This can be considered the primary function of my application. To generate music recommendations based on a given playlist, the [Spotify API's `\recommendations` endpoint](https://developer.spotify.com/documentation/web-api/reference/get-recommendations) requires multiple parameters to find suitable tracks. To achieve this, I adopted a machine learning approach by creating a feature vector consisting of 11 essential features that classify any track: `danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence, tempo, key, and mode`. Initially, we extract these features from every song in the selected playlist and calculate the mean value for each of the 11 features. Additionally, we randomly select an artist from the playlist, and then we make the call to [Spotify API's `\recommendations` endpoint](https://developer.spotify.com/documentation/web-api/reference/get-recommendations).
            > ⚠️ Important
            >
            > This strategy enables the integration of more sophisticated machine learning techniques, like cosine similarity or euclidian distance. Initially, I considered implementing cosine similarity, but I encountered a challenge in finding an updated dataset. The most recent [dataset](https://www.kaggle.com/yamaerenay/spotify-dataset-19212020-160k-tracks) available was from 2020, which is considerably outdated for music recommendations.
        
2. React + Bootstrap frontend:
    * Both React and Bootstrap follow a component-based architecture, where the user interface is divided into reusable and independent components, each responsible for its rendering and behavior.
        > ![React Components Diagram](https://github.com/StephanoGit/images/blob/main/Spotify%20React%20diagram.png)
    * React sends HTTP requests to the Flask backend to fetch or submit data from and to the server.

## Future Improvements
1. The primary modification I would make to my project involves the organization of React components. Instead of dispersing essential user data like access tokens, refresh tokens, email, and Spotify account type among various components like the profile and app, I would opt to create a centralized DataLayer. This `DataLayer` would serve as an encompassing structure for the entire project, ensuring that crucial user information remains accessible to all components, thus eliminating any redundant data storage and API calls.
2. Further divide the Recommendation component. Although I initially experimented with inline React styling, I acknowledge that this practice is not ideal and should be avoided in the future. Dividing the Recommendation component into smaller, more manageable components would facilitate better organization and maintenance.
3. Read the entire documentation in order to find out what is possible and what not. I was unaware of the fact the non premium user will not be able to use my application until I started testing it by sending it to multiple users.