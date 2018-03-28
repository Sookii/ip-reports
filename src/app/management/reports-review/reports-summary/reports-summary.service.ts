import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { UtilsService } from '../../../utils.service';
@Injectable()
export class ReportsSummaryService {
    constructor(
        private http: HttpClient,
        private utilsFns: UtilsService
    ) { }


    /**
     * 接口定义
     */
    
}
