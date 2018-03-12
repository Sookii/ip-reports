import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PromptService } from './common/prompt/prompt.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('prompt', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;//读取prompt的ViewContainerRef的实例

    constructor(private prompt: PromptService) { };

    ngOnInit() {
        this.prompt.setRootViewContainerRef(this.viewContainerRef);
        
        // this.prompt.excute('prompt', {
        //     title: '确认',
        //     icon: 'question-2.svg',
        //     tip: '你确定要退出吗？',
        //     successCallback() {
                
        //     }
        // })
    }

    radioChange($event) {
        debugger
    }

    radioOpt: any = {
        
    }

    typeCfg: any = {
        minWidth: '160px',
        maxWidth: '160px',
        placeholder: '请选择类型'
    }
    types: any[] = [{name: '全部'}]
}
