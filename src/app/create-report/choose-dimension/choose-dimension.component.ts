import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../../common/prompt/prompt.service';
import { AppService } from '../../app.service';
@Component({
    selector: 'choose-dimension',
    templateUrl: './choose-dimension.component.html',
    styleUrls: ['./choose-dimension.component.scss']
})
export class ChooseDimensionComponent implements OnInit {
    @Input() reportConstructor: any;

    _template: any;

    constructor(
        private prompt: PromptService,
        private appService: AppService,
        private router: Router
    ) { }

    ngOnInit() {
        this.initDimension();
        console.log(this.reportConstructor)
    }

    /**
     * 统计维度
     */
    businessDiamensions: any[] = [
        { id: 0, name: '全部' },
        { id: 1, name: '缺省' },
        { id: 2, name: '药品' },
        { id: 3, name: '手术' },
        { id: 4, name: '警示信息' }
    ]
    /**
     * 数据维度
     */
    dataDiamensions: any[] = [
        { id: 0, name: '全部' },
        { id: 1, name: '汇总' },
        { id: 2, name: '机构' },
        { id: 3, name: '科室' },
        { id: 4, name: '医疗组' },
        { id: 5, name: '医生' }
    ]

    /**
     * 报表模板
     */
    templatesSummary: any = [
        { id: '-1-1', name: '缺省-汇总' },
        { id: '-1-2', name: '缺省-机构' },
        { id: '-1-3', name: '缺省-科室' },
        { id: '-1-4', name: '缺省-医疗组' },
        { id: '-1-5', name: '缺省-医生' },
        //药品维度
        { id: '-2-1', name: '药品-汇总-1', showType: 1 },
        { id: '-2-2-1', name: '药品-机构-1', showType: 1 },
        { id: '-2-3-1', name: '药品-科室-1', showType: 1 },
        { id: '-2-4-1', name: '药品-医疗组-1', showType: 1 },
        { id: '-2-5-1', name: '药品-医生-1', showType: 1 },
        //{ id: '-2-1-2', name: '药品-汇总-2', showType: 2},
        { id: '-2-2-2', name: '药品-机构-2', showType: 2 },
        { id: '-2-3-2', name: '药品-科室-2', showType: 2 },
        { id: '-2-4-2', name: '药品-医疗组-2', showType: 2 },
        { id: '-2-5-2', name: '药品-医生-2', showType: 2 },
        //手术维度
        { id: '-3-1', name: '手术-汇总-1', showType: 1 },
        { id: '-3-2-1', name: '手术-机构-1', showType: 1 },
        { id: '-3-3-1', name: '手术-科室-1', showType: 1 },
        { id: '-3-4-1', name: '手术-医疗组-1', showType: 1 },
        { id: '-3-5-1', name: '手术-医生-1', showType: 1 },
        //{ id: '-3-1-2', name: '手术-汇总-2', showType: 2},
        { id: '-3-2-2', name: '手术-机构-2', showType: 2 },
        { id: '-3-3-2', name: '手术-科室-2', showType: 2 },
        { id: '-3-4-2', name: '手术-医疗组-2', showType: 2 },
        { id: '-3-5-2', name: '手术-医生-2', showType: 2 },
        //警示信息
        { id: '-4-1', name: '警示信息-汇总-1', showType: 1 },
        { id: '-4-2-1', name: '警示信息-机构-1', showType: 1 },
        { id: '-4-3-1', name: '警示信息-科室-1', showType: 1 },
        { id: '-4-4-1', name: '警示信息-医疗组-1', showType: 1 },
        { id: '-4-5-1', name: '警示信息-医生-1', showType: 1 },
        //{ id: '-4-1-2', name: '警示信息-汇总-2', showType: 2},
        { id: '-4-2-2', name: '警示信息-机构-2', showType: 2 },
        { id: '-4-3-2', name: '警示信息-科室-2', showType: 2 },
        { id: '-4-4-2', name: '警示信息-医疗组-2', showType: 2 },
        { id: '-4-5-2', name: '警示信息-医生-2', showType: 2 },
    ]
    //筛选后的可用模板
    templatesAvailable: any = [];

    /**
     * 初始化维度选择
     */
    initDimension() {
        this.templatesAvailable = this.filterTemplate();

        if (this.reportConstructor.showType == 2) {
            this._template = this.templatesAvailable[1];
        } else {
            this._template = this.templatesAvailable[0];
        }
    }

    /**
     * 选择统计维度
     * @param dimension 
     */
    checkBusinessDimension(dimension: any) {
        //this._dataDimension = dimension;
        this.reportConstructor.businessDimensionId = dimension.id;
        this.templatesAvailable = this.filterTemplate();
    }
    /**
     * 选择数据维度
     * @param dimension 
     */
    checkDataDimension(dimension: any) {
        //this._businessDimension = dimension;
        this.reportConstructor.dataDimensionId = dimension.id;
        this.templatesAvailable = this.filterTemplate();
    }

    filterTemplate() {
        let suffix = `-${this.reportConstructor.businessDimensionId || '.'}-${this.reportConstructor.dataDimensionId || '.'}`;
        let regExp = new RegExp("^" + suffix);
        return this.templatesSummary.filter(el => {
            return regExp.test(el.id);
        })
    }

    /**
     * 选择模板
     * @param template 
     */
    checkTemplate(template: any) {
        this._template = template;
        this.reportConstructor.showType = template.showType;
    }
}