import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { FormUtils } from '../../shared/form.utils';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  taskLookups;
  taskForm;  
  submitted = false;

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router) {
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [null, Validators.required],
      priority: [0],
      parentTaskId: [null],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });

    this.taskService.getTaskLookups()
      .subscribe(value => this.taskLookups = value);
  }

  addTask() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }

    this.taskService.create(this.taskForm.value)
      .subscribe(() => this.router.navigate(["/view"]));
  }

  resetForm() {
    this.submitted = false;
  }
}
