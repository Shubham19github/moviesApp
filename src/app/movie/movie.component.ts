import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  id : string;
  urlInitial : string = 'https://api.themoviedb.org/3/movie/';
  apiKey : string = '?api_key=61b806c375d20db119bc3c28b3ee29f5';
  fullUrl : string;

  dataArrived : boolean = false;
  movieDetail: any;
  posterImage : string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fullUrl = this.urlInitial + this.id + this.apiKey;

    this.apiService.getMovieDetail(this.fullUrl).then((data : any) => {

      this.movieDetail = data;
      this.posterImage = 'http://image.tmdb.org/t/p/w342/'+this.movieDetail.poster_path;

      this.dataArrived = true;

    }).catch(function(error) {
      console.log(error.message)
    });
  }

  goBack(){
    this.router.navigate(['/movies']);
  }

}
