import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  genre: string[];
  image: string;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    var info = this.spotifyService.getArtist(this.artistId);
    info.then(function(response) {
      this.artist = response;
      this.genre = response.genres;
      this.image = response.imageURL;
    }.bind(this));

   this.spotifyService.getRelatedArtists(this.artistId).then(function(response) {
    this.relatedArtists = response;
  }.bind(this));


  this.spotifyService.getTopTracksForArtist(this.artistId).then(function(response) {
    this.topTracks = response;
  }.bind(this));

  this.spotifyService.getAlbumsForArtist(this.artistId).then(function(response) {
    this.albums = response;
  }.bind(this));
    
  }

}