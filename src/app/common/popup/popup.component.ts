import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
})
export class PopupComponent implements OnInit {
    @Input() options: any = {};
    @Output() onSubmit = new EventEmitter();
    @Output() cancelFn = new EventEmitter();
    @ContentChild('tpl') popupTemplate: TemplateRef<any>;

    popupData: any = {};

    showPopup: boolean = false;
    isHiddenBtn: boolean = false;
    constructor() { }

    ngOnInit() {
        this.options = Object.assign({ title: '提示' }, this.options);
        console.log(this.popupTemplate)
    }

    open() {
        this.showPopup = true;
    }
    close() {
        if (this.options.hiddenBtn) {
            this.cancelFn.emit(true);
            return;
        }
        this.showPopup = false;
        this.cancelFn.emit();
    }

    submit(submitBtn: any) {
        this.onSubmit.emit({});
    }
}
