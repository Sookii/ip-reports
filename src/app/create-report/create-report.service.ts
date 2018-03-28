import { Injectable } from '@angular/core';

@Injectable()
export class CreateReportService {
    reportTemplate: any;

    constructor( ) { }

    progress: number = 1;   //进度
}
