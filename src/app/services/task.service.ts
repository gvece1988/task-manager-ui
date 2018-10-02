import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of, from } from 'rxjs';
import { Task } from '../models/task.model';

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
    return this.apiService.get("Task", {"Id": taskId});   
  }

  getTaskLookups(): Observable<any> {
     return this.apiService.get("Task/GetLookups"); 
  }

  endTask(task: Task): Observable<any> {
    return this.apiService.delete("api/Task", task);        
  }
}
