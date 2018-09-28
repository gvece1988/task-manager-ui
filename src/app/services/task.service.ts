import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of, from } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {
  i = 1;
  tasks: Task[] = [];
  constructor(private apiService: ApiService) { }

  addTask(task: Task): Observable<any> {
    //return this.apiService.post("api/Tasklookups", task);
    task.Id = this.i++;
    this.tasks.unshift(task);
    return from("1")
  }

  updateTask(task: Task): Observable<any> {
    //return this.apiService.post("api/Tasklookups", task);    
    this.tasks.splice(this.tasks.indexOf(this.tasks.filter(m => m.Id == task.Id)[0], 1));   
    this.tasks.unshift(task);
    return from("1")
  }

  getAllTasks(): Observable<any> {
    return this.apiService.get("Task/GetTaks");    
  }

  getTaskById(taskId: number): Observable<any> {   
    return of(this.tasks.filter(m => m.Id == taskId));
  }

  getTaskLookups(): Observable<any> {
    //return this.apiService.get("api/Tasklookups");
    return of([{ id: "1", name: "Task1" }, { id: "2", name: "Task2" }]);
  }
}
