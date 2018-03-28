import { NgModule, Injectable } from '@angular/core';
import { Route, Routes, RouterModule, CanActivate, CanDeactivate, Router, PreloadAllModules, PreloadingStrategy, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PromptService } from './common/prompt/prompt.service';
import { AppService } from './app.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private appService: AppService,
        private router: Router,
        private promptService: PromptService
    ) { }

    canActivate() {
        return this.appService.user ? this.appService.user : this.delaytestStatus();
    }
    //延迟检测
    delaytestStatus() {
        return this.appService.getUserInfo().subscribe(res => {
            if (res.code == 200 && res.data) {
                return true;
            }
            this.router.navigate(['/login']);
            return false;
        })
    }
}

// @Injectable()
// export class customePreloadingStrategy implements PreloadingStrategy {
//     preloadedModules: string[] = [];

//     preload(route: Route, load: () => Observable<any>): Observable<any> {
//         if (route.data && route.data['preload']) {
//             this.preloadedModules.push(route.path);

//             console.log('Preloaded: ' + route.path);

//             return Observable.of(true).delay(1000).flatMap((_: boolean) => load());
//         } else {
//             return Observable.of(null);
//         }
//     }
// }


const routes: Routes = [
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'management',
        loadChildren: './management/management.module#ManagementModule'
    },
    {
        path: 'create-report',
        loadChildren: './create-report/create-report.module#CreateReportModule'
    },
    {
        path: '',
        redirectTo: 'management',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
