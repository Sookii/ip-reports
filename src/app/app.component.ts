import { Component, OnInit, ViewChild, ViewContainerRef, HostListener, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { PromptService } from './common/prompt/prompt.service';
import { AppService } from './app.service';
import { UtilsService } from './utils.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('prompt', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;//读取prompt的ViewContainerRef的实例

    constructor(
        private prompt: PromptService,
        private appService: AppService,
        private router: Router
    ) { };

    ngOnInit() {
        this.prompt.setRootViewContainerRef(this.viewContainerRef);

        this.appService.login().subscribe();

        this.getUserInfo();
    }

    /**
     * 用户信息获取，退出登录
     */
    getUserInfo() {
        this.appService.getUserInfo()
            .subscribe(res => {
                if (res['code'] == '200' && res['data'] != null) {
                    this.appService.user = res['data'];
                } else {
                    this.router.navigate(['./login']);
                }
            })
    }
}
