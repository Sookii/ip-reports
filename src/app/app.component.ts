import { Component, OnInit, ViewChild, ViewContainerRef, HostListener, ElementRef } from '@angular/core';
import { PromptService } from './common/prompt/prompt.service';
import { AppService } from './app.service';
import { UtilsService } from './utils.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    user: any = new Object();
    @ViewChild('menupanel') menupanelEl: any;
    @ViewChild('prompt', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;//读取prompt的ViewContainerRef的实例

    constructor(
        private prompt: PromptService,
        private appService: AppService,
        private utilsFns: UtilsService
    ) { };

    ngOnInit() {
        this.prompt.setRootViewContainerRef(this.viewContainerRef);

        this.appService.login().subscribe();

        this.getUserInfo();

        this.getRightTopResources();
    }

    /**
     * 更多菜单
     */
    extendNavCfg: any = {
        position: {
            width: '364px',
            height: '430px',
            left: '184px',
            top: '25px',
            triangleLeft: '189px',
            triangleTop: '-6px',
        },
        navigationData: '',
        isManufacturer: false,
        medCenterAddress: ''
    };
    /*
    * 获取更多导航栏信息
    */
    getRightTopResources() {
        this.appService.getExtendNav()
            .subscribe(res => {
                if (res['code'] == '200') {
                    let navigationData = res['data'] ? res['data'] : [];
                    for (let i = 0; i < navigationData.length; i++) {
                        if (navigationData[i].children && navigationData[i].children.length) {
                            navigationData[i].children = navigationData[i].children.sort((obj1, obj2) => {
                                let value1: any = obj1.sort;
                                let value2: any = obj2.sort;
                                if (value1 < value2) {
                                    return -1;
                                } else if (value1 > value2) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            });
                        }
                    }
                    this.extendNavCfg.navigationData = navigationData;
                }
            })
    }
    /**
     * 用户信息获取，退出登录
     */
    getUserInfo() {
        this.appService.getUserInfo()
            .subscribe(res => {
                if(res['code'] == '200') {
                    this.user = res['data'];
                }
            })
    }
    
    @HostListener('document:click', ['$event'])
    onClickDoc($event: any) {
        if (this.menupanelEl['open'] && !this.utilsFns.chcekElChain($event.target, this.menupanelEl)) {
            this.menupanelEl['open'] = false;
        }
    }

    _logout() {
        let that = this;
        this.prompt.excute('prompt', {
            tip: '你确定要退出吗？',
            otherTip: '',
            successCallback() {
                that.logout();
            }
        });
    }
    logout() {
        this.appService.logout().subscribe(
            res => {}
        );
    }
}
