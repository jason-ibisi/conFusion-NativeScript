import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProcessHTTPMsgService {

    constructor() {}

    public handleError(error: HttpErrorResponse | any) {
        let errMsg: string;

        if(error.error instanceof ErrorEvent) {
            errMsg = error.error.message;
        }
        else {
            `${error.status} - ${error.statusText || ''} ${error.message}`;
        }

        return throwError(errMsg);
    }
}