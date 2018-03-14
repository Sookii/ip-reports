import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from './http-interceptors';
import { AppRoutingModule } from './app.routing.module';
import { ExtendNavModule } from './common/extend-nav/extend-nav.module';

import { ConfigService } from './config.service';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

//全局提示框
import { PromptService } from './common/prompt/prompt.service';
import { PromptComponent } from './common/prompt/prompt.component';
@NgModule({
    declarations: [
        AppComponent,
        PromptComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ExtendNavModule,
    ],
    providers: [
        ConfigService,
        AppService,
        PromptService,
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent],
    entryComponents: [PromptComponent]
})
export class AppModule { }
