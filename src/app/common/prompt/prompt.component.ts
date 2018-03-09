import { Component, forwardRef, Inject, OnInit, ViewRef } from '@angular/core';
import { PromptService } from './prompt.service';
@Component({
    selector: 'prompt-component',
    template: `
		<div class="prompt" *ngIf="show && handle != 'tips'">
			<div class="dialog flex flex-column" [class.showing]="show" [class.hiding]="hiding">
				<div class="dialog-body flex-1">
                    <i class="iconfont icon-warning-fill ai-yellow" *ngIf="tipsType == 'warning'"></i>
                    <i class="iconfont icon-close-fill ai-red" *ngIf="tipsType == 'error'"></i>
                    <i class="iconfont icon-checked-fill ai-green" *ngIf="tipsType == 'success'"></i>
					<div class="dialog-content">
						<h3>{{tip}}</h3>
						<div *ngIf="otherTip" style="font-size:12px; color:#999;">
							{{otherTip}}
						</div>
					</div>
				</div>
				<div class="dialog-footer">
				    <button class="ip-btn ip-btn-primary" style="height:32px;width:64px;" (click)="fnHandle('successCallback')">确认</button>
                    <button class="ip-btn ip-btn-outline-default" *ngIf="handle == 'prompt'" style="height:32px;width:64px;"  (click)="fnHandle('closeCallback')">取消</button>
				</div>
			</div>
		</div>
		<div class="hint" [class.show]="show" *ngIf="show && handle == 'tips'">
			<span>
                <i class="iconfont icon-warning-fill ai-yellow" *ngIf="tipsType == 'warning'"></i>
                <i class="iconfont icon-close-fill ai-red" *ngIf="tipsType == 'error'"></i>
                <i class="iconfont icon-checked-fill ai-green" *ngIf="tipsType == 'success'"></i>
                {{tip}}
            </span>
		</div>
	`,
    styleUrls: ['prompt.component.css']
})

export class PromptComponent implements OnInit {

    constructor(@Inject(forwardRef(() => PromptService)) private promptService: PromptService) { }

    handle: string;                     //调用的动作类型
    tipsType: string = 'warning';       //提示图表展示类型  success/成功 warning/警告（默认） error/错误 

    show: boolean = true;
    hiding: boolean = false;
    tip: string = '提示内容';
    otherTip: string = '';

    successCallback: any = function () { };
    closeCallback: any = function () { };

    private viewRef: ViewRef;

    ngOnInit() {
        this.execute();
    }

    execute() {
        this.handle = this.promptService.handle;
        this.viewRef = this.promptService.viewRef;
        switch (this.handle) {
            case 'tips':
                this.tips(this.promptService.paramObj);
                break;
            case 'alert':
                this.alert(this.promptService.paramObj);
                break;
            case 'prompt':
                this.prompt(this.promptService.paramObj);
                break;
            default:
                break;
        }
    }

    tips(tip: any) {
        if (typeof tip == 'string') {
            this.tip = tip;
        } else {
            for (let prop in tip) {
                if (tip.hasOwnProperty(prop)) {
                    this[prop] = tip[prop];
                }
            }
        }
        setTimeout(() => {
            this.close();
        }, 3000)
    }

    alert(tip: any) {
        this.show = true;
        this.tipsType = 'error';
        if (typeof tip == 'string') {
            this.tip = tip;
        } else {
            for (let prop in tip) {
                if (tip.hasOwnProperty(prop)) {
                    this[prop] = tip[prop];
                }
            }
        }
    }

    prompt(param: any) {
        this.show = true;
        for (let prop in param) {
            if (param.hasOwnProperty(prop)) {
                this[prop] = param[prop];
            }
        }
    }

    close() {
        this.hiding = true;
        setTimeout(() => {
            this.show = false;
            this.hiding = false;
            this.tip = '提示内容';
            this.otherTip = '';
            this.promptService.removeComponent(this.viewRef);
        }, 350)
    }

    fnHandle(method: any) {
        // debugger
        this[method]();
    }

    initFn() {
        this.successCallback = function () { };
        this.closeCallback = function () { };
    }

}