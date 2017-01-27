import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Bug } from '../model/bug';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';

@Injectable()
export class BugService {

    private bugsDbRef = this.fire.database.ref('/bugs');

    constructor(private fire: FirebaseConfigService) { }
    // WATCHES THE DATABASE AND TELLS THE SUBSCRIBER IF A BUG HAS BEEN ADDED TO THE DATABASE
    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_added', bug => {
                const newBug = bug.val() as Bug;
                newBug.id = bug.key;
                obs.next(newBug);
            },
                err => {
                    obs.throw(err);
                });
        });
    }

    changedListener(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_changed', bug => {
                const updatedBug = bug.val() as Bug;
                updatedBug.id = bug.key;
                obs.next(updatedBug);
            },
            err => {
                obs.throw(err);
            });
        });
    }
    // ADDS THE BUG OBJECT FROM THE FORM TO THE DATABASE
    addBug(bug: Bug) {
        const newBugRef = this.bugsDbRef.push()
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Sean',
            createdDate: Date.now()
        })
        .catch(err => console.error("Unable to add bug to Firebase - ", err)); 
    }

    updateBug(bug: Bug) {
        const currentBugRef = this.bugsDbRef.child(bug.id);
        bug.id = null;
        bug.updatedBy = "Billy";
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    }
}