import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * PUBLIC_INTERFACE
 * Displays list of tasks
 */
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
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
    this.toggleComplete.emit(idx);
  }

  // PUBLIC_INTERFACE
  onDelete(idx: number) {
    this.delete.emit(idx);
  }
}
