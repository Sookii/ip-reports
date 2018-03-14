import { Component, OnInit } from '@angular/core';
import { ReportsListService } from './repotts-list.service';
@Component({
    templateUrl: './reports-list.component.html',
    styleUrls: ['./reports-list.component.scss'],
    providers: [
        ReportsListService
    ]
})
export class ReportsListComponent implements OnInit {

    constructor(
        private reportsListService: ReportsListService
    ) { };

    ngOnInit() {

    }


    productsTable: any = {
        title: [
            {
                id: 'chineseproductname',
                name: '产品名称',
                width: '9.09%',
            },
            {
                id: 'goodsname',
                name: '商品名称',
                width: '9.09%'
            },
            {
                id: 'formulation',
                name: '剂型',
                width: '9.09%',
            },
            {
                id: 'chinesespecification',
                name: '规格',
                width: '9.09%'
            },
            {
                id: 'registerno',
                name: '批准文号',
                width: '9.09%'
            },
            {
                id: 'chinesemanufacturename',
                name: '生产厂家',
                width: '9.09%'
            },
            {
                id: 'propertyText',
                name: '产品属性',
                width: '9.09%'
            },
            {
                id: 'transspecification',
                name: '转换规格',
                width: '9.09%'
            },
            {
                id: 'ddd',
                name: 'ddd值',
                width: '9.09%'
            },
            {
                id: 'enabled',
                name: '产品状态',
                width: '9.09%'
            }
        ],
        url: "/api/v1/mapProduct?numPerPage={pageSize}&pageNum={currentPage}",
        hasCheckbox: true,
        // duplicateRow: true
    }
}
