import { Task } from './task.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RestService} from '../angular-hal/src/lib/rest.service';

/** Task manager service */
@Injectable()
export class TaskService extends RestService<Task> {

    /** API resource path */
    public CONNECTION_API = 'tasks';

    /** constructor */
    constructor(injector: Injector, private http: HttpClient) {
        super(Task, "tasks", injector);
    }

    /** remove task*/
    remove(item: Task) {
        return this.http.delete(item._links.self.href);
    }
    
    /** save task*/
    save(item: Task): Observable<any> {
        let result: Observable<Object>;
        const taskType = item.type;
        const taskGroup = item.group;
        let taskConnection = item.connection;
        let taskUI = item.ui;
        if (item._links != null) {
            result = this.http.put(item._links.self.href, item);
        } else {
            result = this.http.post(this.resourceService.getResourceUrl(this.CONNECTION_API), item);
        }
        return result;
    }

}
