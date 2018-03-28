import { Component, OnInit } from '@angular/core';
import { ReportsSummaryService } from './reports-summary.service';
import { UtilsService } from '../../../utils.service';
import { PromptService } from '../../../common/prompt/prompt.service';
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
    /**
     * 当前报表周期
     */
    cycles: string[] = [];

    constructor(
        private prompt: PromptService,
        private reportsSummaryService: ReportsSummaryService,
        private utilsFns: UtilsService
    ) { };

    ngOnInit() {

    }

    /**
     * 获取报表基本信息
     */
    getReportInfo() {
        
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

    //生成周期选项
    getCycles(type: string) {
        let date = new Date();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();

        if (type == 'Monthly') {
            for (let i = 0; i < 15; i++) {
                let _date = new Date(currentYear, currentMonth - i, 1);
                this.cycles.push(`${_date.getFullYear()}年${_date.getMonth() + 1}月`);
            }
        } else {
            for (let i = 1; i < 5; i++) {
                let _date = new Date(currentYear, currentMonth - 3 * i, 1);
                this.cycles.push(this.getQuarter(_date.getFullYear(), _date.getMonth()));
            }
        }
    }
    //根据年月获取当年季度
    getQuarter(year: number, month: number) {
        let Quarter: string;
        switch (Math.floor(month / 3)) {
            case 0:
                Quarter = `${year}年第一季度`;
                break;
            case 1:
                Quarter = `${year}年第二季度`;
                break;
            case 2:
                Quarter = `${year}年第三季度`;
                break;
            case 3:
                Quarter = `${year}年第四季度`;
                break;
            default:
                break;
        }

        return Quarter;
    }
}
