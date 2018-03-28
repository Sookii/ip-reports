import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

export const loginRoute = [
    {
        path:'',
        component: LoginComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoute)
    ],
    exports: [
        RouterModule
    ]
})
export class LoginRoutingModule { }