import { Component, OnInit } from '@angular/core';
import { ReportsSummaryService } from './reports-summary.service';
import { UtilsService } from '../../utils.service';
import { PromptService } from '../../common/prompt/prompt.service';
@Component({
    templateUrl: './reports-summary.component.html',
    styleUrls: ['./reports-summary.component.scss'],
    providers: [
        ReportsSummaryService
    ]
})
export class ReportsSummaryComponent implements OnInit {
    /**
     * 当前选中的报表
     */
    report: any = {
        custom: false
    };

    constructor(
        private prompt: PromptService,
        private reportsSummaryService: ReportsSummaryService,
        private utilsFns: UtilsService
    ) { };

    ngOnInit() {

    }

    /**
     * 重新生成
     */
    rebuild() {
        this.prompt.excute('prompt', {
            tip: '是否重新生成此报表？',
            otherTip: '原有的数据不会被保存。',
            successCallback() {
                
            }
        })
    }
    /**
     * 导出
     */
    export() {

    }
    /**
     * 生成图表
     */
    exportGraph() {

    }


    customReportList: any = {
        title: [
            {
                id: 'type',
                name: '数据日期',
                width: '25%',
            },
            {
                id: 'name',
                name: '最后生成时间',
                width: '25%'
            },
            {
                id: 'counts',
                name: '修改人',
                width: '25%',
            },
            {
                id: 'counts',
                name: '操作',
                width: '25%',
            }
        ],
        url: "/api/v1/mapProduct?numPerPage={pageSize}&pageNum={currentPage}"
    }
}
