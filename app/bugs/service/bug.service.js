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
var Observable_1 = require('rxjs/Observable');
var firebase_config_service_1 = require('../../core/service/firebase-config.service');
var BugService = (function () {
    function BugService(fire) {
        this.fire = fire;
        // THE DATABASE REFERANCED HERE COMES FROM THE DATA ENCAPSULATION METHOD USED IN THE FIREBASE-CONFIG.SERVICE
        this.bugsDbRef = this.fire.database.ref('/bugs');
    }
    // WATCHES THE DATABASE AND TELLS THE SUBSCRIBER IF A BUG HAS BEEN ADDED TO THE DATABASE
    BugService.prototype.getAddedBugs = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.bugsDbRef.on('child_added', function (bug) {
                var newBug = bug.val();
                newBug.id = bug.key;
                obs.next(newBug);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    // WATCHES THE DATABASE AND TELLS THE SUBSCRIBER IF A BUG HAS BEEN CHANGED
    BugService.prototype.changedListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.bugsDbRef.on('child_changed', function (bug) {
                var updatedBug = bug.val();
                updatedBug.id = bug.key;
                obs.next(updatedBug);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    // WATCHES THE DATABASE AND TELLS THE SUBSCRIBER IF A BUG HAS BEEN DELETED
    BugService.prototype.deletedListener = function () {
        var _this = this;
        return Observable_1.Observable.create(function (obs) {
            _this.bugsDbRef.on('child_removed', function (bug) {
                var removedBug = bug.val();
                removedBug.id = bug.key;
                obs.next(removedBug);
            }, function (err) {
                obs.throw(err);
            });
        });
    };
    // ADDS THE BUG OBJECT FROM THE FORM TO THE DATABASE
    BugService.prototype.addBug = function (bug) {
        var newBugRef = this.bugsDbRef.push();
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Sean',
            createdDate: Date.now()
        })
            .catch(function (err) { return console.error("Unable to add bug to Firebase - ", err); });
    };
    BugService.prototype.updateBug = function (bug) {
        var currentBugRef = this.bugsDbRef.child(bug.id);
        bug.id = null;
        bug.updatedBy = "Samantha";
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    };
    BugService.prototype.removeBug = function (bug) {
        var currentBugRef = this.bugsDbRef.child(bug.id);
        currentBugRef.remove();
    };
    BugService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_config_service_1.FirebaseConfigService])
    ], BugService);
    return BugService;
}());
exports.BugService = BugService;
//# sourceMappingURL=bug.service.js.map