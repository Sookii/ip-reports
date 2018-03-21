import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'generate-cfg',
    templateUrl: 'generate-cfg.component.html',
    styleUrls: ['./generate-cfg.component.scss']
})
export class GenerateCfgComponent implements OnInit {
    @Input() options: any = {};
    @Output() onSubmit = new EventEmitter();
    @Output() cancelFn = new EventEmitter();
    
    @Input() indicators: any[] = [];

    rows: number = 4;

    constructor() { }

    ngOnInit() {
        this.options = Object.assign({ title: '生成新报表' }, this.options);
        
    }

    
    close() {

    }

    submit(submitBtn: any) {
        
    }
}
