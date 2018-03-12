import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './AuthInterceptor';

import { AppRoutingModule } from './app-routing.module';

import { IpRadioModule } from './common/ipharmacare-ui/radio/ip-radio-module';
import { IpCheckboxModule } from './common/ipharmacare-ui/checkbox/ip-checkbox-module';
import { IpSelectModule } from './common/ipharmacare-ui/select/ip-select.module';
import { PopupModule } from './common/popup/popup.module';

import { AppComponent } from './app.component';

import { PromptService } from './common/prompt/prompt.service';
import { PromptComponent } from './common/prompt/prompt.component';
@NgModule({
    declarations: [
        AppComponent,
        PromptComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IpRadioModule,
        IpCheckboxModule,
        IpSelectModule,
        PopupModule
    ],
    providers: [
        PromptService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [PromptComponent]
})
export class AppModule { }
