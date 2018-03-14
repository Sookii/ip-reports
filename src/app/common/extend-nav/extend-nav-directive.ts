import { Directive, HostListener, ElementRef, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ComponentFactory, Input, Renderer } from '@angular/core';
import { ExtendNavComponent } from './extend-nav.component';
import { Position, layout } from '../utils/position';
//服务
import { ExtendNavService } from './extend-nav.service';
@Directive({
    selector: '[extendnav]',
    host: {
        '(click)': 'open()'
    },
})

export class ExtendNavDirective {
    private componentFactory: ComponentFactory<ExtendNavComponent>;
    componentRef: ComponentRef<ExtendNavComponent>;
    private positionInfo: Object;

    private selectElement: any;
    private isSelect: boolean = false;
    private navigationData: any = [];
    private doMain: any;//合理用药域名
    @Input('othernavigationcomplete') othernavigationcomplete: string;


    constructor(
        private el: ElementRef,
        componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer,
        private extendNavervice: ExtendNavService
    ) {
        this.el = el;
        this.componentFactory = componentFactoryResolver.resolveComponentFactory(ExtendNavComponent);
    }

    @Input() option: any;

    ngOnInit() {

    }

    open() {
        this.isSelect = !this.isSelect;
        this.initComponent();
        if (this.isSelect === false) {
            this.close()
        }
        return this.componentRef;

    }


    initComponent() {
        if (this.componentRef) {
            return;
        }

        this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
        this.selectElement = this.componentRef.location.nativeElement;
        this.positionInfo = layout(this.el.nativeElement);
        this.positionInfo['left'] = parseInt(this.positionInfo['left']) - parseInt(this.option.position['left']) + 'px';
        this.positionInfo['top'] = parseInt(this.positionInfo['top']) - parseInt(this.option.position['triangleTop']) + 'px';
        this.componentRef.instance.option = {
            position: this.option.position,
            style: this.positionInfo,
            url: this.option.url,
            //    doMain:this.doMain,
            navigationData: this.option.navigationData,
            selectElement: this.selectElement,
            isManufacturer: this.option.isManufacturer,
            medCenterAddress: this.option.medCenterAddress,
            that: this,

        }

        this.componentRef.instance.el = this.el.nativeElement;
        this.selectElement.parentNode.appendChild(this.selectElement);
        return this;
    }

    close() {
        this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.componentRef.hostView));
        this.componentRef = null;
    }

    @HostListener('document:click', ['$event'])
    onClickDoc($event: any) {

        var currentSelect = this.el.nativeElement;
        var targetObj = {
            hasTarget: currentSelect == $event.target
        };
        this.isChild(currentSelect.childNodes, $event.target, targetObj);
        if (targetObj.hasTarget) {
            return;
        }
        if (this.componentRef && !this.componentRef.location.nativeElement.parentNode) return;
        this.isSelect = false;
        if (this.componentRef) {
            this.close();
        }

    }

    isChild(nodes: any, target: any, targetObj: any) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] == target) {
                targetObj.hasTarget = true;
            } else {
                if (nodes[i].childNodes) {
                    this.isChild(nodes[i].childNodes, target, targetObj);
                }
            }
        }
    }
}