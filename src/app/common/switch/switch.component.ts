import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
    selector: 'switch',
    template: `
        <span class="ip-switch" [class.checked]="checked" [style.background]="checked ? color : ''">
            <span class="switch-inner">
                <ng-template [ngIf]="checked">
                    <ng-content select="[checked]"></ng-content>
                </ng-template>
                <ng-template [ngIf]="!checked">
                    <ng-content select="[unchecked]"></ng-content>
                </ng-template>
            </span>
        </span>
    `,
    styleUrls: ['./switch.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchComponent),
            multi: true
        }
    ]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {
    @Input() color: string = '#3DBD7D';
    @Input() switchText: string = '显示';
    @Input() unswitchText: string = '否';
    @Input() disabled: boolean = false;
    @Input() checked: boolean = false;

    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;

    constructor() { }

    ngOnInit() {

    }

    @HostListener('click', ['$event'])
    onClick(e) {
        e.preventDefault();
        if (!this.disabled) {
            this.updateValue(!this.checked);
            this.onChange(this.checked);
        }
    }

    updateValue(value: any) {
        if (this.checked === value) {
            return;
        }
        this.checked = value;
    }


    writeValue(value: any): void {
        this.updateValue(value);
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
}
