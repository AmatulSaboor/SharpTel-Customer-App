/* eslint-disable @typescript-eslint/naming-convention */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private User = new Subject<any>();

    publishSomeData(data: any) {
        this.User.next(data);
    }

    getObservable(): Subject<any> {
        return this.User;
    }
}
