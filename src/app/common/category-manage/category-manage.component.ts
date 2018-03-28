import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { CategoryManageService } from './category-manage.service';
@Component({
    selector: 'category-manage',
    templateUrl: './category-manage.component.html',
    styleUrls: ['./category-manage.component.scss'],
    providers: [DragulaService, CategoryManageService]
})
export class CategoryManageComponent {
    @Input()
    set visible(value) {
        this._visible = value;
    }
    get visible() {
        return this._visible;
    }
    @Output() visibleChange: EventEmitter<any> = new EventEmitter();

    @Input()
    set title(value) {
        if (!value) {
            this._title = '管理分类';
        } else {
            this._title = value;
        }
    }
    get title() {
        return this._title;
    }

    @Input()
    set handle(value) {
        if (!value) {
            this._handle = 'manage';
        } else {
            this._handle = value;
        }
    }
    get handle() {
        return this._handle;
    }

    _title: string = '管理分类';
    _handle: string = 'manage';
    _visible: boolean = true;

    warning: any;
    newType: string = '';
    targetType: any;
    
    types: any[] = [
        { name: '合理用药' },
        { name: '辅助用药' },
        { name: '质子泵抑制剂' },
        { name: '自定义分类' }
    ];

    @Output() target: EventEmitter<any> = new EventEmitter();
    constructor(private dragulaService: DragulaService, private categoryManageService: CategoryManageService) {
        dragulaService.setOptions('type-list', {
            //removeOnSpill: true,
            direction: 'vertical'
        });
    }


    /**
     * 关闭弹窗
     */
    close() {
        this._visible = false;
        this.warning = null;  //关闭弹窗时清除警告信息
        this.targetType = null;
        this.visibleChange.emit(this._visible);
    }

    /**
     * 新增报表分类
     */
    addType() {

    }

    /**
     * 更新报表分类
     * @param item 
     */
    updateType(item: any) {
        item.editing = false;
    }

    /**
     * 删除报表分类
     * @param item
     */
    deleteType(item: any) {

    }

    /**
     * 清除警告
     */
    closeTips() {

    }

    /**
     * 编辑分类名称
     * @param item 
     * @param target 
     * @param  
     */
    edit(item: any, target: any, $event: any) {
        $event.preventDefault();
        item.editing = true;
        setTimeout(() => {
            target.focus();
        }, 0);
    }
    
    /**
     * 提交要移动到的分类
     */
    onSubmit() {
        this.target.emit(this.targetType)
    }
}