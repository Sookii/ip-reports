import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { UtilsService } from '../../utils.service';
@Component({
    selector: 'cycle-selected',
    templateUrl: 'cycle-selected.component.html',
    styleUrls: ['./cycle-selected.component.scss']
})
export class CycleSelectedComponent implements OnInit {
    @Input() placeholder: string = "开始时间"
    @Input() options: any = {};
    @Output() onCheck = new EventEmitter();
    @ViewChild('cycleSelection') selfEl: ElementRef;
    cycles: string[] = [];
    selection: string;
    isChecking: boolean = false;

    constructor(private utilsFns: UtilsService) { }

    ngOnInit() {
        this.options = Object.assign({ type: 'Monthly' }, this.options);        //Monthly => 月度报表; Quarterly => 季度报表

        this.getCycles(this.options.type);
    }

    //生成周期选项
    getCycles(type: string) {
        let date = new Date();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();

        if (type == 'Monthly') {
            for (let i = 0; i < 15; i++) {
                let _date = new Date(currentYear, currentMonth - i, 1);
                this.cycles.push(`${_date.getFullYear()}年${_date.getMonth() + 1}月`);
            }
        } else {
            for (let i = 1; i < 5; i++) {
                let _date = new Date(currentYear, currentMonth - 3 * i, 1);
                this.cycles.push(this.getQuarter(_date.getFullYear(), _date.getMonth()));
            }
        }
    }
    //根据年月获取当年季度
    getQuarter(year: number, month: number) {
        let Quarter: string;
        switch (Math.floor(month / 3)) {
            case 0:
                Quarter = `${year}年第一季度`;
                break;
            case 1:
                Quarter = `${year}年第二季度`;
                break;
            case 2:
                Quarter = `${year}年第三季度`;
                break;
            case 3:
                Quarter = `${year}年第四季度`;
                break;
            default:
                break;
        }

        return Quarter;
    }

    toggle($event: any, state?: number) {
        this.isChecking = state ? false : !this.isChecking;
    }

    select($event, item) {
        this.selection = item;
        this.toggle($event, 1);
    }

    @HostListener('document:click', ['$event'])
    onClickDoc($event: any) {
        if (this.isChecking && this.utilsFns.chcekElChain($event.target, this.selfEl)) {
            $event.stopPropagation();
        } else {
            this.isChecking = false;
        }
    }
}
