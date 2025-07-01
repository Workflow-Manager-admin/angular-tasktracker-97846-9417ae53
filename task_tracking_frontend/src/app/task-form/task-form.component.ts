import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
export class TaskFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<Task>();
  
  taskForm!: FormGroup;

  // eslint-disable-next-line no-unused-vars
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: [null]
    });
  }

  // PUBLIC_INTERFACE
  addTask(): void {
    /**
     * Adds a new task when form is submitted
     */
    if (this.taskForm.valid) {
      const { title, dueDate } = this.taskForm.value;
      this.taskCreated.emit({ title: title!, completed: false, dueDate });
      this.taskForm.reset();
    }
  }
}
