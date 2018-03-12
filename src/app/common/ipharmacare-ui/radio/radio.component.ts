import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
    selector: 'ip-radio',
    templateUrl: './radio.component.html',
})
export class RadioComponent implements OnInit {
    @Input() options: any;
    @Input() labelText: string;
    @Input() isChecked: boolean;
    @Input() isDisabled: boolean;
    @Output() onCheck: EventEmitter<any> = new EventEmitter<any>();

    radioName: string = 'name';
    constructor() { }

    ngOnInit() {
        this.options = Object.assign({ lineHeight: '28px' }, this.options);
    }

    check($event: any) {
        this.onCheck.emit({});
    }
}