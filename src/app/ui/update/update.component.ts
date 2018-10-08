import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  taskLookups;
  taskForm;
  task: Task;

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: [null],
      title: [null],
      priority: [0],
      parentTaskId: [null],
      startDate: [null],
      endDate: [null]
    });

    this.route.params
      .pipe(switchMap(params => this.taskService.getById(params["id"])))
      .subscribe(value => {
        this.task = value;
        this.taskForm.patchValue(this.task);
      });

    this.taskService.getTaskLookups()
      .subscribe(value => this.taskLookups = value);
  }

  updateTask() {
    this.taskService.update(this.taskForm.value)
      .subscribe(value => this.router.navigate(["/view"]));
  }
}
