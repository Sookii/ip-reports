import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExtendNavService {
    constructor(private http: HttpClient) {

    }
    //获取导航数据
    getNavigationData(API: any) {
        let tempUrl = API;
        return this.http.get(tempUrl)
    }
}

