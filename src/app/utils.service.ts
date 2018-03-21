import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UtilsService {
    constructor() {
    }
    /**
     * 搜索条件序列化
     */
    serializeParams(searchParams: any): String {
        let searchStr = '';

        for(let attr in searchParams) {
            if(searchParams[attr]){
                searchStr += `${searchStr.indexOf('?') < 0 ? '?' : '&'}${attr}=${searchParams[attr]}`;
            }
        }

        return searchStr;
    }

    /**
     * 冒泡检查是否点击了某个元素或其子元素
     */
    chcekElChain(_el: any, el: any): boolean {
        if (_el == el.nativeElement) {
            return true;
        } else {
            if (!_el.parentElement) {
                return false;
            } else {
                return this.chcekElChain(_el.parentElement, el);
            }
        }
    }

    /**
     * ajax 预处理方法
     */
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}