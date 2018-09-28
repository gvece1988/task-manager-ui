import { Task } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  taskLookups;
  taskForm;

  constructor(private fb: FormBuilder, private taskService: TaskService,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.taskForm = this.fb.group({
      Task: [null],
      Priority: [0],
      ParentTask: [null],
      StartDate: [null],
      EndDate: [null]
    });

    let task;
    this.route.params
      .pipe(switchMap(params => this.taskService.getTaskById(params["id"])))
      .subscribe(data => task = data);

    console.log(task);

    this.taskService.getTaskLookups()
      .subscribe(data => this.taskLookups = data);

    this.taskForm.patchValue(task);
  }

  updateTask() {
    this.taskService.updateTask(this.taskForm.value)
      .subscribe(data => this.router.navigate(["/view"]));
  }

  resetForm() {
    this.taskForm.reset();
  }
}
