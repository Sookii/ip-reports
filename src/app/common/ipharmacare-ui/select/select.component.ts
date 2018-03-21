import { Component, OnInit, OnChanges, OnDestroy, Input, Output, ViewChild, ViewChildren, ElementRef, EventEmitter, ComponentRef, ComponentFactoryResolver, ViewContainerRef, HostListener } from '@angular/core';
import { Position, layout } from './position';
import { SelectListComponent } from './select-list/select-list.component';
@Component({
    selector: 'ip-select',
    templateUrl: './select.component.html',
    styles: [`
        :host {
            display: inline-block;
            position: relative;
        }
    `]
})
export class SelectComponent implements OnInit {
    pDomEl: any;
    isSelectArrow: boolean = false;
    isContent: any;
    cache: any;
    position: Object = {
        right: 0,
        top: 0,
        width: 0
    };

    selectedItem: any;
    isInit: any = true;
    selectListElement: any;
    multipleSelect: boolean = false;
    constructor(private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) { }
    private componentRef: ComponentRef<SelectListComponent>;

    /**
     * options 参数
     *      key => key值意味着初始值为一个item的额外的唯一属性，用于匹配正确的item，选择id值输出
     *      注意，多选是默认存在key, 默认值为'id'。如需要额外的唯一属性来做判断，请输入。
     */
    @Input() options: any = {};
    @Input() initItem: any;
    @Input() selectListData: any[];
    @Output() selecting: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectArrowShow: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('selectElement') selectElement: ElementRef;



    ngOnInit() {
        this.options = Object.assign({ id: 'name', minWidth: '60px' }, this.options);
        if (this.options.multipleSelect) {
            this.multipleSelect = true;
            if(!this.options.key) this.options.key = 'id';
            this.initItem = this.initItem || [];
        } else {
            this.selectedItem = this.parseInitItem(this.initItem);
        }
        this.isInit = false;
    }
    
    ngOnChanges(changes: any) {
        if(this.isInit) return;
        if (changes.initItem){
            this.selectedItem = this.parseInitItem(changes.initItem.currentValue);
        }
    }

    ngOnDestroy(){
        this.isSelectArrow = false;
        if(this.cache && this.cache.instance)
            this.cache.instance.destroy();
    }

    parseInitItem(initItem: any) {
        if (!initItem) return;
        if (typeof (initItem) == 'string' || typeof (initItem) == 'number') {
            if (this.options.key) {
                for (let item of this.selectListData) {
                    if (item[this.options.key] == initItem) {
                        return item[this.options.id];
                    }
                }
            } 
            return initItem;
            
        } else if (typeof (initItem) == 'object') {
            return initItem[this.options.id]
        }

    }

    
    ViewInit() {
        this.position = layout(this.selectElement.nativeElement);
        if (this.cache && this.cache.instance) {
            this.cache.instance.show(this, this.position, this.selectListElement, this.isSelectArrow);
            return;
        }
        
        this.cache = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(SelectListComponent));
        this.selectListElement = this.cache.location.nativeElement;
        this.cache.instance.show(this, this.position, this.selectListElement, this.isSelectArrow);

        this.cache.instance.selectContent.subscribe((result: any) => {
            this.isSelectArrow = false;
            if (result) {
                if (this.multipleSelect) {
                    this.initItem = result;
                } else {
                    this.selectedItem = result[this.options.id];
                }
                this.selecting.emit(result);
            }

        });
        this.cache.instance._selectArrow.subscribe((result: any) => {
          this.isSelectArrow = false;
        });
    }

    clickSelect($event:any, selectElement: any){
        this.pDomEl = selectElement.parentNode;
        this.isSelectArrow = !this.isSelectArrow;
        this.ViewInit();
        if(this.isSelectArrow === false) {
            this.pDomEl.removeChild(this.selectListElement);
        }
    }
    removeItem($event: any, idx: number){
        $event.stopPropagation();

        this.initItem.splice(idx, 1);
    }
}