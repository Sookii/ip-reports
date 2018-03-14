import { Injectable, Component, Input, ElementRef } from '@angular/core';

@Injectable()
export class TableModel {
    id: string;
    title: Array<any>;
    dataList: Array<any>;
    dataListPath: string = 'recordList';
    itemCountPath: string = 'recordCount';
    pageCountPath: string = 'pageCount';
    pageSize: number = 20;
    currentPage: number = 1;
    isFixedHeader: boolean = true;

    idAttr: string = 'id'; //指定id字段名称
    url: string;  //数据资源
    hasCheckbox: boolean; //是否使用复选框
    duplicateRow: boolean; //是否重复数据行

    focusRow: any;
    checkedRowsArr = new Array<any>();  //初始选中的列

    totalCount: number = 0;
    totalPageCount: number = 1;

    elementRef: ElementRef;
    doubleDataList: Array<any> = new Array<any>();
    trHiddens: Array<boolean> = new Array<boolean>();
    tdHiddens: Array<boolean> = new Array<boolean>();

    setFocus(trow: any) {
        this.focusRow = trow;
    }

    //获取所有的选中的行
    getCheckedRows(): any[] {
        return this.checkedRowsArr;
    }

    /***
     * 更换数据结构格式，获取数据路径List
     */
    formatPath(path: string): string[] {
        let paths: string[] = [];
        paths = path.split(/\//g);
        return paths;
    }

    /****
     * 拓展obj1
     * 如果obj2中有相同的属性，则覆盖obj1
     * 如果obj2中的属性obj1中不存在，则新增该属性
     */
    extend(obj1: any, obj2: any): any {
        for (let name in obj2) {
            obj1[name] = obj2[name];
        }
        return obj1;
    }

    getDataListFromResult(result: any, path: string): any[] {
        let paths: string[] = this.formatPath(path);
        for (let i = 0; i < paths.length; i++) {
            if (paths[i] === "") {
                return result;
            }
            if (result) {
                result = result[paths[i]];
            }
        }
        return result;
    }

    getCountFromResult(result: any, path: string): number {
        let paths: string[] = this.formatPath(path);
        for (let i = 0; i < paths.length; i++) {
            if (paths[i] === "") {
                return result;
            }
            if (result) {
                result = result[paths[i]];
            }
        }
        return result;
    }

    private isEmptyObject(obj: any): boolean {
        for (var name in obj) {
            return false;
        }
        return true;
    }

}
