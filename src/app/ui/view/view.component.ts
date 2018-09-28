import { TaskService } from '../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  taskSearchForm = this.fb.group({
    Task: [null],
    PriorityFrom: [null],
    PriorityTo: [null],
    ParentTask: [null],
    StartDate: [null],
    EndDate: [null]
  });
  tasks;

  constructor(private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => this.tasks = data);
  }

  editTask(taskId: number) {
    console.log(taskId);
    this.router.navigate(["/update", taskId])
  }

  searchTasks() {
    console.log(this.taskSearchForm.value);
  }
}
