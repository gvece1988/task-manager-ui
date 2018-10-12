import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddComponent } from './ui/add/add.component';
import { UpdateComponent } from './ui/update/update.component';
import { ViewComponent } from './ui/view/view.component';
import { TaskService } from './services/task.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', redirectTo: "/view", pathMatch: "full" },
  { path: 'add', component: AddComponent },
  { path: 'view', component: ViewComponent },
  { path: 'update/:id', component: UpdateComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    UpdateComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
