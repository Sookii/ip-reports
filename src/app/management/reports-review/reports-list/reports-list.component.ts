import { Component, OnInit } from '@angular/core';
import { ReportsListService } from './repotts-list.service';
import { UtilsService } from '../../../utils.service';
@Component({
    templateUrl: './reports-list.component.html',
    styleUrls: ['./reports-list.component.scss'],
    providers: [
        ReportsListService
    ]
})
export class ReportsListComponent implements OnInit {
    searchParams: any = new Object();
    //分类选项配置
    reportTypes: any[] = [
        { name: 123 },
        { name: 456 }
    ]


    constructor(
        private reportsListService: ReportsListService,
        private utilsFns: UtilsService
    ) { };

    ngOnInit() {

    }


    productsTable: any = {
        title: [
            {
                id: 'type',
                name: '分类',
                width: '30%',
            },
            {
                id: 'name',
                name: '报表名称',
                width: '50%'
            },
            {
                id: 'counts',
                name: '已生成数量',
                width: '20%',
            }
        ],
        url: "/api/v1/mapProduct?numPerPage={pageSize}&pageNum={currentPage}"
    }

    search() {
        let conditions = this.utilsFns.serializeParams(this.searchParams);
    }
}
