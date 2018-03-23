import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UtilsService } from '../../utils.service';
@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {

    @Input()
    set trigger(value) {
        this._trigger = value;
    }
    get trigger() {
        return this._trigger;
    }

    @Input()
    set position(value) {
        this._position = value;
    }
    get position() {
        return this._position;
    }

    @Input()
    set boundary(value) {
        this._boundary = value;
    }
    get boundary() {
        return this._boundary;
    }

    @ViewChild('ipDropdown') hostEl: ElementRef;

    _trigger: string = 'click';
    _position: string = 'br';    //br tl tr
    _visible: boolean = false;
    _hostElOffsetHeight: string;
    _boundary: number = 2;
    constructor(public elementRef: ElementRef, private _renderer: Renderer2, private utilsFns: UtilsService) {

    }

    ngAfterViewInit() {
        if (this._boundary != 0) {
            this._hostElOffsetHeight = this._boundary + this.hostEl.nativeElement.offsetHeight + 'px';
        } else {
            this._hostElOffsetHeight = this.hostEl.nativeElement.offsetHeight + 'px';
        }

        //事件绑定
        if (this._trigger === 'hover') {
            this._renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => this.show());
            this._renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => this.hide());
        } else if (this._trigger === 'click') {
            this._renderer.listen(this.elementRef.nativeElement, 'click', (e) => {
                e.preventDefault();
                this._visible = !this._visible;
            });
        }
    }

    show() {
        this._visible = true;
    }

    hide() {
        this._visible = false;
    }

    @HostListener('document:click', ['$event'])
    onClickDoc($event: any) {
        if (this._visible && this.utilsFns.chcekElChain($event.target, this.hostEl)) {
            $event.stopPropagation();
        } else {
            this._visible = false;
        }
    }
}