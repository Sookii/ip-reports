import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../../common/prompt/prompt.service';
import { AppService } from '../../app.service';
@Component({
    selector: 'basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.scss', '../create-report.component.scss']
})
export class BasicInfoComponent implements OnInit {
    @Input() basicInfo: any;

    constructor(
        private prompt: PromptService,
        private appService: AppService,
        private router: Router
    ) { }

    ngOnInit() {
        
    }

}