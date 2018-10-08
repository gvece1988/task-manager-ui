import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  taskLookups;
  taskForm; 

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router) {
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [null],
      priority: [0],
      parentTaskId: [null],
      startDate: [null],
      endDate: [null]
    });

    this.taskService.getTaskLookups()
      .subscribe(value => this.taskLookups = value);
  }

  addTask() {
    console.log(this.taskForm.value);
    this.taskService.create(this.taskForm.value)
      .subscribe(() => this.router.navigate(["/view"]));
  }
}
