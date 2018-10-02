import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of, from } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpParams } from '../../../node_modules/@angular/common/http';

@Injectable()
export class TaskService {
  constructor(private apiService: ApiService) { }

  addTask(task: Task): Observable<any> {
    return this.apiService.post("Task");
  }

  updateTask(task: Task): Observable<any> {
    return this.apiService.put("api/Task", task);
  }

  getAllTasks(): Observable<any> {
    return this.apiService.get("Task");
  }

  getTaskById(taskId: number): Observable<any> {
    return this.apiService.get("Task", new HttpParams()
      .set("Id", taskId.toString()));
  }

  getTaskLookups(): Observable<any> {
    return this.apiService.get("Task/GetLookups");
  }

  endTask(taskId: number): Observable<any> {
    return this.apiService.delete("api/Task", new HttpParams()
    .set("Id", taskId.toString()));
  }
}
