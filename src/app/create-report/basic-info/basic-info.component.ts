import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../../common/prompt/prompt.service';
import { AppService } from '../../app.service';
@Component({
    selector: 'basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
    @Input() reportConstructor: any;
    /**
     * 报表分类
     */
    categorys: any[] = [
        { id: 1, name: '合理用药' },
        { id: 2, name: '辅助用药' },
        { id: 3, name: '质子泵抑制剂' },
        { id: 4, name: '自定义分类1' },
        { id: 5, name: '自定义分类2' },
        { id: 6, name: '自定义分类3' }
    ]
    /**
     * 报表周期
     */
    cycles: any[] = [
        { id: 1, name: '自定义事件' },
        { id: 2, name: '月报表' },
        { id: 3, name: '季报表' },
    ]
    /**
     * 报表管理
     */
    visible: boolean = false;

    constructor(
        private prompt: PromptService,
        private appService: AppService,
        private router: Router
    ) { }

    ngOnInit() {

    }

    /**
     * 报表分类 radio 配置
     */
    categroyRadioOption: any = {
        radioName: 'category'
    }

    checkCategory($event: any, category: any) {
        this.reportConstructor.categoryId = category.id;
        this.reportConstructor.categoryName = category.name;
    }

    /**
     * 报表周期 radio 配置
     */
    circleRadioOption: any = {

    }

    checkCircle($event: any, cycle: any) {
        this.reportConstructor.cycle = cycle.id;
    }

}