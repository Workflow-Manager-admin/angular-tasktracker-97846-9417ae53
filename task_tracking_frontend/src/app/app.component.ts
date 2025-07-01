import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
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
    /**
     * Handles task creation event from the task form component
     * @param task - The new task to be added
     */
    this.taskService.addTask(task);
  }

  // PUBLIC_INTERFACE
  onToggleComplete(idx: number) {
    /**
     * Handles task completion toggle event from the task list component
     * @param idx - The index of the task to toggle
     */
    this.taskService.toggleTaskCompletion(idx);
  }

  // PUBLIC_INTERFACE
  onDelete(idx: number) {
    /**
     * Handles task deletion event from the task list component
     * @param idx - The index of the task to delete
     */
    this.taskService.deleteTask(idx);
  }

  // PUBLIC_INTERFACE
  getCompletedTasksCount(): number {
    /**
     * Returns the count of completed tasks
     * @returns Number of completed tasks
     */
    const tasks = this.taskService.getTasks();
    return tasks.filter(task => task.completed).length;
  }
}
