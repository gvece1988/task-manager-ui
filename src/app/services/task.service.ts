import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {
  constructor(private apiService: ApiService) { }

  create(task: Task): Observable<any> {
    return this.apiService.post("Task", task);
  }

  update(task: Task): Observable<any> {
    return this.apiService.put("Task", task);
  }

  getAll(): Observable<any> {
    return this.apiService.get("Task")
      .pipe(map((tasks: Array<any>) => tasks.map(task => this.mapTask(task))));
  }

  getById(taskId: number): Observable<any> {
    return this.apiService.get("Task", new HttpParams().set("id", taskId.toString()))
      .pipe(map(task => this.mapTask(task)));
  }

  getTaskLookups(): Observable<any> {
    return this.apiService.get("Task/GetTaskLookups");
  }

  end(taskId: number): Observable<any> {
    return this.apiService.delete("Task", new HttpParams().set("id", taskId.toString()));
  }

  private mapTask(task): Task {
    return {
      id: task.Id,
      title: task.Title,
      priority: task.Priority,
      parentTaskId: task.ParentTaskId,
      parentTask: task.ParentTask ? task.ParentTask.Title : null,
      startDate: task.StartDate,
      endDate: task.EndDate,
      done: task.Done
    };
  }
}
