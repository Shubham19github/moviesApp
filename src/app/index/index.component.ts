import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  filterAllowedValues: string[] = ['Popularity','Release Date','Revenue','Primary Release Date','Original Title','Vote Average','Vote Count'];
  defaultFilterValue = this.filterAllowedValues[0];
  
  sortType: string[] = ['ascending', 'descending'];
  defaultSortType = this.sortType[1];

  sortBy : string;
  urlInitial : string = 'https://api.themoviedb.org/3/discover/movie?sort_by=';
  apiKey : string = '&api_key=61b806c375d20db119bc3c28b3ee29f5';
  fullUrl : string;
  urlVariable : any;
  metaDataMovies :any;
  defaultImage :string='./assets/Images/movie.png';   // this is the placeholder image which can be used if can't retrieve poster from api
  posterImagePaths = [];

  constructor(private apiService : ApiService,
              private router : Router) { }

  ngOnInit() {
    if(this.apiService.sortType === '' && this.apiService.filterValue === ''){
      this.filter();
    } else {
      this.defaultFilterValue = this.apiService.filterValue;
      this.defaultSortType = this.apiService.sortType;
      this.filter();
    }
    
  }

  filter(){
    this.posterImagePaths = [];

    if(this.defaultSortType==='ascending'){

        switch (this.defaultFilterValue) {
          case "Popularity":
            this.sortBy = 'popularity.asc';
            break;
          case "Release Date":
            this.sortBy = 'release_date.asc';
            break;
          case "Revenue":
            this.sortBy = 'revenue.asc';
            break;
          case "Primary Release Date":
            this.sortBy = 'primary_release_date.asc';
            break;
          case "Original Title":
            this.sortBy = 'original_title.asc';
            break;
          case "Vote Average":
            this.sortBy = 'vote_average.asc';
            break;
          case "Vote Count":
            this.sortBy = 'vote_count.asc';
            break;
        }

    } else {

      switch (this.defaultFilterValue) {
        case "Popularity":
          this.sortBy = 'popularity.desc';
          break;
        case "Release Date":
          this.sortBy = 'release_date.desc';
          break;
        case "Revenue":
          this.sortBy = 'revenue.desc';
          break;
        case "Primary Release Date":
          this.sortBy = 'primary_release_date.desc';
          break;
        case "Original Title":
          this.sortBy = 'original_title.desc';
          break;
        case "Vote Average":
          this.sortBy = 'vote_average.desc';
          break;
        case "Vote Count":
          this.sortBy = 'vote_count.desc';
          break;
      }

    }

    this.fullUrl = this.urlInitial + this.sortBy + this.apiKey;
   
    this.apiService.getMoviesList(this.fullUrl).then((data : any) => {

      this.metaDataMovies = data.results;

      // checking value != Null, if it is then setting src as the placeholder image.
      this.metaDataMovies.forEach(metaData => {

        //For now Displaying only those Movies which has poster.
        if(metaData.poster_path!=null){
          this.posterImagePaths.push({path:'http://image.tmdb.org/t/p/w185//'+metaData.poster_path, title:metaData.title, id:metaData.id});
        } 

        //To Display the movie with the placeholder image.

        // else {
        //   this.posterImagePaths.push({path:this.defaultImage, title:metaData.title, id:metaData.id});
        // }

      });

    }).catch(function(error) {
      console.log(error.message)
    });

    

  }

  openMovieDetail(id){
    this.apiService.filterValue = this.defaultFilterValue;
    this.apiService.sortType = this.defaultSortType;
    console.log(this.apiService.filterValue);
    console.log(this.apiService.sortType);
    this.router.navigate(['/movie',id]);
  }

}
