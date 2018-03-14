import {
    Component,
    Input,
    Output,
    OnInit,
    OnChanges,
    EventEmitter,
    Directive,
    HostListener,
    Injectable,
    ViewChild,
    ElementRef,
    ContentChild,
    TemplateRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableModel } from './table.model';
import { InterceptorService } from 'ng2-interceptors';

interface ListData {
    code: number,
    data?: Array<any>,
    message?: string
}

//用于设置url，快速获取列表数据
@Injectable()
export class TableService {
    patternCurr = /\{currentPage\}/;
    patternSize = /\{pageSize\}/;

    constructor(
        public http: HttpClient) {
    }

    loadDataByUrl(url: string, condition: string, currentPage: number, pageSize: number) {
        if (url) {
            url = url.replace(this.patternCurr, currentPage + "");
            url = url.replace(this.patternSize, pageSize + "");
        }
        if (condition) {
            url = url + "&" + condition;
        }
        return this.http.get(url);
    }

    isEmptyObject(obj: any) {
        for (var name in obj) {
            return false;
        }
        return true;
    }
}

@Component({
    selector: 'ip-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    providers: [
        TableService,
        TableModel
    ]
})
export class TableComponent implements OnInit, OnChanges {
    @Input() table: TableModel;
    @Input() condition: string = "";
    @Input() isFixedHeader: boolean;
    @Input() noInit: boolean = false;
    @Output() emitPagination = new EventEmitter();
    @ContentChild('tableTemplate') tableTemplate: any;

    idAttr: string;    //checkbox 初始化选中状态
    blinkPage: number = 1;  //跳转页
    error: any;
    pagination: any = {}; //分页信息

    pageSizeShow: boolean = false;

    @HostListener('document:click', ['$event'])
    onClickDoc($event: any) {
        this.pageSizeShow = false;
    }

    constructor(
        public tableModel: TableModel,
        private tableService: TableService,
        private elementRef: ElementRef
    ) { }

    ngAfterViewInit() {
        this.table.elementRef = this.elementRef; //elementRef
    }

    ngOnInit() {
        if (!this.noInit) this.loadDataByUrl();
        this.table = this.tableModel.extend(new TableModel(), this.table); //设置默认值
    }

    /****判断是否是带有checkbox */
    hasCheckboxInTable(): boolean {
        return this.table.hasCheckbox;
    }


    loadDataByUrl(url?: string, isSearch?: boolean) {
        if (!this.table) {
            this.table = this.tableModel.extend(new TableModel(), this.table);
        }
        let params = arguments;
        if (arguments.length > 0) {
            for (let i = 0; i < arguments.length; i++) {
                if (typeof (arguments[i]) == 'string') {
                    this.table.url = url;
                } else if (typeof (arguments[i]) == 'boolean' && arguments[i]) {
                    this.table.currentPage = 1;
                }
            }
        }
        const that = this;
        this.pagination.pageSize = this.table.pageSize;
        this.pagination.currentPage = this.table.currentPage;
        this.emitPagination.emit(this.pagination);

        this.tableService.loadDataByUrl(this.table.url, this.condition, this.table.currentPage, this.table.pageSize)
            .subscribe(res => {
                if(res['code'] == '200') {
                    this.showData(res);
                }
            });
    }

    /**
     * 以列表的形式显示数据
    */
    showData(response: any) {
        let result = response.data || response['results'] || [];
        let contentRef = this.elementRef.nativeElement.children[0];
        let listRef =  contentRef === undefined ? null : contentRef.getElementsByClassName('flex1')[0]

        // 加载数据成功
        this.table.dataList = this.tableModel.getDataListFromResult(result, this.table.dataListPath) || result;

        this.table.doubleDataList = new Array<any>();
        this.table.trHiddens = new Array<boolean>();
        this.table.tdHiddens = new Array<boolean>();

        if (this.tableService.isEmptyObject(this.table.dataList)) {
            this.table.currentPage = 1;
            this.table.totalCount = 0;
            this.table.totalPageCount = 0;
        } else {
            //数据列表存储为连双份如[a,b,c]存一份为[a,a,b,b,c,c]
            for (let i = 0; i < this.table.dataList.length; i++) {
                this.table.doubleDataList[this.table.doubleDataList.length] = this.table.dataList[i];
                this.table.doubleDataList[this.table.doubleDataList.length] = this.table.dataList[i];
            }

            this.table.totalCount = this.tableModel.getCountFromResult(result, this.table.itemCountPath);
            this.table.totalPageCount = this.tableModel.getCountFromResult(result, this.table.pageCountPath)
                ? this.tableModel.getCountFromResult(result, this.table.pageCountPath) :
                Math.ceil(this.table.totalCount / this.table.pageSize);
            if (this.table.currentPage > this.table.totalPageCount) {
                this.table.currentPage = this.table.totalPageCount;
                this.loadDataByUrl();
            }
        }

        // 跳转到第一条记录
        if (listRef)
            listRef.scrollTop = 0
    }

    setData(list: any) {
        this.table.dataList = list;
    }

    getData() {
        return this.table.dataList;
    }

    setPage(page: any) {
        this.table.currentPage = page;
    }

    setPageSize(pageSize: any) {
        this.table.pageSize = pageSize;
    }

