import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'othernavigation-window',
    template: `
        <div class="navigationMenupanel" [style.width]="option.position.width" [style.left]="option.style.left" [style.top]="option.style.top" (click)="$event.stopPropagation();" >
            <i #navTriangle class="triangle" [class.changeBG]="navTriangle.change" [style.left]="option.position.triangleLeft" [style.top]="option.position.triangleTop"></i>
            <ul class="sys-menu">
                <li *ngFor="let menu of option.navigationData" (click)="skipLink(menu)">
                    <div class="system-name">
                        <img src="./assets/{{menu.systemId}}.svg">
                        {{menu.name}}
                    </div>
                    <div class="text-ellipsis item-name" title="{{menu.navName}}">
                        <span *ngFor="let item of menu.children">
                            ·{{item.name}}
                        </span>
                    </div>
                </li>
            </ul>
            <ul class="quick-route">
                <li style="margin-top:10px;">
                    <a *ngIf="!option.isManufacturer" href="{{option.medCenterAddress}}/med/zlcx/aq.action" target="_blank" (click)="skipCallBack()">处方评估</a>
                    <a *ngIf="option.isManufacturer" [routerLink]="['/prescription-assessment']" (click)="skipCallBack()">处方评估</a>
                    |
                    <a href="/pages/docs/" target="_blank" >资料查询</a>
                    |
                    <a href="/pages/drug-match/matching" target="_blank" (click)="skipCallBack()">配伍禁忌</a>
                    |
                    <a href="/pages/docs/docs-query?type=3" target="_blank" (click)="skipCallBack()">医学计算公式</a>
                </li>
            </ul>
        </div>
	`,
    styleUrls: ['extend-nav.component.scss']
})

export class ExtendNavComponent implements OnInit {
    @Input() option: any;
    @Input() isShowList: boolean;
    @Input() el: any;

    private list: any[] = [];
    private _that: any;
    private location: string = location.origin;
    private handleType: number = 0;
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this._that = this.option.that;
        if (this.option.navigationData && this.option.navigationData.length) {

            for (let i = 0; i < this.option.navigationData.length; i++) {
                if (this.option.navigationData[i].children && this.option.navigationData[i].children.length) {
                    let str: any = "";
                    for (let k = 0; k < this.option.navigationData[i].children.length; k++) {
                        str += '.' + this.option.navigationData[i].children[k].name;
                    }
                    this.option.navigationData[i]['navName'] = str;
                }
            }
        }

    }

    skipLink(menu: any) {
        this.skipCallBack();
        window.open(menu.url, '_blank')
    }
    skipCallBack() {
        this._that.viewContainerRef.remove(this._that.viewContainerRef.indexOf(this._that.componentRef.hostView))
        this._that.componentRef = null;
        this._that.isSelect = false;
    }

}