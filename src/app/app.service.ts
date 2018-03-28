import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { UtilsService } from './utils.service';
@Injectable()
export class AppService {
    user: any;
    constructor(
        private http: HttpClient,
        private utilsFns: UtilsService
    ) { }


    /**
     * 接口定义
     */
    userApi = '/api/v1/currentUser';                                    //用户登录，登出，获取用户信息接口
    extendNavApi = '/api/v1/resource/rightTopResources';                //系统扩展菜单接口

    /**
     * 用户登录
     */
    login() {
        return this.http.post(this.userApi, { username: 'admin', password: '123456' })
            .pipe(
                catchError(this.utilsFns.handleError)
            )
    }
    /**
     * 获取用户信息
     */
    getUserInfo() {
        return this.http.get(this.userApi)
            .pipe(
                catchError(this.utilsFns.handleError)
            )
    }
    /**
     * 用户登出
     */
    logout() {
        return this.http.delete(this.userApi)
            .pipe(
                catchError(this.utilsFns.handleError)
            )
    }
    /**
     * 获取更多下的系统扩展菜单
     */
    getExtendNav() {
        return this.http.get(this.extendNavApi)
            .pipe(
                catchError(this.utilsFns.handleError)
            );
    }

}
