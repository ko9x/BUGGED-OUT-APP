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

    getUpdatedBugs() {
        this.bugService.changedListener()
            .subscribe(updatedBug => {
                this.bugs = this.bugs.map(bug => {
                    if (bug.id === updatedBug.id) {
                        return updatedBug;
                    } else {
                        return bug;
                    }
                },
                err => {
                    console.error("Unable to get updated bug - ", err)
                }
                );
            });
    }

}

