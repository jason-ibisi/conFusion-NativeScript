import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class DishService {
    /**
     *
     */
    constructor(public http: HttpClient,
        private processHTTPMsgService: ProcessHTTPMsgService) {
    }

    getDishes(): Observable<Dish[]> {
        return this.http.get<any>(baseURL + 'dishes', {responseType: 'json'})
            .map((res) => { return this.processHTTPMsgService.extractData(res); })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }

    getDish(id: number): Observable<Dish> {
        return this.http.get<any>(baseURL + 'dishes/' + id, { responseType: 'json' })
            .map((res) => { return this.processHTTPMsgService.extractData(res); })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }

    getFeaturedDish(): Observable<Dish> {
        return this.http.get<any>(baseURL + 'dishes?featured=true', { responseType: 'json' })
            .map((res) => { return this.processHTTPMsgService.extractData(res)[0]; })
            .catch(error => { return this.processHTTPMsgService.handleError(error); });
    }
}