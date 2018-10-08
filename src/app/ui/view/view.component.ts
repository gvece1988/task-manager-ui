import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  tasks: Task[];
  taskSearchForm;

  constructor(private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.taskSearchForm = this.fb.group({
      task: [null],
      priorityFrom: [null],
      priorityTo: [null],
      parentTask: [null],
      startDate: [null],
      endDate: [null]
    });

    this.getTasks();
  }

  getTasks() {
    this.taskService.getAll().subscribe(value => {
      this.tasks = value;
    });
  }

  searchTasks() {
    console.log(this.taskSearchForm.value);
  }

  endTask(taskId) {
    this.taskService.end(taskId).subscribe(
      () => {
        alert("Task has been ended successfully");
        this.getTasks();
      });
  }
}
