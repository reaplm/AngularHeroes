import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; //url to web api

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    //const heroes = of(HEROES);
    //this.messageService.add('HeroService: fetched heroes');
    //this.log('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('HeroService: fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T): (err: any, caught: Observable<Hero[]>) => import("rxjs").ObservableInput<any> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); //log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(operation + 'failed: ' + error.message);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    const hero = HEROES.find(h => h.id === id)!;
    //this.messageService.add('HeroService: fetched hero id=' + id)
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`))
    )
    return of(hero);
  }
  private log(message: string){
    this.messageService.add('HeroService: ' + message);
  }
}
