import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../utils.service';
@Component({
    templateUrl: './reports-manage.component.html',
    styleUrls: ['./reports-manage.component.scss'],
})
export class ReportsManageComponent implements OnInit {
    searchParams: any = new Object();
    //分类选项配置
    reportTypes: any[] = [
        { name: 123 },
        { name: 456 }
    ]

    status: true;

    constructor(
        private utilsFns: UtilsService
    ) { };

    ngOnInit() {

    }

    getStatus() {
        console.log(this.status)
    }

    reportsManageTable: any = {
        title: [
            {
                id: 'type',
                name: '分类',
                width: '15%',
            },
            {
                id: 'name',
                name: '报表模板名称',
                width: '30%'
            },
            {
                id: 'modify',
                name: '修改人',
                width: '10%'
            },
            {
                id: ' updateTime',
                name: '修改日期',
                width: '10%'
            },
            {
                id: 'counts',
                name: '已生成报表数量',
                width: '10%',
            },
            {
                id: 'state',
                name: '显示状态',
                width: '10%'
            },
            {
                id: '',
                name: '操作',
                width: '15%'
            }
        ],
        url: "/api/v1/mapProduct?numPerPage={pageSize}&pageNum={currentPage}"
    }

    search() {
        let conditions = this.utilsFns.serializeParams(this.searchParams);
    }

    /**
     * 预览报表
     */
    previewReport(item: any) {

    }

    /**
     *  编辑报表
     */
    editReport(item: any) {

    }

    /**
     * 复制报表
     */
    copyReport(item: any) {
        debugger
    }

    /**
     * 删除报表
     */
    deletReport(item: any) {
        debugger
    }

    /**
     * 移动报表
     */
    moveTo(item: any) {
        debugger
    }
}
