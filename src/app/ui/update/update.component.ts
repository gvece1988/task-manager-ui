import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { TaskService } from '../../services/task.service';
import * as moment from 'moment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  taskLookups;
  taskForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      priority: [0],
      parentTaskId: [null],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });

    this.route.params
      .pipe(switchMap(params => this.taskService.getById(params["id"])))
      .subscribe(value => {
        this.taskForm.patchValue({
          ...value,
          startDate: moment(value.startDate).format("YYYY-MM-DD"),
          endDate: moment(value.endDate).format("YYYY-MM-DD")
        });
      });

    this.taskService.getTaskLookups()
      .subscribe(value => this.taskLookups = value);
  }

  updateTask() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }

    this.taskService.update(this.taskForm.value)
      .subscribe(value => this.router.navigate(["/view"]));
  }
}
