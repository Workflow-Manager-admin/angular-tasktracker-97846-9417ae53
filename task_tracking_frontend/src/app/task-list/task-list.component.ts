import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * PUBLIC_INTERFACE
 * Component for displaying and managing a list of tasks with enhanced visual styling
 */
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] | null = [];
  @Output() toggleComplete = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  // PUBLIC_INTERFACE
  onToggleComplete(idx: number) {
    /**
     * Handles task completion toggle
     * @param idx - Index of the task to toggle
     */
    this.toggleComplete.emit(idx);
  }

  // PUBLIC_INTERFACE
  onDelete(idx: number) {
    /**
     * Handles task deletion
     * @param idx - Index of the task to delete
     */
    this.delete.emit(idx);
  }

  // PUBLIC_INTERFACE
  trackByIndex(index: number): number {
    /**
     * TrackBy function for efficient list rendering
     * @param index - Index of the item 
     * @returns The index for tracking
     */
    return index;
  }

  // PUBLIC_INTERFACE
  isTaskOverdue(task: Task): boolean {
    /**
     * Checks if a task is overdue based on its due date
     * @param task - The task to check
     * @returns True if the task is overdue and not completed
     */
    if (!task.dueDate || task.completed) {
      return false;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  }

  // PUBLIC_INTERFACE
  getTaskPriority(task: Task): 'low' | 'medium' | 'high' {
    /**
     * Determines task priority based on due date and completion status
     * @param task - The task to evaluate
     * @returns Priority level of the task
     */
    if (task.completed) {
      return 'low';
    }
    
    if (!task.dueDate) {
      return 'medium';
    }
    
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 0) {
      return 'high'; // Overdue
    } else if (daysDiff <= 2) {
      return 'high'; // Due soon
    } else if (daysDiff <= 7) {
      return 'medium'; // Due this week
    } else {
      return 'low'; // Due later
    }
  }
}
