import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-pelucilas-poster-grid',
  templateUrl: './pelucilas-poster-grid.component.html',
  styleUrls: ['./pelucilas-poster-grid.component.css']
})
export class PelucilasPosterGridComponent implements OnInit {

  @Input() movies!: Movie[];

  constructor( private router: Router) { }

  ngOnInit(): void {
    console.log(this.movies)
  }

  onMovieClick( movie: Movie ) {
    this.router.navigate(['/pelicula',movie.id])
    
  }
}
