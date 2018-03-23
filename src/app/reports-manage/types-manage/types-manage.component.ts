import { Component, Input, HostListener } from '@angular/core';
import { UtilsService } from '../../utils.service';
@Component({
    selector: 'types-manage',
    templateUrl: './types-manage.component.html',
    styleUrls: ['./types-manage.component.scss'],
})
export class TypesManageComponent {

    _visible: boolean = false;
    types: any[] = [
        {name: '合理用药'},
        {name: '辅助用药'},
        {name: '质子泵抑制剂'},
        {name: '自定义分类'}
    ];

    constructor() {

    }


    show() {
        this._visible = true;
    }

    hide() {
        this._visible = false;
    }
}