import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { movies } from '../models/defaultMovies';
import { Movie } from '../models/movie';
import { SearchService } from '../services/search/search.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchResult = movies;
  nominationList: Movie[] = [];
  isAddNewDisabled = false;
  searchText!: string;

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    let userString: any;
    if (localStorage.getItem('localNominationList')) {
      userString = localStorage.getItem('localNominationList');
    } else {
      userString = '{}';
    }
    console.log(userString);
    this.nominationList = JSON.parse(userString);
    if (this.nominationList.length >= 5) {
      this.isAddNewDisabled = true;
      this.snackBar.open('Nomination List Full!', 'Close', { duration: 1000, verticalPosition: 'top' });
    }
  }

  searchMovie(): any {
    this.searchService.searchMovieByTitle(this.searchText).subscribe(result => {
      this.searchResult = result.Search;
      console.log(this.searchResult);
    });
  }

  nominateMovie(movie: Movie): any {
    if (this.nominationList.length <= 5) {
      this.nominationList.push(movie);
      console.log(this.nominationList);
    }

    if (this.nominationList.length >= 5) {
      this.isAddNewDisabled = true;
      this.snackBar.open('Nomination List Full!', 'Close', { duration: 1000, verticalPosition: 'top' });

    } else {
      this.snackBar.open('Added to the Nomination List!', 'Close', { duration: 1000, verticalPosition: 'top' });
    }
  }
  removeMovie(movie: Movie): any {
    const removeIndex = this.nominationList.indexOf(movie);
    if (removeIndex > -1) {
      this.nominationList.splice(removeIndex, 1);
      this.isAddNewDisabled = false;
    }
    this.snackBar.open('Removed from the Nomination List!', 'Close', { duration: 1000, verticalPosition: 'top' });

  }

  saveList(): any {
    localStorage.setItem('localNominationList', JSON.stringify(this.nominationList));
  }

}
