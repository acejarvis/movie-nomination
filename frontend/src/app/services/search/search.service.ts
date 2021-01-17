import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { HttpClientHelperService } from '../web/http-client-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClientHelperService
  ) { }

  searchMovieByTitle(searchString: string): Observable<any> {
    return this.http.dashGet('s=' + searchString + '&type=movie');
  }

  searchMovieByImdbID(imdbID: string): Observable<Movie> {
    return this.http.dashGet('i=' + imdbID);
  }
}
