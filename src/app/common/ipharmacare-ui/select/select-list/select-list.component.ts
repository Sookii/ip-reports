import { Component, OnInit, Input, Output, ElementRef, EventEmitter, ViewChild, ViewContainerRef, ComponentRef, OnChanges, OnDestroy, HostListener, Renderer} from '@angular/core';

@Component({
	selector: 'select-list-component',
	templateUrl: 'select-list.component.html',
})
export class SelectListComponent implements OnInit {
	position:any = {
		left:0,
		top:0,
		width:0
	};
	selectListData:any[];
	isSelectArrow:boolean;
	_that:any;
	selectData:any;
    multipleSelect: boolean = false;

	constructor(private renderer: Renderer) {

    }


	@ViewChild('selectListElement') selectListElement:ElementRef;
	@Output() selectContent:EventEmitter<any> = new EventEmitter<any>();;
	@Output() _selectArrow:EventEmitter<any> = new EventEmitter<any>();;


	ngOnInit() {}

	show(that:any, position:any, selectListElement:any, isSelectArrow:boolean){
		this._that = that;
        if(that.options.multipleSelect) {
            this.multipleSelect = true;
            this.selectData = that.initItem || [];
        }
		this.isSelectArrow = isSelectArrow;
		this.position = position;
		this.selectListData = that.selectListData;
		window.document.body.appendChild(selectListElement);
	}

    containsIn(item: any){
        if(!this.multipleSelect || !this.selectData) return false;
        for(let listItem of this.selectData){
            if(item[this._that.options.key] == listItem[this._that.options.key]) return true;
        }
        return false;
    }

	_selectData($event: any, selectData:any){
        $event.stopPropagation();
        if(this.multipleSelect){
            /**
             * 这部分代码定制化太强，需要改进
             */
            if(selectData[this._that.options.key] == '全部'){
                this.selectData = [selectData];
                this.selectContent.emit(this.selectData);
                return;
            }
            if(this.containsIn(selectData)){
                this.selectData.splice(this.selectData.indexOf(selectData), 1);
            }else{
                if(this.selectData[0] && this.selectData[0][this._that.options.key] == '全部'){
                    this.selectData.splice(0, 1);
                }
                this.selectData.push(selectData);
            }
            
            this.selectContent.emit(this.selectData);
        }else{
            if(!this._that.cache.location.nativeElement.parentNode) return;
            window.document.body.removeChild(this._that.cache.location.nativeElement);
            this.selectData = selectData;
            this.selectContent.emit(selectData);
        }
	}

    destroy(){
		if(!this._that.cache.location.nativeElement.parentNode) return;
		this.isSelectArrow = false;
		window.document.body.removeChild(this._that.cache.location.nativeElement);
	}

    @HostListener('document:click', ['$event','this.selectData'])
    onClickDoc($event: any,selectData:any) {
        var currentSelect = this._that.selectElement.nativeElement;

        var targetObj = {
            hasTarget: currentSelect == $event.target
        };
        this.isChild(currentSelect.childNodes, $event.target, targetObj);
        
        if(targetObj.hasTarget){
            return;
        }
        if(!this._that.cache.location.nativeElement.parentNode) return;
           
        this._selectArrow.emit(false);
        window.document.body.removeChild(this._that.cache.location.nativeElement);
    }

    isChild(nodes:any, target:any, targetObj:any){
        for(var i=0; i<nodes.length; i++){
            
            if(nodes[i] == target){

                targetObj.hasTarget = true;
            }else{
                if(nodes[i].childNodes){
                    this.isChild(nodes[i].childNodes, target, targetObj);
                }
            }
        }
    }
}