import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next(null);
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

