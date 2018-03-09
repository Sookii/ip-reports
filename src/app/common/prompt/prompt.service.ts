import { ComponentFactoryResolver, Injectable, Inject, ViewRef } from '@angular/core';
import { PromptComponent } from './prompt.component';
@Injectable()
export class PromptService {
    factoryResolver: any;
    rootViewContainer: any;
    viewRef: ViewRef;
    component: any;
    constructor(@Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = factoryResolver
    }
    setRootViewContainerRef(viewContainerRef: any) {
        this.rootViewContainer = viewContainerRef
    }
    addDynamicComponent() {
        const factory = this.factoryResolver.resolveComponentFactory(PromptComponent);
        this.component = factory.create(this.rootViewContainer.parentInjector);
        this.viewRef = this.component.hostView;
        this.rootViewContainer.insert(this.component.hostView);
    }

    /*需要处理的业务逻辑*/
    handle: string;     //当前操作名称
    paramObj: any;      //当前操作出参数

    excute(handle: string, paramObj: any) {
        this.handle = handle;
        this.paramObj = paramObj;

        if (handle == 'prompt' && paramObj.otherTip && (paramObj.otherTip.indexOf('登录失效') != -1) && this.component && this.component.hostView && (this.rootViewContainer.indexOf(this.component.hostView) != -1)) {
            return
        }

        this.addDynamicComponent();
    }

    removeComponent(viewRef: ViewRef) {
        this.rootViewContainer.remove(this.rootViewContainer.indexOf(viewRef));
    }
    showCompareBtn() {
        this.component.instance.isComparison = true;
    }
    hideCompareBtn() {
        this.component.instance.isComparison = false;
    }
    close() {
        this.component.instance.close();
    }
}