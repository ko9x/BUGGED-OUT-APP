import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestingComponent } from './testing.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', redirectTo: 'bugs', pathMatch: 'full'},
            { path: 'testing', component: TestingComponent },
            { path: '**', redirectTo: 'bugs' }
        ])
    ],
    exports: [RouterModule]
})
export class TestingRoutingModule { }