    @Output() onClick: EventEmitter<any> = new EventEmitter();
    @Output() onDblClick: EventEmitter<any> = new EventEmitter();
    @Output() onCheck: EventEmitter<any> = new EventEmitter(); //type

    //页面点击跳转事件
    prePage() {
        this.table.currentPage--;
        this.tableModel.checkedRowsArr = [];
        this.loadDataByUrl();
    }

    nextPage() {
        this.table.currentPage++;
        this.tableModel.checkedRowsArr = [];
        this.loadDataByUrl();
    }

    turnToHomePage() {
        this.table.currentPage = 1;
        this.tableModel.checkedRowsArr = [];
        this.loadDataByUrl();
    }

    turnToEndPage() {
        this.table.currentPage = this.table.totalPageCount;
        this.tableModel.checkedRowsArr = [];
        this.loadDataByUrl();
    }

    setFocus(trow: any) {
        this.tableModel.setFocus(trow);
    }

    /**
     * 校验用户输入的页面是否合法
     * 不合法自动校正
    */
    checkPage(page?: number | string) {
        if (page === "") return; // 没有输入就不做矫正

        let inputPage = page ? page : this.blinkPage;
        if (inputPage < 1) {
            inputPage = 1;
        } else if (inputPage > this.table.totalPageCount) {
            inputPage = this.table.totalPageCount;
        }

        this.table.currentPage = <number>inputPage;
        this.blinkPage = <number>inputPage;
        this.tableModel.checkedRowsArr = [];
        this.onCheck.emit(this.tableModel.checkedRowsArr);
    }

    specificPage(currentPage?: number) {
        this.checkPage(currentPage);
        this.loadDataByUrl();
    }

    timer: any; //定时器
    onRowClick(rowData: any, $event: any) {
        //解决双击事件会触发两次单击事件的方法
        if (this.timer) {
            clearTimeout(this.timer);
        }
        let me = this;
        this.timer = setTimeout(function () {//初始化一个延时
            me.onClick.emit(rowData);
            me.setFocus(rowData);
            if (me.hasCheckboxInTable())
                me.checkBox(!me.isContains(rowData), rowData, $event);
        }, 250)

    }
    onRowDblClick(rowData: any, $event) {
        //解决双击事件会触发两次单击事件的方法
        clearTimeout(this.timer);
        if ($event.target.className.indexOf('fake-checkbox') != -1) {
            return;
        }
        this.onDblClick.emit(rowData);
    }

    onChangePageSize() {
        this.loadDataByUrl();
    }

    //捕获变化
    ngOnChanges(changes: any) {
        if (changes.condition && changes.condition.currentValue && changes.condition.currentValue != changes.condition.previousValue)
            this.loadDataByUrl();
    }

    updateUrl(url: string) {
        this.table.url = url;
        this.loadDataByUrl();
    }

    /**********多选框点击全选****** */
    checkAll(checked: boolean) {
        this.tableModel.checkedRowsArr = [];
        if (checked) {
            this.tableModel.checkedRowsArr = this.table.dataList.concat();
        } else {
            this.tableModel.checkedRowsArr = [];
        }
        let checkedArr = this.tableModel.checkedRowsArr
        let params = { checkedArr, checked }
        this.onCheck.emit(this.tableModel.checkedRowsArr);
    }

    /*************点击多选框选择行*****
     * @Param checked:该行是否被选中，true选中，false未选中
     *        data:改行附带的数据
     */
    checkBox(checked: boolean, data: any, $event: any) {
        if (checked) {
            this.tableModel.checkedRowsArr.push(data);
        } else {
            this.removeObjFromArr(data);
        }
        $event.stopPropagation();
        this.onCheck.emit(this.tableModel.checkedRowsArr);
    }

    /**
     * 选中checkBox 状态
     */

    checkedStatus(trow: any, checkItem: any, checkLabel: any, $event: any) {
        checkItem.id = trow.id;
        checkLabel.attributes.for.value = trow.id;
        $event.stopPropagation();
    }

    isAllChecked(): boolean {
        if (this.tableModel.checkedRowsArr.length) {
            let currentSize = this.table.pageSize > this.table.totalCount ? this.table.totalCount : this.table.pageSize;
            return this.tableModel.checkedRowsArr.length == currentSize; //length
        }
        return false;
    }

    setCheckedRowsArr(arr) {
        this.tableModel.checkedRowsArr = arr;
    }

    isChecked(data: any): boolean {
        return this.isContains(data);
    }

    //样式调整，聚焦focused，checked
    isFocus(data: any): boolean {
        return data == this.tableModel.focusRow;
    }

    /********** 数组相关操作 ******
     * 
    */
    //判断元素obj是否存在在该数组arr中
    private isContains(obj: any): boolean {
        for (let index = 0; index < this.tableModel.checkedRowsArr.length; index++) {
            if (this.tableModel.checkedRowsArr[index][this.idAttr] == obj.id) {
                return true;
            }
            if (this.tableModel.checkedRowsArr[index].id == obj.id) {
                return true;
            }
        }
        return false;
    }

    private removeObjFromArr(obj: any) {
        this.tableModel.checkedRowsArr.splice(this.tableModel.checkedRowsArr.indexOf(obj), 1);
        return true;
    }

    selectSize(size, $event) {
        this.table.pageSize = size;

        this.table.currentPage = 1;

        this.onChangePageSize();

        $event.stopPropagation();

        this.pageSizeShow = false;
    }
}

