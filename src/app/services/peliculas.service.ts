import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';


import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { CreditResponse, Cast } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor( private http: HttpClient ) { }

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false; 

  get params() {
    return {
      api_key:'2043ac3da437771bb8adb14024c5a4e7',
      language: 'es-ES',
      page: this.carteleraPage
      }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if(this.cargando) {
      return of([]);
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );

  }

  buscarPeliculas( texto: string ): Observable <Movie[]> {

    const params = {...this.params, page: '1', query: texto};

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results)
    )
  }

  getPeliculaDetalle( id:string ){
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`,{params: this.params})
    .pipe(
      catchError(err => of(err))
    )
  }

  getCast( id:string ): Observable<Cast[]>{
    return this.http.get<CreditResponse>(`${this.baseUrl}/movie/${id}/credits`,{params: this.params}).pipe(
      map( resp => resp.cast ),
      catchError(err => of(err))
    );

  }


}
