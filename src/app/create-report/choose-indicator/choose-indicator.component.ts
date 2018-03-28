import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../../common/prompt/prompt.service';
import { AppService } from '../../app.service';
@Component({
    selector: 'choose-indicator',
    templateUrl: './choose-indicator.component.html',
    styleUrls: ['./choose-indicator.component.scss']
})
export class ChooseIndicatorComponent implements OnInit {
    @Input() reportConstructor: any;

    /**
     * 统计内容
     */
    staticContent: any[] = [
        { name: 123 },
        { name: 456 }
    ]
    /**
     * 指标所在报表
     */
    reports: any[] = [
        { name: 123 },
        { name: 456 }
    ]

    constructor(
        private prompt: PromptService,
        private appService: AppService,
        private router: Router
    ) { }

    ngOnInit() {
        console.log(this.reportConstructor)
    }

}