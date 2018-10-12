import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import * as _ from 'lodash';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  tasksList: Task[];
  tasks;
  taskSearchForm;
  taskLookups;
  hasTasks: boolean = false;

  constructor(private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.taskSearchForm = this.fb.group({
      title: [null],
      priorityFrom: [null],
      priorityTo: [null],
      parentTaskId: [null],
      startDate: [null],
      endDate: [null]
    });

    this.getTasks();

    this.taskService.getTaskLookups()
      .subscribe(value => this.taskLookups = value);
  }

  getTasks() {
    this.taskService.getAll().subscribe(value => {
      this.tasksList = this.tasks = value;
      this.hasTasks = this.tasks.length > 0;
    });
  }

  searchTasks() {
    let searchTerms = this.taskSearchForm.value;
    
    this.tasks = this.tasksList
      .filter(task => searchTerms.title ? task.title.toUpperCase().startsWith(searchTerms.title.toUpperCase()) : true)
      .filter(task => searchTerms.priorityFrom ? task.priority >= searchTerms.priorityFrom : true)
      .filter(task => searchTerms.priorityTo ? task.priority <= searchTerms.priorityTo : true)
      .filter(task => searchTerms.parentTaskId ? task.parentTaskId == searchTerms.parentTaskId : true)
      .filter(task => searchTerms.startDate ? task.startDate >= searchTerms.startDate : true)
      .filter(task => searchTerms.endDate ? task.endDate <= searchTerms.endDate : true);

      this.hasTasks = this.tasks.length > 0;
  }

  endTask(taskId) {
    this.taskService.end(taskId).subscribe(
      () => {
        alert("Task ended successfully");
        this.getTasks();
      });
  }
}
