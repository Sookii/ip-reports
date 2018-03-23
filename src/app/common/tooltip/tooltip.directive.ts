import { Directive, Input, ElementRef, HostBinding, HostListener, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { layoutFixed } from '../utils/position';
@Directive({
    selector: '[tooltip]',
})
export class TooltipDirective {
    @Input() tooltip: string;
    position: any;
    cache: any;
    private componentRef: ComponentRef<TooltipComponent>;
    constructor(
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    viewInit() {
        this.position = layoutFixed(this.elementRef.nativeElement);
        //待优化
        this.position.left = parseFloat(this.position.left.substr(0, this.position.left.length - 2)) + this.elementRef.nativeElement.offsetWidth / 2 + 'px';

        if (this.cache && this.cache.instance) {
            this.cache.instance.show(this);
            return;
        }

        this.cache = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(TooltipComponent));
        
        this.cache.instance.show(this);
    }

    @HostListener('mouseenter')
    onMouseenter($event: any) {
        this.viewInit();
    }

    @HostListener('mouseleave')
    onMouseleave($event: any) {
        this.cache.instance.hide();
    }
}