import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task.model';

/**
 * PUBLIC_INTERFACE
 * Service to manage tasks in-memory
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  // PUBLIC_INTERFACE
  getTasks(): Task[] {
    /** Returns snapshot (for sync read). */
    return this.tasksSubject.getValue();
  }

  // PUBLIC_INTERFACE
  addTask(task: Task): void {
    /** Adds a new task. */
    const tasks = [...this.tasksSubject.getValue(), task];
    this.tasksSubject.next(tasks);
  }

  // PUBLIC_INTERFACE
  updateTask(index: number, updatedTask: Task): void {
    /** Updates a task at a specific index. */
    const tasks = [...this.tasksSubject.getValue()];
    tasks[index] = updatedTask;
    this.tasksSubject.next(tasks);
  }

  // PUBLIC_INTERFACE
  deleteTask(index: number): void {
    /** Deletes a task at a specific index. */
    const tasks = this.tasksSubject.getValue().filter((_, i) => i !== index);
    this.tasksSubject.next(tasks);
  }

  // PUBLIC_INTERFACE
  toggleTaskCompletion(index: number): void {
    /** Toggles completion status for a task. */
    const tasks = [...this.tasksSubject.getValue()];
    tasks[index] = { ...tasks[index], completed: !tasks[index].completed };
    this.tasksSubject.next(tasks);
  }
}
