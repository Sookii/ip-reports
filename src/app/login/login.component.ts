import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PromptService } from '../common/prompt/prompt.service';
import { AppService } from '../app.service';
@Component({
    template: ''
})
export class LoginComponent implements OnInit {

    constructor(
        private prompt: PromptService,
        private appService: AppService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.checkState();
    }

    checkState() {
        if (this.appService.user) {
            this.router.navigate(['/']);
        } else {
            this.prompt.excute('prompt', {
                tip: '请先登录？',
                otherTip: '',
                successCallback() {

                }
            });
        }
    }
}