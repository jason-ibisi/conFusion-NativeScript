import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class DishService {
    /**
     *
     */
    constructor(public http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) {
    }

    getDishes(): Observable<Dish[]> {
        return this.http.get<Dish[]>(baseURL + 'dishes', {responseType: 'json'})
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getDish(id: number): Observable<Dish> {
        return this.http.get<Dish>(baseURL + 'dishes/' + id, { responseType: 'json' })
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedDish(): Observable<Dish> {
        return this.http.get<Dish[]>(baseURL + 'dishes?featured=true', { responseType: 'json' })
            .pipe(map(dishes => dishes[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}