import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

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
        AppRoutingModule
    ],
    providers: [PromptService],
    bootstrap: [AppComponent],
    entryComponents: [PromptComponent]
})
export class AppModule { }
