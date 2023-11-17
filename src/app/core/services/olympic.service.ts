import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface Country {
  id: number;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient , private router: Router ) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {

        console.error(error);
        this.olympics$.next(null);
        this.router.navigate(['error']);
        return caught;
      })
    );
  }

  

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getCountryDetailsById( id : number){
    return this.olympics$.pipe(
      map((olympics) => {
        if (olympics) {
          return olympics.find((country: Country) => country.id === id);
        }
        return null;
      })
    );
  }

  }

