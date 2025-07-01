import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatNativeDateModule,
    TaskFormComponent,
    TaskListComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // eslint-disable-next-line no-unused-vars
  constructor(private taskService: TaskService) {}

  get tasks$() {
    return this.taskService.tasks$;
  }

  // PUBLIC_INTERFACE
  onTaskCreated(task: Task) {
    this.taskService.addTask(task);
  }

  // PUBLIC_INTERFACE
  onToggleComplete(idx: number) {
    this.taskService.toggleTaskCompletion(idx);
  }

  // PUBLIC_INTERFACE
  onDelete(idx: number) {
    this.taskService.deleteTask(idx);
  }
}
