import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PromptService } from '../common/prompt/prompt.service';
import { AppService } from '../app.service';

export class ReportTemplate {
    cycle: number;
    categoryId: number;
    categoryName: string;
    reportId: number;
    reportName: string;
    displayName: string;
    createUsername: string;
    createUserid: string;
    updateTime: number;
    discription: string;
    isSystem: number;
    isDeleted: number;
    isHidden: number;
    businessDimensionId: number;
    dataDimensionId: number;
    category: string;
    circle: string;
    showType: number; // 1, 2
    showLayout: string; //编辑模板
    constructor() {
        this.cycle = 1;
        this.categoryId = 1;
        this.businessDimensionId = 1;
        this.dataDimensionId = 1;
    }
}

@Component({
    templateUrl: './create-report.component.html',
    styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
    /**
     * 模板对象
     */
    reportTemplate: any = new ReportTemplate();
    /**
     * 当前编辑阶段
     */
    step: number = 1;
    /**
    * 主导航
    */
    navList: any[] = [
        { title: '报表模板基本信息' },
        { title: '选择报表维度' },
        { title: '选择指标' },
        { title: '调整报表格式' }
    ]

    constructor(
        private location: Location,
        private prompt: PromptService,
        private appService: AppService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        //根据路径解析编辑进度
        this.route.params.subscribe(params => {
            if (params['step']) {
                this.step = parseInt(params['step']);
            }
        })
    }

    ngOnInit() {

    }

    /**
     * 重定位 nav
     */
    reSetActiveNav(path: string) {
        this.navList.forEach((nav, idx) => {
            if (path.indexOf(nav.routerLink) >= 0) {
                nav.active = true;
            } else {
                nav.active = false;
            }
        })
    }

    /**
     * 退出编辑
     */
    quiteEdit() {
        let that = this;
        this.prompt.excute('prompt', {
            tip: '确定要退出编辑吗？',
            otherTip: '退出后当前操作将不被保存。',
            successCallback() {
                that.router.navigate(['/management/reports-manage/report-manage']);
            }
        })
    }
}