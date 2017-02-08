"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var shared_module_1 = require('../shared/shared.module');
var testing_routing_module_1 = require('./testing-routing.module');
var forms_1 = require('@angular/forms');
var testing_component_1 = require('./testing.component');
var TestingModule = (function () {
    function TestingModule() {
    }
    TestingModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                testing_routing_module_1.TestingRoutingModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                testing_component_1.TestingComponent
            ],
            exports: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], TestingModule);
    return TestingModule;
}());
exports.TestingModule = TestingModule;
//# sourceMappingURL=testing.module.js.map