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
  taskForm = this.fb.group({
    Task: [null],
    Priority: [0],
    ParentTask: [null],
    StartDate: [null],
    EndDate: [null]
  });

  constructor(private fb: FormBuilder, private taskService: TaskService,
    private router: Router) {
  }

  ngOnInit() {
    this.taskService.getTaskLookups()
      .subscribe(data => this.taskLookups = data);
  }

  addTask() {
    console.log(this.taskForm.value);
    this.taskService.addTask(this.taskForm.value)
      .subscribe(data => this.router.navigate(["/view"]));
  }

  resetForm() {
    this.taskForm.reset();
  }
}
