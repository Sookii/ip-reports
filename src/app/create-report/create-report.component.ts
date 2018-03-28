import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PromptService } from '../common/prompt/prompt.service';
import { AppService } from '../app.service';
@Component({
    templateUrl: './create-report.component.html',
    styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
    /**
     * 模板对象
     */
    reportTemplate: any = new Object();
    /**
     * 编辑进度 修改默认为4
     */
    progress: number = 1;
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
                this.progress = parseInt(params['step']);
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
     * 切换编辑阶段  tips: 只可切换至已完成编辑或正在编辑的阶段。
     * @param step 
     */
    switchProgress(step: number) {
        if (this.progress < step) {
            return;
        } else {
            this.step = step;
        }
    }
}