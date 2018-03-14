import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../../config.service';
@Injectable()
export class ReportsListService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) { }


    /**
     * 接口定义
     */
    
}
