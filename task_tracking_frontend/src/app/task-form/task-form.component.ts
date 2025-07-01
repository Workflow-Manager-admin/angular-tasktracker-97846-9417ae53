import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';

/**
 * PUBLIC_INTERFACE
 * Form component for creating new tasks with enhanced validation and user experience
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
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<Task>();
  
  taskForm!: FormGroup;
  isSubmitting = false;

  // eslint-disable-next-line no-unused-vars
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      dueDate: [null]
    });
  }

  // PUBLIC_INTERFACE
  addTask(): void {
    /**
     * Handles form submission to create a new task
     * Validates form data and emits the new task to parent component
     */
    if (this.taskForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const { title, dueDate } = this.taskForm.value;
      const newTask: Task = {
        title: title.trim(),
        completed: false,
        dueDate: dueDate || null
      };

      // Simulate slight delay for better UX feedback
      window.setTimeout(() => {
        this.taskCreated.emit(newTask);
        this.resetForm();
        this.isSubmitting = false;
      }, 300);
    }
  }

  // PUBLIC_INTERFACE
  resetForm(): void {
    /**
     * Resets the form to its initial state
     */
    this.taskForm.reset();
    this.taskForm.markAsUntouched();
    this.taskForm.markAsPristine();
    this.isSubmitting = false;
  }

  // PUBLIC_INTERFACE
  get titleControl() {
    /**
     * Returns the title form control for easy access in template
     */
    return this.taskForm.get('title');
  }

  // PUBLIC_INTERFACE
  get dueDateControl() {
    /**
     * Returns the due date form control for easy access in template
     */
    return this.taskForm.get('dueDate');
  }
}
