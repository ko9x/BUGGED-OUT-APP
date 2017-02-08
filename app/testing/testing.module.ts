import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TestingRoutingModule } from './testing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TestingComponent } from './testing.component';

@NgModule({
    imports: [ 
        SharedModule,
        TestingRoutingModule,
        ReactiveFormsModule
         ],
    declarations: [ 
        TestingComponent
         ],
    exports: [ ],
    providers: [ 
         ]
})
export class TestingModule { }
