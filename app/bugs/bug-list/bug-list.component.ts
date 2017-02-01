import { Component, OnInit } from '@angular/core';

import { BugService } from '../service/bug.service';

import { Bug } from '../model/bug';

@Component({
    moduleId: module.id,
    selector: 'bug-list',
    templateUrl: 'bug-list.component.html',
    styleUrls: ['bug-list.component.css']
})
export class BugListComponent implements OnInit {

    private bugs: Bug[] = [];

    constructor(private bugService: BugService) { }

    ngOnInit() {
        
        this.getAddedBugs();
        
        this.getUpdatedBugs();

        this.removeDeletedBugs();


    }

    getAddedBugs() {
        this.bugService.getAddedBugs()
            .subscribe(bug => {
                this.bugs.push(bug);
            },
            err => {
                console.error("Unable to get added bug -", err)
            });
    }

    // getUpdatedBugs() {
    //     console.log("about to run get updated bugs")
    //     this.bugService.changedListener()
    //         .subscribe(updatedBug => {
    //             this.bugs = this.bugs.map(bug => {
    //                 if (bug.id === updatedBug.id) {
    //                     console.log("ran get updated bugs")
    //                     return updatedBug;
    //                 } else {
    //                     return bug;
    //                 }
    //             },
    //             err => {
    //                 console.error("Unable to get updated bug - ", err)
    //             });
    //         });
    // }

    // HERE IS ANOTHER WAY TO FIND THE CORRECT ITEM IN THE ARRAY TO UPDATE
    getUpdatedBugs() {
        this.bugService.changedListener()
            .subscribe(updatedBug => {
                const bugIndex = this.bugs.map(index => index.id).indexOf(updatedBug['id']);
                this.bugs[bugIndex] = updatedBug;
            },
            err => {
                console.error("Unable to get updated bug - ", err);
            });
    }

    removeDeletedBugs() {
        this.bugService.deletedListener()
            .subscribe(removedBug => {
                const bugIndex = this.bugs.map(index => index.id).indexOf(removedBug['id']);
                this.bugs[bugIndex] = removedBug;
                this.bugs.splice(bugIndex, 1)
            })
    }

}

