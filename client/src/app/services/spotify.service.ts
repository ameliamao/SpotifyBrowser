import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var promise = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    return promise.then();
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    return this.sendRequestToExpress('/search/' + category + '/'+ encodeURIComponent(resource)).then((data) => {
      console.log(data);
      if (category == 'artist') {
        return data['artists']
       ['items'].map((artist) => {
          return new ArtistData(artist);

        });

      }
      else if (category == 'track') {
        return data['tracks']
        ['items'].map((tracks) => {
           return new TrackData(tracks);
         });
      }
      // album case
      else if (category == 'album') {
        return data['albums']
        ['items'].map((albums) => {
           return new AlbumData(albums);
         });     
      }
      return null;
    });

    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
  }

  getArtist(artistId:string):Promise<ArtistData> {
    return this.sendRequestToExpress('/artists/'+ encodeURI(artistId)).then((data) => {
      return data;
    });
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    return this.sendRequestToExpress('/artists/'+ encodeURI(artistId) + '/related-artists').then((data) => {
      return data['artists'].map((artist) => {
         return new ArtistData(artist);
       });   
    });
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress('/artists/'+ encodeURI(artistId) + '/top-tracks').then((data) => {
      return data['tracks'].map((track) => {
        return new TrackData(track);
      });   
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artists/'+ encodeURI(artistId) +'/albums').then((data) => {
      return data['items'].map((album) => {
        return new AlbumData(album);
      });   
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return null;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return null;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return null;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return null;
  }
}
