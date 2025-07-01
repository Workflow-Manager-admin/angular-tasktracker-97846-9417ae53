import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';

/**
 * PUBLIC_INTERFACE
 * Form for adding a new task
 */
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private fb: FormBuilder) {}

  get taskForm() {
    return this.fb.group({
      title: ['', Validators.required],
      dueDate: [null]
    });
  }

  // PUBLIC_INTERFACE
  addTask() {
    const form = this.taskForm;
    if (form.valid) {
      const { title, dueDate } = form.value;
      this.taskCreated.emit({ title: title!, completed: false, dueDate });
      form.reset();
    }
  }
}
